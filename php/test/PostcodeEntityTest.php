<?php
declare(strict_types=1);

// Postcode entity test

require_once __DIR__ . '/../postcodesio_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PostcodeEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = PostcodesioSDK::test(null, null);
        $ent = $testsdk->Postcode(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = postcode_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "postcode." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set POSTCODESIO_TEST_POSTCODE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $postcode_ref01_ent = $client->Postcode(null);
        $postcode_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.postcode"), "postcode_ref01"));

        [$postcode_ref01_data_result, $err] = $postcode_ref01_ent->create($postcode_ref01_data, null);
        $this->assertNull($err);
        $postcode_ref01_data = Helpers::to_map($postcode_ref01_data_result);
        $this->assertNotNull($postcode_ref01_data);

        // LIST
        $postcode_ref01_match = [];

        [$postcode_ref01_list_result, $err] = $postcode_ref01_ent->list($postcode_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($postcode_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($postcode_ref01_list_result),
            ["id" => $postcode_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // LOAD
        $postcode_ref01_match_dt0 = [];
        [$postcode_ref01_data_dt0_loaded, $err] = $postcode_ref01_ent->load($postcode_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($postcode_ref01_data_dt0_loaded);

    }
}

function postcode_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/postcode/PostcodeTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = PostcodesioSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["postcode01", "postcode02", "postcode03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("POSTCODESIO_TEST_POSTCODE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "POSTCODESIO_TEST_POSTCODE_ENTID" => $idmap,
        "POSTCODESIO_TEST_LIVE" => "FALSE",
        "POSTCODESIO_TEST_EXPLAIN" => "FALSE",
        "POSTCODESIO_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["POSTCODESIO_TEST_POSTCODE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["POSTCODESIO_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["POSTCODESIO_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new PostcodesioSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["POSTCODESIO_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["POSTCODESIO_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
