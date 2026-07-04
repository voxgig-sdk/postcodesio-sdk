// Typed models for the Postcodesio SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Nearest is the typed data model for the nearest entity.
type Nearest struct {
	Result []any `json:"result"`
	Status int `json:"status"`
}

// NearestListMatch is the typed request payload for Nearest.ListTyped.
type NearestListMatch struct {
	PostcodeId string `json:"postcode_id"`
}

// Outcode is the typed data model for the outcode entity.
type Outcode struct {
	Result any `json:"result"`
	Status int `json:"status"`
}

// OutcodeLoadMatch is the typed request payload for Outcode.LoadTyped.
type OutcodeLoadMatch struct {
	Id string `json:"id"`
}

// Place is the typed data model for the place entity.
type Place struct {
	Code string `json:"code"`
	Country string `json:"country"`
	CountyUnitary string `json:"county_unitary"`
	CountyUnitaryType string `json:"county_unitary_type"`
	DistrictBorough string `json:"district_borough"`
	DistrictBoroughType *string `json:"district_borough_type,omitempty"`
	Easting int `json:"easting"`
	Latitude float64 `json:"latitude"`
	LocalType string `json:"local_type"`
	Longitude float64 `json:"longitude"`
	MaxEasting int `json:"max_easting"`
	MaxNorthing int `json:"max_northing"`
	MinEasting int `json:"min_easting"`
	MinNorthing int `json:"min_northing"`
	Name1 string `json:"name_1"`
	Name1Lang string `json:"name_1_lang"`
	Name2 string `json:"name_2"`
	Name2Lang string `json:"name_2_lang"`
	Northing int `json:"northing"`
	Outcode string `json:"outcode"`
	Region string `json:"region"`
	Result map[string]any `json:"result"`
	Status int `json:"status"`
}

// PlaceLoadMatch is the typed request payload for Place.LoadTyped.
type PlaceLoadMatch struct {
	Id string `json:"id"`
}

// PlaceListMatch mirrors the place fields as an all-optional match
// filter (Go analog of Partial<Place>).
type PlaceListMatch struct {
	Code *string `json:"code,omitempty"`
	Country *string `json:"country,omitempty"`
	CountyUnitary *string `json:"county_unitary,omitempty"`
	CountyUnitaryType *string `json:"county_unitary_type,omitempty"`
	DistrictBorough *string `json:"district_borough,omitempty"`
	DistrictBoroughType *string `json:"district_borough_type,omitempty"`
	Easting *int `json:"easting,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	LocalType *string `json:"local_type,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	MaxEasting *int `json:"max_easting,omitempty"`
	MaxNorthing *int `json:"max_northing,omitempty"`
	MinEasting *int `json:"min_easting,omitempty"`
	MinNorthing *int `json:"min_northing,omitempty"`
	Name1 *string `json:"name_1,omitempty"`
	Name1Lang *string `json:"name_1_lang,omitempty"`
	Name2 *string `json:"name_2,omitempty"`
	Name2Lang *string `json:"name_2_lang,omitempty"`
	Northing *int `json:"northing,omitempty"`
	Outcode *string `json:"outcode,omitempty"`
	Region *string `json:"region,omitempty"`
	Result *map[string]any `json:"result,omitempty"`
	Status *int `json:"status,omitempty"`
}

// Postcode is the typed data model for the postcode entity.
type Postcode struct {
	Result map[string]any `json:"result"`
	Status int `json:"status"`
}

// PostcodeLoadMatch is the typed request payload for Postcode.LoadTyped.
type PostcodeLoadMatch struct {
	Id string `json:"id"`
}

// PostcodeListMatch mirrors the postcode fields as an all-optional match
// filter (Go analog of Partial<Postcode>).
type PostcodeListMatch struct {
	Result *map[string]any `json:"result,omitempty"`
	Status *int `json:"status,omitempty"`
}

// PostcodeCreateData mirrors the postcode fields as an all-optional match
// filter (Go analog of Partial<Postcode>).
type PostcodeCreateData struct {
	Result *map[string]any `json:"result,omitempty"`
	Status *int `json:"status,omitempty"`
}

// ScottishPostcode is the typed data model for the scottish_postcode entity.
type ScottishPostcode struct {
	Result []any `json:"result"`
	Status int `json:"status"`
}

// ScottishPostcodeLoadMatch is the typed request payload for ScottishPostcode.LoadTyped.
type ScottishPostcodeLoadMatch struct {
	Id string `json:"id"`
}

// TerminatedPostcode is the typed data model for the terminated_postcode entity.
type TerminatedPostcode struct {
	Result []any `json:"result"`
	Status int `json:"status"`
}

// TerminatedPostcodeLoadMatch is the typed request payload for TerminatedPostcode.LoadTyped.
type TerminatedPostcodeLoadMatch struct {
	Id string `json:"id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
