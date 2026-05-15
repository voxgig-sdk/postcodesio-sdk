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
			"auth": map[string]any{
				"prefix": "Bearer",
			},
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
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "status",
						"req": true,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "nearest",
				"op": map[string]any{
					"list": map[string]any{
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
											"active": true,
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
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
						"name": "result",
						"req": true,
						"type": "`$ANY`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "status",
						"req": true,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "outcode",
				"op": map[string]any{
					"load": map[string]any{
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
											"active": true,
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
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
						"name": "code",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "country",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "county_unitary",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "county_unitary_type",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "district_borough",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 4,
					},
					map[string]any{
						"name": "district_borough_type",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 5,
					},
					map[string]any{
						"name": "easting",
						"req": true,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 6,
					},
					map[string]any{
						"name": "latitude",
						"req": true,
						"type": "`$NUMBER`",
						"active": true,
						"index$": 7,
					},
					map[string]any{
						"name": "local_type",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 8,
					},
					map[string]any{
						"name": "longitude",
						"req": true,
						"type": "`$NUMBER`",
						"active": true,
						"index$": 9,
					},
					map[string]any{
						"name": "max_easting",
						"req": true,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 10,
					},
					map[string]any{
						"name": "max_northing",
						"req": true,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 11,
					},
					map[string]any{
						"name": "min_easting",
						"req": true,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 12,
					},
					map[string]any{
						"name": "min_northing",
						"req": true,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 13,
					},
					map[string]any{
						"name": "name_1",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 14,
					},
					map[string]any{
						"name": "name_1_lang",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 15,
					},
					map[string]any{
						"name": "name_2",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 16,
					},
					map[string]any{
						"name": "name_2_lang",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 17,
					},
					map[string]any{
						"name": "northing",
						"req": true,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 18,
					},
					map[string]any{
						"name": "outcode",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 19,
					},
					map[string]any{
						"name": "region",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 20,
					},
					map[string]any{
						"name": "result",
						"req": true,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 21,
					},
					map[string]any{
						"name": "status",
						"req": true,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 22,
					},
				},
				"name": "place",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
						"points": []any{
							map[string]any{
								"method": "GET",
								"orig": "/places",
								"parts": []any{
									"places",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
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
											"active": true,
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
								"active": true,
								"index$": 0,
							},
							map[string]any{
								"method": "GET",
								"orig": "/random/places",
								"parts": []any{
									"random",
									"places",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 1,
							},
						},
						"input": "data",
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
						"name": "result",
						"req": true,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "status",
						"req": true,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "postcode",
				"op": map[string]any{
					"create": map[string]any{
						"name": "create",
						"points": []any{
							map[string]any{
								"method": "POST",
								"orig": "/postcodes",
								"parts": []any{
									"postcodes",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "create",
					},
					"list": map[string]any{
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 51.50354,
											"kind": "query",
											"name": "latitude",
											"orig": "latitude",
											"reqd": false,
											"type": "`$NUMBER`",
											"active": true,
										},
										map[string]any{
											"example": 3,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"example": -0.127695,
											"kind": "query",
											"name": "longitude",
											"orig": "longitude",
											"reqd": false,
											"type": "`$NUMBER`",
											"active": true,
										},
										map[string]any{
											"example": "SW1A 2AA",
											"kind": "query",
											"name": "query",
											"orig": "query",
											"reqd": false,
											"type": "`$ANY`",
											"active": true,
										},
										map[string]any{
											"example": 500,
											"kind": "query",
											"name": "radius",
											"orig": "radius",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"example": "true",
											"kind": "query",
											"name": "widesearch",
											"orig": "widesearch",
											"reqd": false,
											"type": "`$BOOLEAN`",
											"active": true,
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
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
											"active": true,
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
								"active": true,
								"index$": 0,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "SW1A",
											"kind": "query",
											"name": "outcode",
											"orig": "outcode",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
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
								"active": true,
								"index$": 1,
							},
						},
						"input": "data",
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
						"name": "result",
						"req": true,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "status",
						"req": true,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "scottish_postcode",
				"op": map[string]any{
					"load": map[string]any{
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
											"active": true,
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
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
						"name": "result",
						"req": true,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "status",
						"req": true,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "terminated_postcode",
				"op": map[string]any{
					"load": map[string]any{
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
											"active": true,
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
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
