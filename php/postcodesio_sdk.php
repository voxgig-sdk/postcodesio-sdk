<?php
declare(strict_types=1);

// Postcodesio SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

class PostcodesioSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new PostcodesioUtility();
        $this->_utility = $utility;

        $config = PostcodesioConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features from config.
        $feature_opts = PostcodesioHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $items = Struct::items($feature_opts);
            if ($items) {
                foreach ($items as $item) {
                    $fname = $item[0];
                    $fopts = PostcodesioHelpers::to_map($item[1]);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, PostcodesioFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return PostcodesioUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = PostcodesioHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = PostcodesioHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = PostcodesioHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new PostcodesioSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = PostcodesioHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = PostcodesioHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_nearest = null;

    // Idiomatic facade: $client->nearest()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Nearest() (PHP method
    // names are case-insensitive).
    public function nearest($data = null)
    {
        require_once __DIR__ . '/entity/nearest_entity.php';
        if ($data === null) {
            if ($this->_nearest === null) {
                $this->_nearest = new NearestEntity($this, null);
            }
            return $this->_nearest;
        }
        return new NearestEntity($this, $data);
    }


    private $_outcode = null;

    // Idiomatic facade: $client->outcode()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Outcode() (PHP method
    // names are case-insensitive).
    public function outcode($data = null)
    {
        require_once __DIR__ . '/entity/outcode_entity.php';
        if ($data === null) {
            if ($this->_outcode === null) {
                $this->_outcode = new OutcodeEntity($this, null);
            }
            return $this->_outcode;
        }
        return new OutcodeEntity($this, $data);
    }


    private $_place = null;

    // Idiomatic facade: $client->place()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Place() (PHP method
    // names are case-insensitive).
    public function place($data = null)
    {
        require_once __DIR__ . '/entity/place_entity.php';
        if ($data === null) {
            if ($this->_place === null) {
                $this->_place = new PlaceEntity($this, null);
            }
            return $this->_place;
        }
        return new PlaceEntity($this, $data);
    }


    private $_postcode = null;

    // Idiomatic facade: $client->postcode()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Postcode() (PHP method
    // names are case-insensitive).
    public function postcode($data = null)
    {
        require_once __DIR__ . '/entity/postcode_entity.php';
        if ($data === null) {
            if ($this->_postcode === null) {
                $this->_postcode = new PostcodeEntity($this, null);
            }
            return $this->_postcode;
        }
        return new PostcodeEntity($this, $data);
    }


    private $_scottish_postcode = null;

    // Idiomatic facade: $client->scottish_postcode()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias ScottishPostcode() (PHP method
    // names are case-insensitive).
    public function scottish_postcode($data = null)
    {
        require_once __DIR__ . '/entity/scottish_postcode_entity.php';
        if ($data === null) {
            if ($this->_scottish_postcode === null) {
                $this->_scottish_postcode = new ScottishPostcodeEntity($this, null);
            }
            return $this->_scottish_postcode;
        }
        return new ScottishPostcodeEntity($this, $data);
    }


    private $_terminated_postcode = null;

    // Idiomatic facade: $client->terminated_postcode()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias TerminatedPostcode() (PHP method
    // names are case-insensitive).
    public function terminated_postcode($data = null)
    {
        require_once __DIR__ . '/entity/terminated_postcode_entity.php';
        if ($data === null) {
            if ($this->_terminated_postcode === null) {
                $this->_terminated_postcode = new TerminatedPostcodeEntity($this, null);
            }
            return $this->_terminated_postcode;
        }
        return new TerminatedPostcodeEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new PostcodesioSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
