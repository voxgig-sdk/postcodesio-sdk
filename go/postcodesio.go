package voxgigpostcodesiosdk

import (
	"github.com/voxgig-sdk/postcodesio-sdk/go/core"
	"github.com/voxgig-sdk/postcodesio-sdk/go/entity"
	"github.com/voxgig-sdk/postcodesio-sdk/go/feature"
	_ "github.com/voxgig-sdk/postcodesio-sdk/go/utility"
)

// Type aliases preserve external API.
type PostcodesioSDK = core.PostcodesioSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type PostcodesioEntity = core.PostcodesioEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type PostcodesioError = core.PostcodesioError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewNearestEntityFunc = func(client *core.PostcodesioSDK, entopts map[string]any) core.PostcodesioEntity {
		return entity.NewNearestEntity(client, entopts)
	}
	core.NewOutcodeEntityFunc = func(client *core.PostcodesioSDK, entopts map[string]any) core.PostcodesioEntity {
		return entity.NewOutcodeEntity(client, entopts)
	}
	core.NewPlaceEntityFunc = func(client *core.PostcodesioSDK, entopts map[string]any) core.PostcodesioEntity {
		return entity.NewPlaceEntity(client, entopts)
	}
	core.NewPostcodeEntityFunc = func(client *core.PostcodesioSDK, entopts map[string]any) core.PostcodesioEntity {
		return entity.NewPostcodeEntity(client, entopts)
	}
	core.NewScottishPostcodeEntityFunc = func(client *core.PostcodesioSDK, entopts map[string]any) core.PostcodesioEntity {
		return entity.NewScottishPostcodeEntity(client, entopts)
	}
	core.NewTerminatedPostcodeEntityFunc = func(client *core.PostcodesioSDK, entopts map[string]any) core.PostcodesioEntity {
		return entity.NewTerminatedPostcodeEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewPostcodesioSDK = core.NewPostcodesioSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewPostcodesioSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *PostcodesioSDK  { return NewPostcodesioSDK(nil) }
func Test() *PostcodesioSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
