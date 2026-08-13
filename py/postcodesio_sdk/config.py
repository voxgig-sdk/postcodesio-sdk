# Postcodesio SDK configuration


def make_config():
    return {
        "main": {
            "name": "Postcodesio",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.postcodes.io",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "nearest": {},
                "outcode": {},
                "place": {},
                "postcode": {},
                "scottish_postcode": {},
                "terminated_postcode": {},
            },
        },
        "entity": {
      "nearest": {
        "fields": [
          {
            "active": True,
            "name": "result",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "status",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 1,
          },
        ],
        "name": "nearest",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "SW1A 2AA",
                      "kind": "param",
                      "name": "postcode_id",
                      "orig": "postcode",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/postcodes/{postcode}/nearest",
                "parts": [
                  "postcodes",
                  "{postcode_id}",
                  "nearest",
                ],
                "rename": {
                  "param": {
                    "postcode": "postcode_id",
                  },
                },
                "select": {
                  "exist": [
                    "postcode_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.result`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [
            [
              "postcode",
            ],
          ],
        },
      },
      "outcode": {
        "fields": [],
        "name": "outcode",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "SW1A",
                      "kind": "param",
                      "name": "id",
                      "orig": "outcode",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/outcodes/{outcode}",
                "parts": [
                  "outcodes",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "outcode": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.result`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "place": {
        "fields": [
          {
            "active": True,
            "name": "code",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "country",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "county_unitary",
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "county_unitary_type",
            "req": True,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "district_borough",
            "req": True,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "district_borough_type",
            "req": False,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "eastings",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "latitude",
            "req": True,
            "type": "`$NUMBER`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "local_type",
            "req": True,
            "type": "`$STRING`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "longitude",
            "req": True,
            "type": "`$NUMBER`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "max_eastings",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 10,
          },
          {
            "active": True,
            "name": "max_northings",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 11,
          },
          {
            "active": True,
            "name": "min_eastings",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 12,
          },
          {
            "active": True,
            "name": "min_northings",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 13,
          },
          {
            "active": True,
            "name": "name_1",
            "req": True,
            "type": "`$STRING`",
            "index$": 14,
          },
          {
            "active": True,
            "name": "name_1_lang",
            "req": True,
            "type": "`$STRING`",
            "index$": 15,
          },
          {
            "active": True,
            "name": "name_2",
            "req": True,
            "type": "`$STRING`",
            "index$": 16,
          },
          {
            "active": True,
            "name": "name_2_lang",
            "req": True,
            "type": "`$STRING`",
            "index$": 17,
          },
          {
            "active": True,
            "name": "northings",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 18,
          },
          {
            "active": True,
            "name": "outcode",
            "req": True,
            "type": "`$STRING`",
            "index$": 19,
          },
          {
            "active": True,
            "name": "region",
            "req": True,
            "type": "`$STRING`",
            "index$": 20,
          },
        ],
        "name": "place",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/places",
                "parts": [
                  "places",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.result`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "code",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/places/{code}",
                "parts": [
                  "places",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "code": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.result`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/random/places",
                "parts": [
                  "random",
                  "places",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.result`",
                },
                "index$": 1,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "postcode": {
        "fields": [
          {
            "active": True,
            "name": "admin_county",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "admin_district",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "admin_ward",
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "bua",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "cancer_alliance",
            "req": False,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "ccg",
            "req": True,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "ced",
            "req": True,
            "type": "`$STRING`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "codes",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "country",
            "req": True,
            "type": "`$STRING`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "date_of_introduction",
            "req": False,
            "type": "`$STRING`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "eastings",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 10,
          },
          {
            "active": True,
            "name": "european_electoral_region",
            "req": True,
            "type": "`$STRING`",
            "index$": 11,
          },
          {
            "active": True,
            "name": "icb",
            "req": False,
            "type": "`$STRING`",
            "index$": 12,
          },
          {
            "active": True,
            "name": "incode",
            "req": True,
            "type": "`$STRING`",
            "index$": 13,
          },
          {
            "active": True,
            "name": "latitude",
            "req": True,
            "type": "`$NUMBER`",
            "index$": 14,
          },
          {
            "active": True,
            "name": "lep1",
            "req": False,
            "type": "`$STRING`",
            "index$": 15,
          },
          {
            "active": True,
            "name": "lep2",
            "req": False,
            "type": "`$STRING`",
            "index$": 16,
          },
          {
            "active": True,
            "name": "longitude",
            "req": True,
            "type": "`$NUMBER`",
            "index$": 17,
          },
          {
            "active": True,
            "name": "lsoa",
            "req": True,
            "type": "`$STRING`",
            "index$": 18,
          },
          {
            "active": True,
            "name": "lsoa11",
            "req": False,
            "type": "`$STRING`",
            "index$": 19,
          },
          {
            "active": True,
            "name": "lsoa21",
            "req": False,
            "type": "`$STRING`",
            "index$": 20,
          },
          {
            "active": True,
            "name": "msoa",
            "req": True,
            "type": "`$STRING`",
            "index$": 21,
          },
          {
            "active": True,
            "name": "msoa11",
            "req": False,
            "type": "`$STRING`",
            "index$": 22,
          },
          {
            "active": True,
            "name": "msoa21",
            "req": False,
            "type": "`$STRING`",
            "index$": 23,
          },
          {
            "active": True,
            "name": "national_park",
            "req": False,
            "type": "`$STRING`",
            "index$": 24,
          },
          {
            "active": True,
            "name": "nhs_ha",
            "req": True,
            "type": "`$STRING`",
            "index$": 25,
          },
          {
            "active": True,
            "name": "nhs_region",
            "req": False,
            "type": "`$STRING`",
            "index$": 26,
          },
          {
            "active": True,
            "name": "northings",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 27,
          },
          {
            "active": True,
            "name": "nuts",
            "req": True,
            "type": "`$STRING`",
            "index$": 28,
          },
          {
            "active": True,
            "name": "oa21",
            "req": False,
            "type": "`$STRING`",
            "index$": 29,
          },
          {
            "active": True,
            "name": "outcode",
            "req": True,
            "type": "`$STRING`",
            "index$": 30,
          },
          {
            "active": True,
            "name": "parish",
            "req": True,
            "type": "`$STRING`",
            "index$": 31,
          },
          {
            "active": True,
            "name": "parliamentary_constituency",
            "req": True,
            "type": "`$STRING`",
            "index$": 32,
          },
          {
            "active": True,
            "name": "parliamentary_constituency_2024",
            "req": False,
            "type": "`$STRING`",
            "index$": 33,
          },
          {
            "active": True,
            "name": "pfa",
            "req": False,
            "type": "`$STRING`",
            "index$": 34,
          },
          {
            "active": True,
            "name": "postcode",
            "req": True,
            "type": "`$STRING`",
            "index$": 35,
          },
          {
            "active": True,
            "name": "primary_care_trust",
            "req": True,
            "type": "`$STRING`",
            "index$": 36,
          },
          {
            "active": True,
            "name": "quality",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 37,
          },
          {
            "active": True,
            "name": "region",
            "req": True,
            "type": "`$STRING`",
            "index$": 38,
          },
          {
            "active": True,
            "name": "result",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 39,
          },
          {
            "active": True,
            "name": "ruc11",
            "req": False,
            "type": "`$STRING`",
            "index$": 40,
          },
          {
            "active": True,
            "name": "ruc21",
            "req": False,
            "type": "`$STRING`",
            "index$": 41,
          },
          {
            "active": True,
            "name": "status",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 42,
          },
          {
            "active": True,
            "name": "ttwa",
            "req": False,
            "type": "`$STRING`",
            "index$": 43,
          },
        ],
        "name": "postcode",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/postcodes",
                "parts": [
                  "postcodes",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.result`",
                },
                "index$": 0,
              },
            ],
            "key$": "create",
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "postcode",
                      "kind": "query",
                      "name": "filter",
                      "orig": "filter",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": 51.50354,
                      "kind": "query",
                      "name": "latitude",
                      "orig": "latitude",
                      "reqd": False,
                      "type": "`$NUMBER`",
                    },
                    {
                      "active": True,
                      "example": 3,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "example": -0.127695,
                      "kind": "query",
                      "name": "longitude",
                      "orig": "longitude",
                      "reqd": False,
                      "type": "`$NUMBER`",
                    },
                    {
                      "active": True,
                      "example": "SW1A 2AA",
                      "kind": "query",
                      "name": "query",
                      "orig": "query",
                      "reqd": False,
                      "type": "`$ANY`",
                    },
                    {
                      "active": True,
                      "example": 500,
                      "kind": "query",
                      "name": "radius",
                      "orig": "radius",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "example": "true",
                      "kind": "query",
                      "name": "widesearch",
                      "orig": "widesearch",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/postcodes",
                "parts": [
                  "postcodes",
                ],
                "select": {
                  "exist": [
                    "filter",
                    "latitude",
                    "limit",
                    "longitude",
                    "query",
                    "radius",
                    "widesearch",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.result`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "SW1A 2AA",
                      "kind": "param",
                      "name": "id",
                      "orig": "postcode",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/postcodes/{postcode}",
                "parts": [
                  "postcodes",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "postcode": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.result`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "SW1A",
                      "kind": "query",
                      "name": "outcode",
                      "orig": "outcode",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/random/postcodes",
                "parts": [
                  "random",
                  "postcodes",
                ],
                "select": {
                  "exist": [
                    "outcode",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.result`",
                },
                "index$": 1,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "scottish_postcode": {
        "fields": [
          {
            "active": True,
            "name": "result",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "status",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 1,
          },
        ],
        "name": "scottish_postcode",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "postcode",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/scotland/postcodes/{postcode}",
                "parts": [
                  "scotland",
                  "postcodes",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "postcode": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "terminated_postcode": {
        "fields": [
          {
            "active": True,
            "name": "result",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "status",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 1,
          },
        ],
        "name": "terminated_postcode",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "postcode",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/terminated_postcodes/{postcode}",
                "parts": [
                  "terminated_postcodes",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "postcode": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
