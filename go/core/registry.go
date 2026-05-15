package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewNearestEntityFunc func(client *PostcodesioSDK, entopts map[string]any) PostcodesioEntity

var NewOutcodeEntityFunc func(client *PostcodesioSDK, entopts map[string]any) PostcodesioEntity

var NewPlaceEntityFunc func(client *PostcodesioSDK, entopts map[string]any) PostcodesioEntity

var NewPostcodeEntityFunc func(client *PostcodesioSDK, entopts map[string]any) PostcodesioEntity

var NewScottishPostcodeEntityFunc func(client *PostcodesioSDK, entopts map[string]any) PostcodesioEntity

var NewTerminatedPostcodeEntityFunc func(client *PostcodesioSDK, entopts map[string]any) PostcodesioEntity

