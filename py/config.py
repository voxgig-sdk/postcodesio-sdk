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
            "auth": {
                "prefix": "Bearer",
            },
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
                    },
                  ],
                },
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
                  "res": "`body`",
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
        "fields": [
          {
            "active": True,
            "name": "result",
            "req": True,
            "type": "`$ANY`",
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
                    },
                  ],
                },
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
            "name": "easting",
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
            "name": "max_easting",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 10,
          },
          {
            "active": True,
            "name": "max_northing",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 11,
          },
          {
            "active": True,
            "name": "min_easting",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 12,
          },
          {
            "active": True,
            "name": "min_northing",
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
            "name": "northing",
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
          {
            "active": True,
            "name": "result",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 21,
          },
          {
            "active": True,
            "name": "status",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 22,
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
                "method": "GET",
                "orig": "/places",
                "parts": [
                  "places",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
                    },
                  ],
                },
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
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/random/places",
                "parts": [
                  "random",
                  "places",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "name": "result",
            "req": True,
            "type": "`$OBJECT`",
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
        "name": "postcode",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "POST",
                "orig": "/postcodes",
                "parts": [
                  "postcodes",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
                  "res": "`body`",
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
                    },
                  ],
                },
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
                  "res": "`body`",
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
                  "res": "`body`",
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
                    },
                  ],
                },
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
                    },
                  ],
                },
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
