# Postcode entity test

require "minitest/autorun"
require "json"
require_relative "../Postcodesio_sdk"
require_relative "runner"

class PostcodeEntityTest < Minitest::Test
  def test_create_instance
    testsdk = PostcodesioSDK.test(nil, nil)
    ent = testsdk.Postcode(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "postcode" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = PostcodesioSDK.test(seed, nil)
    seen = base.Postcode(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = PostcodesioConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = PostcodesioSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Postcode(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  def test_basic_flow
    setup = postcode_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "postcode." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set POSTCODESIO_TEST_POSTCODE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    postcode_ref01_ent = client.Postcode(nil)
    postcode_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.postcode"), "postcode_ref01"))

    postcode_ref01_data_result = postcode_ref01_ent.create(postcode_ref01_data, nil)
    postcode_ref01_data = Helpers.to_map(postcode_ref01_data_result.respond_to?(:data_get) ? postcode_ref01_data_result.data_get : postcode_ref01_data_result)
    assert !postcode_ref01_data.nil?
    assert !postcode_ref01_data["id"].nil?

    # LIST
    postcode_ref01_match = {}

    postcode_ref01_list_result = postcode_ref01_ent.list(postcode_ref01_match, nil)
    assert postcode_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(postcode_ref01_list_result),
      { "id" => postcode_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # LOAD
    postcode_ref01_match_dt0 = {
      "id" => postcode_ref01_data["id"],
    }
    postcode_ref01_data_dt0_loaded = postcode_ref01_ent.load(postcode_ref01_match_dt0, nil)
    postcode_ref01_data_dt0_load_result = Helpers.to_map(postcode_ref01_data_dt0_loaded.respond_to?(:data_get) ? postcode_ref01_data_dt0_loaded.data_get : postcode_ref01_data_dt0_loaded)
    assert !postcode_ref01_data_dt0_load_result.nil?
    assert_equal postcode_ref01_data_dt0_load_result["id"], postcode_ref01_data["id"]

  end
end

def postcode_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "postcode", "PostcodeTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = PostcodesioSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["postcode01", "postcode02", "postcode03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["POSTCODESIO_TEST_POSTCODE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "POSTCODESIO_TEST_POSTCODE_ENTID" => idmap,
    "POSTCODESIO_TEST_LIVE" => "FALSE",
    "POSTCODESIO_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["POSTCODESIO_TEST_POSTCODE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["POSTCODESIO_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = PostcodesioSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["POSTCODESIO_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["POSTCODESIO_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
