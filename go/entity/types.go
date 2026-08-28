// Typed models for the Postcodesio SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/postcodesio-sdk/go/core"
)

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
	Id *string `json:"id,omitempty"`
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
	Eastings int `json:"eastings"`
	Id *string `json:"id,omitempty"`
	Latitude float64 `json:"latitude"`
	LocalType string `json:"local_type"`
	Longitude float64 `json:"longitude"`
	MaxEastings int `json:"max_eastings"`
	MaxNorthings int `json:"max_northings"`
	MinEastings int `json:"min_eastings"`
	MinNorthings int `json:"min_northings"`
	Name1 string `json:"name_1"`
	Name1Lang string `json:"name_1_lang"`
	Name2 string `json:"name_2"`
	Name2Lang string `json:"name_2_lang"`
	Northings int `json:"northings"`
	Outcode string `json:"outcode"`
	Region string `json:"region"`
}

// PlaceLoadMatch is the typed request payload for Place.LoadTyped.
type PlaceLoadMatch struct {
	Id string `json:"id"`
}

// PlaceListMatch is the typed request payload for Place.ListTyped.
type PlaceListMatch struct {
	Code *string `json:"code,omitempty"`
	Country *string `json:"country,omitempty"`
	CountyUnitary *string `json:"county_unitary,omitempty"`
	CountyUnitaryType *string `json:"county_unitary_type,omitempty"`
	DistrictBorough *string `json:"district_borough,omitempty"`
	DistrictBoroughType *string `json:"district_borough_type,omitempty"`
	Eastings *int `json:"eastings,omitempty"`
	Id *string `json:"id,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	LocalType *string `json:"local_type,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	MaxEastings *int `json:"max_eastings,omitempty"`
	MaxNorthings *int `json:"max_northings,omitempty"`
	MinEastings *int `json:"min_eastings,omitempty"`
	MinNorthings *int `json:"min_northings,omitempty"`
	Name1 *string `json:"name_1,omitempty"`
	Name1Lang *string `json:"name_1_lang,omitempty"`
	Name2 *string `json:"name_2,omitempty"`
	Name2Lang *string `json:"name_2_lang,omitempty"`
	Northings *int `json:"northings,omitempty"`
	Outcode *string `json:"outcode,omitempty"`
	Region *string `json:"region,omitempty"`
}

// Postcode is the typed data model for the postcode entity.
type Postcode struct {
	AdminCounty string `json:"admin_county"`
	AdminDistrict string `json:"admin_district"`
	AdminWard string `json:"admin_ward"`
	Bua *string `json:"bua,omitempty"`
	CancerAlliance *string `json:"cancer_alliance,omitempty"`
	Ccg string `json:"ccg"`
	Ced string `json:"ced"`
	Codes map[string]any `json:"codes"`
	Country string `json:"country"`
	DateOfIntroduction *string `json:"date_of_introduction,omitempty"`
	Eastings int `json:"eastings"`
	EuropeanElectoralRegion string `json:"european_electoral_region"`
	Icb *string `json:"icb,omitempty"`
	Id *string `json:"id,omitempty"`
	Incode string `json:"incode"`
	Latitude float64 `json:"latitude"`
	Lep1 *string `json:"lep1,omitempty"`
	Lep2 *string `json:"lep2,omitempty"`
	Longitude float64 `json:"longitude"`
	Lsoa string `json:"lsoa"`
	Lsoa11 *string `json:"lsoa11,omitempty"`
	Lsoa21 *string `json:"lsoa21,omitempty"`
	Msoa string `json:"msoa"`
	Msoa11 *string `json:"msoa11,omitempty"`
	Msoa21 *string `json:"msoa21,omitempty"`
	NationalPark *string `json:"national_park,omitempty"`
	NhsHa string `json:"nhs_ha"`
	NhsRegion *string `json:"nhs_region,omitempty"`
	Northings int `json:"northings"`
	Nuts string `json:"nuts"`
	Oa21 *string `json:"oa21,omitempty"`
	Outcode string `json:"outcode"`
	Parish string `json:"parish"`
	ParliamentaryConstituency string `json:"parliamentary_constituency"`
	ParliamentaryConstituency2024 *string `json:"parliamentary_constituency_2024,omitempty"`
	Pfa *string `json:"pfa,omitempty"`
	Postcode string `json:"postcode"`
	PrimaryCareTrust string `json:"primary_care_trust"`
	Quality int `json:"quality"`
	Region string `json:"region"`
	Result []any `json:"result"`
	Ruc11 *string `json:"ruc11,omitempty"`
	Ruc21 *string `json:"ruc21,omitempty"`
	Status int `json:"status"`
	Ttwa *string `json:"ttwa,omitempty"`
}

// PostcodeLoadMatch is the typed request payload for Postcode.LoadTyped.
type PostcodeLoadMatch struct {
	Id string `json:"id"`
}

// PostcodeListMatch is the typed request payload for Postcode.ListTyped.
type PostcodeListMatch struct {
	Filter *string `json:"filter,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Query *any `json:"query,omitempty"`
	Radius *int `json:"radius,omitempty"`
	Widesearch *bool `json:"widesearch,omitempty"`
}

// PostcodeCreateData is the typed request payload for Postcode.CreateTyped.
type PostcodeCreateData struct {
	AdminCounty string `json:"admin_county"`
	AdminDistrict string `json:"admin_district"`
	AdminWard string `json:"admin_ward"`
	Bua *string `json:"bua,omitempty"`
	CancerAlliance *string `json:"cancer_alliance,omitempty"`
	Ccg string `json:"ccg"`
	Ced string `json:"ced"`
	Codes map[string]any `json:"codes"`
	Country string `json:"country"`
	DateOfIntroduction *string `json:"date_of_introduction,omitempty"`
	Eastings int `json:"eastings"`
	EuropeanElectoralRegion string `json:"european_electoral_region"`
	Icb *string `json:"icb,omitempty"`
	Id *string `json:"id,omitempty"`
	Incode string `json:"incode"`
	Latitude float64 `json:"latitude"`
	Lep1 *string `json:"lep1,omitempty"`
	Lep2 *string `json:"lep2,omitempty"`
	Longitude float64 `json:"longitude"`
	Lsoa string `json:"lsoa"`
	Lsoa11 *string `json:"lsoa11,omitempty"`
	Lsoa21 *string `json:"lsoa21,omitempty"`
	Msoa string `json:"msoa"`
	Msoa11 *string `json:"msoa11,omitempty"`
	Msoa21 *string `json:"msoa21,omitempty"`
	NationalPark *string `json:"national_park,omitempty"`
	NhsHa string `json:"nhs_ha"`
	NhsRegion *string `json:"nhs_region,omitempty"`
	Northings int `json:"northings"`
	Nuts string `json:"nuts"`
	Oa21 *string `json:"oa21,omitempty"`
	Outcode string `json:"outcode"`
	Parish string `json:"parish"`
	ParliamentaryConstituency string `json:"parliamentary_constituency"`
	ParliamentaryConstituency2024 *string `json:"parliamentary_constituency_2024,omitempty"`
	Pfa *string `json:"pfa,omitempty"`
	Postcode string `json:"postcode"`
	PrimaryCareTrust string `json:"primary_care_trust"`
	Quality int `json:"quality"`
	Region string `json:"region"`
	Result []any `json:"result"`
	Ruc11 *string `json:"ruc11,omitempty"`
	Ruc21 *string `json:"ruc21,omitempty"`
	Status int `json:"status"`
	Ttwa *string `json:"ttwa,omitempty"`
}

// ScottishPostcode is the typed data model for the scottish_postcode entity.
type ScottishPostcode struct {
	Id *string `json:"id,omitempty"`
	Result []any `json:"result"`
	Status int `json:"status"`
}

// ScottishPostcodeLoadMatch is the typed request payload for ScottishPostcode.LoadTyped.
type ScottishPostcodeLoadMatch struct {
	Id string `json:"id"`
}

// TerminatedPostcode is the typed data model for the terminated_postcode entity.
type TerminatedPostcode struct {
	Id *string `json:"id,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
