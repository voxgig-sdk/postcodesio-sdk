package core

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
						"active": true,
						"name": "result",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "status",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 1,
					},
				},
				"name": "nearest",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "SW1A 2AA",
											"kind": "param",
											"name": "postcode_id",
											"orig": "postcode",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "list",
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
						"active": true,
						"name": "result",
						"req": true,
						"type": "`$ANY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "status",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 1,
					},
				},
				"name": "outcode",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "SW1A",
											"kind": "param",
											"name": "id",
											"orig": "outcode",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"place": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "code",
						"req": true,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "country",
						"req": true,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "county_unitary",
						"req": true,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "county_unitary_type",
						"req": true,
						"type": "`$STRING`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "district_borough",
						"req": true,
						"type": "`$STRING`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "district_borough_type",
						"req": false,
						"type": "`$STRING`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "easting",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "latitude",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "local_type",
						"req": true,
						"type": "`$STRING`",
						"index$": 8,
					},
					map[string]any{
						"active": true,
						"name": "longitude",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 9,
					},
					map[string]any{
						"active": true,
						"name": "max_easting",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 10,
					},
					map[string]any{
						"active": true,
						"name": "max_northing",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 11,
					},
					map[string]any{
						"active": true,
						"name": "min_easting",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 12,
					},
					map[string]any{
						"active": true,
						"name": "min_northing",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 13,
					},
					map[string]any{
						"active": true,
						"name": "name_1",
						"req": true,
						"type": "`$STRING`",
						"index$": 14,
					},
					map[string]any{
						"active": true,
						"name": "name_1_lang",
						"req": true,
						"type": "`$STRING`",
						"index$": 15,
					},
					map[string]any{
						"active": true,
						"name": "name_2",
						"req": true,
						"type": "`$STRING`",
						"index$": 16,
					},
					map[string]any{
						"active": true,
						"name": "name_2_lang",
						"req": true,
						"type": "`$STRING`",
						"index$": 17,
					},
					map[string]any{
						"active": true,
						"name": "northing",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 18,
					},
					map[string]any{
						"active": true,
						"name": "outcode",
						"req": true,
						"type": "`$STRING`",
						"index$": 19,
					},
					map[string]any{
						"active": true,
						"name": "region",
						"req": true,
						"type": "`$STRING`",
						"index$": 20,
					},
					map[string]any{
						"active": true,
						"name": "result",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 21,
					},
					map[string]any{
						"active": true,
						"name": "status",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 22,
					},
				},
				"name": "place",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
								"method": "GET",
								"orig": "/places",
								"parts": []any{
									"places",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "list",
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "code",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{},
								"method": "GET",
								"orig": "/random/places",
								"parts": []any{
									"random",
									"places",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 1,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"postcode": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "result",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "status",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 1,
					},
				},
				"name": "postcode",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
								"method": "POST",
								"orig": "/postcodes",
								"parts": []any{
									"postcodes",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "create",
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "postcode",
											"kind": "query",
											"name": "filter",
											"orig": "filter",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": 51.50354,
											"kind": "query",
											"name": "latitude",
											"orig": "latitude",
											"reqd": false,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"example": 3,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"example": -0.127695,
											"kind": "query",
											"name": "longitude",
											"orig": "longitude",
											"reqd": false,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"example": "SW1A 2AA",
											"kind": "query",
											"name": "query",
											"orig": "query",
											"reqd": false,
											"type": "`$ANY`",
										},
										map[string]any{
											"active": true,
											"example": 500,
											"kind": "query",
											"name": "radius",
											"orig": "radius",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"example": "true",
											"kind": "query",
											"name": "widesearch",
											"orig": "widesearch",
											"reqd": false,
											"type": "`$BOOLEAN`",
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "list",
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "SW1A 2AA",
											"kind": "param",
											"name": "id",
											"orig": "postcode",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "SW1A",
											"kind": "query",
											"name": "outcode",
											"orig": "outcode",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 1,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"scottish_postcode": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "result",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "status",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 1,
					},
				},
				"name": "scottish_postcode",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "postcode",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"terminated_postcode": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "result",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "status",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 1,
					},
				},
				"name": "terminated_postcode",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "postcode",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
