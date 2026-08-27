package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Postcodesio",
			"slug": "postcodesio",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.postcodes.io",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"nearest": map[string]any{},
				"outcode": map[string]any{},
				"place": map[string]any{},
				"postcode": map[string]any{},
				"scottish_postcode": map[string]any{},
				"terminated_postcode": map[string]any{},
			},
		},
		"entity": map[string]any{
			"nearest": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "result",
						"req": true,
						"short": "Array of nearest postcodes sorted by distance",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"type": "`$INTEGER`",
					},
				},
				"name": "nearest",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "SW1A 2AA",
											"kind": "param",
											"name": "postcode_id",
											"orig": "postcode",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/postcodes/{postcode}/nearest",
								"parts": []any{
									"postcodes",
									"{postcode_id}",
									"nearest",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"postcode": "postcode_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"postcode_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.result`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"postcode",
						},
					},
				},
			},
			"outcode": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
				},
				"name": "outcode",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "SW1A",
											"kind": "param",
											"name": "id",
											"orig": "outcode",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/outcodes/{outcode}",
								"parts": []any{
									"outcodes",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"outcode": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.result`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"place": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "code",
						"req": true,
						"short": "Unique identifier for the place record (persistent except for Section of Named/Numbered Roads)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"req": true,
						"short": "Country within Great Britain (England, Scotland, or Wales)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "county_unitary",
						"req": true,
						"short": "County, Unitary Authority or Greater London Authority that contains this place",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "county_unitary_type",
						"req": true,
						"short": "Type of administrative unit (e.g., County, UnitaryAuthority)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "district_borough",
						"req": true,
						"short": "District, Metropolitan District or London Borough containing this place",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "district_borough_type",
						"short": "Type of district/borough administrative unit",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "eastings",
						"req": true,
						"short": "Ordnance Survey grid reference Easting (1m resolution, not available for Channel Islands/Isle of Man)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "latitude",
						"req": true,
						"short": "WGS84 latitude coordinate",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "local_type",
						"req": true,
						"short": "Ordnance Survey classification (City, Town, Village, Hamlet, etc.)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "longitude",
						"req": true,
						"short": "WGS84 longitude coordinate",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "max_eastings",
						"req": true,
						"short": "Eastern edge of the place's bounding box (Minimum Bounding Rectangle)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "max_northings",
						"req": true,
						"short": "Northern edge of the place's bounding box (Minimum Bounding Rectangle)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "min_eastings",
						"req": true,
						"short": "Western edge of the place's bounding box (Minimum Bounding Rectangle)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "min_northings",
						"req": true,
						"short": "Southern edge of the place's bounding box (Minimum Bounding Rectangle)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name_1",
						"req": true,
						"short": "Official name of the place (preserves original format, e.g., \"The Pennines\" not \"Pennines, The\")",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name_1_lang",
						"req": true,
						"short": "Language code for name_1 (cym=Welsh, eng=English, gla=Scottish Gaelic)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name_2",
						"req": true,
						"short": "Alternative name in a different language",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name_2_lang",
						"req": true,
						"short": "Language code for name_2 (cym=Welsh, eng=English, gla=Scottish Gaelic)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "northings",
						"req": true,
						"short": "Ordnance Survey grid reference Northing (1m resolution, not available for Channel Islands/Isle of Man)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "outcode",
						"req": true,
						"short": "Postcode district (first part of the postcode)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"req": true,
						"short": "European Region (formerly Government Office Region) containing this place",
						"type": "`$STRING`",
					},
				},
				"name": "place",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/places",
								"parts": []any{
									"places",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.result`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "code",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/places/{code}",
								"parts": []any{
									"places",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"code": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.result`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/random/places",
								"parts": []any{
									"random",
									"places",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.result`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"postcode": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "admin_county",
						"req": true,
						"short": "The administrative county for this postcode.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "admin_district",
						"req": true,
						"short": "The administrative district or unitary authority for this postcode.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "admin_ward",
						"req": true,
						"short": "The electoral/administrative ward for this postcode.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "bua",
						"short": "The Built-up Area (2022) for this postcode.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cancer_alliance",
						"short": "The Cancer Alliance for this postcode.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ccg",
						"req": true,
						"short": "NHS Clinical Commissioning Group responsible for planning healthcare services in England.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ced",
						"req": true,
						"short": "The county electoral division for English postcodes.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "codes",
						"req": true,
						"short": "Contains the GSS (Government Statistical Service) codes for administrative areas.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "country",
						"req": true,
						"short": "The UK constituent country for this postcode (England, Scotland, Wales, Northern Ireland, Channel Islands, or Isle of Man).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date_of_introduction",
						"short": "The date the postcode was introduced in YYYYMM format.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "eastings",
						"req": true,
						"short": "The OS grid reference easting (X-coordinate) to 1 metre resolution.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "european_electoral_region",
						"req": true,
						"short": "The European Electoral Region for this postcode.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "icb",
						"short": "The NHS Integrated Care Board responsible for healthcare planning in this area.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "incode",
						"req": true,
						"short": "The second part of a postcode after the space (always 3 characters).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "latitude",
						"req": true,
						"short": "WGS84 latitude coordinate (north-south position).",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "lep1",
						"short": "The primary Local Enterprise Partnership for this postcode.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lep2",
						"short": "The secondary Local Enterprise Partnership for this postcode, if it falls within overlapping LEP areas.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "longitude",
						"req": true,
						"short": "WGS84 longitude coordinate (east-west position).",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "lsoa",
						"req": true,
						"short": "2021 Census LSOA code (smaller statistical area, typically 1,000-1,500 residents).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lsoa11",
						"short": "2011 Census LSOA code.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lsoa21",
						"short": "2021 Census LSOA code.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "msoa",
						"req": true,
						"short": "2021 Census MSOA code (mid-size statistical area, typically 5,000-7,000 residents).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "msoa11",
						"short": "2011 Census MSOA code.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "msoa21",
						"short": "2021 Census MSOA code.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "national_park",
						"short": "The National Park this postcode falls within, if any.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nhs_ha",
						"req": true,
						"short": "The NHS health authority area for this postcode.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nhs_region",
						"short": "The NHS England Region for this postcode.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "northings",
						"req": true,
						"short": "The OS grid reference northing (Y-coordinate) to 1 metre resolution.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "nuts",
						"req": true,
						"short": "Statistical geography code for international comparisons (formerly NUTS - Nomenclature of Units for Territorial Statistics).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "oa21",
						"short": "2021 Census Output Area code - the smallest census geography.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "outcode",
						"req": true,
						"short": "The first part of a postcode before the space (2-4 characters).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "parish",
						"req": true,
						"short": "The civil parish (England) or community (Wales) for this postcode.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "parliamentary_constituency",
						"req": true,
						"short": "The UK Parliamentary constituency for this postcode.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "parliamentary_constituency_2024",
						"short": "The UK Parliamentary constituency for this postcode based on July 2024 boundaries.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pfa",
						"short": "The police force area for this postcode.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "postcode",
						"req": true,
						"short": "UK postcode format: 2-4 character outward code, a space, and a 3-character inward code (e.g., SW1A 2AA).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "primary_care_trust",
						"req": true,
						"short": "The healthcare administrative area for this postcode.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "quality",
						"req": true,
						"short": "Positional Quality Indicator (1-9).",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "region",
						"req": true,
						"short": "The regional designation for this postcode (formerly Government Office Regions or GORs).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "result",
						"req": true,
						"short": "Array containing detailed location information for the requested postcode or nearest postcodes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "ruc11",
						"short": "The 2011 Census Rural-Urban Classification for this postcode.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ruc21",
						"short": "The 2021 Census Rural-Urban Classification for this postcode.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "ttwa",
						"short": "The Travel to Work Area for this postcode.",
						"type": "`$STRING`",
					},
				},
				"name": "postcode",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/postcodes",
								"parts": []any{
									"postcodes",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.result`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "postcode",
											"kind": "query",
											"name": "filter",
											"orig": "filter",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 51.50354,
											"kind": "query",
											"name": "latitude",
											"orig": "latitude",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": 3,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": -0.127695,
											"kind": "query",
											"name": "longitude",
											"orig": "longitude",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": "SW1A 2AA",
											"kind": "query",
											"name": "query",
											"orig": "query",
											"type": "`$ANY`",
										},
										map[string]any{
											"example": 500,
											"kind": "query",
											"name": "radius",
											"orig": "radius",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "true",
											"kind": "query",
											"name": "widesearch",
											"orig": "widesearch",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/postcodes",
								"parts": []any{
									"postcodes",
								},
								"select": map[string]any{
									"exist": []any{
										"filter",
										"latitude",
										"limit",
										"longitude",
										"query",
										"radius",
										"widesearch",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.result`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "SW1A 2AA",
											"kind": "param",
											"name": "id",
											"orig": "postcode",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/postcodes/{postcode}",
								"parts": []any{
									"postcodes",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"postcode": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.result`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "SW1A",
											"kind": "query",
											"name": "outcode",
											"orig": "outcode",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/random/postcodes",
								"parts": []any{
									"random",
									"postcodes",
								},
								"select": map[string]any{
									"exist": []any{
										"outcode",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.result`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"scottish_postcode": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "result",
						"req": true,
						"short": "Data for a given postcode",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"type": "`$INTEGER`",
					},
				},
				"name": "scottish_postcode",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "postcode",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/scotland/postcodes/{postcode}",
								"parts": []any{
									"scotland",
									"postcodes",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"postcode": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"terminated_postcode": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "result",
						"req": true,
						"short": "Data for a given postcode",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"type": "`$INTEGER`",
					},
				},
				"name": "terminated_postcode",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "postcode",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/terminated_postcodes/{postcode}",
								"parts": []any{
									"terminated_postcodes",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"postcode": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
