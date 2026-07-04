<?php
declare(strict_types=1);

// Place entity test

require_once __DIR__ . '/../postcodesio_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PlaceEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = PostcodesioSDK::test(null, null);
        $ent = $testsdk->Place(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = place_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "place." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set POSTCODESIO_TEST_PLACE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $place_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.place")));
        $place_ref01_data = null;
        if (count($place_ref01_data_raw) > 0) {
            $place_ref01_data = Helpers::to_map($place_ref01_data_raw[0][1]);
        }

        // LIST
        $place_ref01_ent = $client->Place(null);
        $place_ref01_match = [];

        $place_ref01_list_result = $place_ref01_ent->list($place_ref01_match, null);
        $this->assertIsArray($place_ref01_list_result);

        // LOAD
        $place_ref01_match_dt0 = [];
        $place_ref01_data_dt0_loaded = $place_ref01_ent->load($place_ref01_match_dt0, null);
        $this->assertNotNull($place_ref01_data_dt0_loaded);

    }
}

function place_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/place/PlaceTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = PostcodesioSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["place01", "place02", "place03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("POSTCODESIO_TEST_PLACE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "POSTCODESIO_TEST_PLACE_ENTID" => $idmap,
        "POSTCODESIO_TEST_LIVE" => "FALSE",
        "POSTCODESIO_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["POSTCODESIO_TEST_PLACE_ENTID"]);
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
