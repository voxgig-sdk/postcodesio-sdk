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
            "name": "result",
            "req": True,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "status",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 1,
          },
        ],
        "name": "nearest",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "SW1A 2AA",
                      "kind": "param",
                      "name": "postcode_id",
                      "orig": "postcode",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
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
            "name": "result",
            "req": True,
            "type": "`$ANY`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "status",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 1,
          },
        ],
        "name": "outcode",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "SW1A",
                      "kind": "param",
                      "name": "id",
                      "orig": "outcode",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
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
            "name": "code",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "country",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "county_unitary",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "county_unitary_type",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "district_borough",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "district_borough_type",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "easting",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "latitude",
            "req": True,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "local_type",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 8,
          },
          {
            "name": "longitude",
            "req": True,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 9,
          },
          {
            "name": "max_easting",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 10,
          },
          {
            "name": "max_northing",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 11,
          },
          {
            "name": "min_easting",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 12,
          },
          {
            "name": "min_northing",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 13,
          },
          {
            "name": "name_1",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 14,
          },
          {
            "name": "name_1_lang",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 15,
          },
          {
            "name": "name_2",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 16,
          },
          {
            "name": "name_2_lang",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 17,
          },
          {
            "name": "northing",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 18,
          },
          {
            "name": "outcode",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 19,
          },
          {
            "name": "region",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 20,
          },
          {
            "name": "result",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 21,
          },
          {
            "name": "status",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 22,
          },
        ],
        "name": "place",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "method": "GET",
                "orig": "/places",
                "parts": [
                  "places",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "code",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
              {
                "method": "GET",
                "orig": "/random/places",
                "parts": [
                  "random",
                  "places",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 1,
              },
            ],
            "input": "data",
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
            "name": "result",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "status",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 1,
          },
        ],
        "name": "postcode",
        "op": {
          "create": {
            "name": "create",
            "points": [
              {
                "method": "POST",
                "orig": "/postcodes",
                "parts": [
                  "postcodes",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "create",
          },
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "postcode",
                      "kind": "query",
                      "name": "filter",
                      "orig": "filter",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": 51.50354,
                      "kind": "query",
                      "name": "latitude",
                      "orig": "latitude",
                      "reqd": False,
                      "type": "`$NUMBER`",
                      "active": True,
                    },
                    {
                      "example": 3,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "example": -0.127695,
                      "kind": "query",
                      "name": "longitude",
                      "orig": "longitude",
                      "reqd": False,
                      "type": "`$NUMBER`",
                      "active": True,
                    },
                    {
                      "example": "SW1A 2AA",
                      "kind": "query",
                      "name": "query",
                      "orig": "query",
                      "reqd": False,
                      "type": "`$ANY`",
                      "active": True,
                    },
                    {
                      "example": 500,
                      "kind": "query",
                      "name": "radius",
                      "orig": "radius",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "example": "true",
                      "kind": "query",
                      "name": "widesearch",
                      "orig": "widesearch",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "SW1A 2AA",
                      "kind": "param",
                      "name": "id",
                      "orig": "postcode",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
              {
                "args": {
                  "query": [
                    {
                      "example": "SW1A",
                      "kind": "query",
                      "name": "outcode",
                      "orig": "outcode",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 1,
              },
            ],
            "input": "data",
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
            "name": "result",
            "req": True,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "status",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 1,
          },
        ],
        "name": "scottish_postcode",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "postcode",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
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
            "name": "result",
            "req": True,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "status",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 1,
          },
        ],
        "name": "terminated_postcode",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "postcode",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
