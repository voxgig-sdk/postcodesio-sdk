<?php
declare(strict_types=1);

// ScottishPostcode entity test

require_once __DIR__ . '/../postcodesio_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ScottishPostcodeEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = PostcodesioSDK::test(null, null);
        $ent = $testsdk->ScottishPostcode(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = scottish_postcode_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "scottish_postcode." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set POSTCODESIO_TEST_SCOTTISH_POSTCODE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $scottish_postcode_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.scottish_postcode")));
        $scottish_postcode_ref01_data = null;
        if (count($scottish_postcode_ref01_data_raw) > 0) {
            $scottish_postcode_ref01_data = Helpers::to_map($scottish_postcode_ref01_data_raw[0][1]);
        }

        // LOAD
        $scottish_postcode_ref01_ent = $client->ScottishPostcode(null);
        $scottish_postcode_ref01_match_dt0 = [
            "id" => $scottish_postcode_ref01_data["id"],
        ];
        $scottish_postcode_ref01_data_dt0_loaded = $scottish_postcode_ref01_ent->load($scottish_postcode_ref01_match_dt0, null);
        $scottish_postcode_ref01_data_dt0_load_result = Helpers::to_map(is_object($scottish_postcode_ref01_data_dt0_loaded) && method_exists($scottish_postcode_ref01_data_dt0_loaded, 'data_get') ? $scottish_postcode_ref01_data_dt0_loaded->data_get() : $scottish_postcode_ref01_data_dt0_loaded);
        $this->assertNotNull($scottish_postcode_ref01_data_dt0_load_result);
        $this->assertEquals($scottish_postcode_ref01_data_dt0_load_result["id"], $scottish_postcode_ref01_data["id"]);

    }
}

function scottish_postcode_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/scottish_postcode/ScottishPostcodeTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = PostcodesioSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["scottish_postcode01", "scottish_postcode02", "scottish_postcode03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("POSTCODESIO_TEST_SCOTTISH_POSTCODE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "POSTCODESIO_TEST_SCOTTISH_POSTCODE_ENTID" => $idmap,
        "POSTCODESIO_TEST_LIVE" => "FALSE",
        "POSTCODESIO_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["POSTCODESIO_TEST_SCOTTISH_POSTCODE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["POSTCODESIO_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
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
