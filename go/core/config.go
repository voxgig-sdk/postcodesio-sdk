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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
				"fields": []any{},
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "county_unitary",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "county_unitary_type",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "district_borough",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "district_borough_type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "eastings",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "latitude",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "local_type",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "longitude",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "max_eastings",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "max_northings",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "min_eastings",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "min_northings",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name_1",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name_1_lang",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name_2",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name_2_lang",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "northings",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "outcode",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"req": true,
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "admin_district",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "admin_ward",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "bua",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cancer_alliance",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ccg",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ced",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "codes",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "country",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date_of_introduction",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "eastings",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "european_electoral_region",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "icb",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "incode",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "latitude",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "lep1",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lep2",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "longitude",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "lsoa",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lsoa11",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lsoa21",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "msoa",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "msoa11",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "msoa21",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "national_park",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nhs_ha",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nhs_region",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "northings",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "nuts",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "oa21",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "outcode",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "parish",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "parliamentary_constituency",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "parliamentary_constituency_2024",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pfa",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "postcode",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "primary_care_trust",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "quality",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "region",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "result",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "ruc11",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ruc21",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "ttwa",
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
						"name": "result",
						"req": true,
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
						"name": "result",
						"req": true,
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
