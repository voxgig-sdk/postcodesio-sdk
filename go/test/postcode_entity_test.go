package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/postcodesio-sdk/go"
	"github.com/voxgig-sdk/postcodesio-sdk/go/core"

	vs "github.com/voxgig-sdk/postcodesio-sdk/go/utility/struct"
)

func TestPostcodeEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Postcode(nil)
		if ent == nil {
			t.Fatal("expected non-nil PostcodeEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"postcode": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Postcode(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.MakeConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.Postcode(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := postcodeBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "postcode." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set POSTCODESIO_TEST_POSTCODE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		postcodeRef01Ent := client.Postcode(nil)
		postcodeRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "postcode"}, setup.data), "postcode_ref01"))

		postcodeRef01DataResult, err := postcodeRef01Ent.Create(postcodeRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		postcodeRef01Data = core.ToMapAny(postcodeRef01DataResult)
		if postcodeRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LIST
		postcodeRef01Match := map[string]any{}

		postcodeRef01ListResult, err := postcodeRef01Ent.List(postcodeRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		postcodeRef01List, postcodeRef01ListOk := postcodeRef01ListResult.([]any)
		if !postcodeRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", postcodeRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(postcodeRef01List), map[string]any{"id": postcodeRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// LOAD
		postcodeRef01MatchDt0 := map[string]any{}
		postcodeRef01DataDt0Loaded, err := postcodeRef01Ent.Load(postcodeRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if postcodeRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func postcodeBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "postcode", "PostcodeTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read postcode test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse postcode test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"postcode01", "postcode02", "postcode03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("POSTCODESIO_TEST_POSTCODE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"POSTCODESIO_TEST_POSTCODE_ENTID": idmap,
		"POSTCODESIO_TEST_LIVE":      "FALSE",
		"POSTCODESIO_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["POSTCODESIO_TEST_POSTCODE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["POSTCODESIO_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewPostcodesioSDK(core.ToMapAny(mergedOpts))
	}

	live := env["POSTCODESIO_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["POSTCODESIO_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
