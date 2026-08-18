
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'Postcodesio',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api.postcodes.io",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      nearest: {
      },

      outcode: {
      },

      place: {
      },

      postcode: {
      },

      scottish_postcode: {
      },

      terminated_postcode: {
      },

    }
  }


  entity = {
    "nearest": {
      "fields": [
        {
          "name": "result",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "status",
          "req": true,
          "type": "`$INTEGER`"
        }
      ],
      "name": "nearest",
      "op": {
        "list": {
          "input": "data",
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/postcodes/{postcode}/nearest",
              "parts": [
                "postcodes",
                "{postcode_id}",
                "nearest"
              ],
              "rename": {
                "param": {
                  "postcode": "postcode_id"
                }
              },
              "select": {
                "exist": [
                  "postcode_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "postcode"
          ]
        ]
      }
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
              "args": {
                "params": [
                  {
                    "example": "SW1A",
                    "kind": "param",
                    "name": "id",
                    "orig": "outcode",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/outcodes/{outcode}",
              "parts": [
                "outcodes",
                "{id}"
              ],
              "rename": {
                "param": {
                  "outcode": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "place": {
      "fields": [
        {
          "name": "code",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "country",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "county_unitary",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "county_unitary_type",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "district_borough",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "district_borough_type",
          "type": "`$STRING`"
        },
        {
          "name": "eastings",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "latitude",
          "req": true,
          "type": "`$NUMBER`"
        },
        {
          "name": "local_type",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "longitude",
          "req": true,
          "type": "`$NUMBER`"
        },
        {
          "name": "max_eastings",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "max_northings",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "min_eastings",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "min_northings",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "name_1",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "name_1_lang",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "name_2",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "name_2_lang",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "northings",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "outcode",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "region",
          "req": true,
          "type": "`$STRING`"
        }
      ],
      "name": "place",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/places",
              "parts": [
                "places"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "code",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/places/{code}",
              "parts": [
                "places",
                "{id}"
              ],
              "rename": {
                "param": {
                  "code": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/random/places",
              "parts": [
                "random",
                "places"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "postcode": {
      "fields": [
        {
          "name": "admin_county",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "admin_district",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "admin_ward",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "bua",
          "type": "`$STRING`"
        },
        {
          "name": "cancer_alliance",
          "type": "`$STRING`"
        },
        {
          "name": "ccg",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "ced",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "codes",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "country",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "date_of_introduction",
          "type": "`$STRING`"
        },
        {
          "name": "eastings",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "european_electoral_region",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "icb",
          "type": "`$STRING`"
        },
        {
          "name": "incode",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "latitude",
          "req": true,
          "type": "`$NUMBER`"
        },
        {
          "name": "lep1",
          "type": "`$STRING`"
        },
        {
          "name": "lep2",
          "type": "`$STRING`"
        },
        {
          "name": "longitude",
          "req": true,
          "type": "`$NUMBER`"
        },
        {
          "name": "lsoa",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "lsoa11",
          "type": "`$STRING`"
        },
        {
          "name": "lsoa21",
          "type": "`$STRING`"
        },
        {
          "name": "msoa",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "msoa11",
          "type": "`$STRING`"
        },
        {
          "name": "msoa21",
          "type": "`$STRING`"
        },
        {
          "name": "national_park",
          "type": "`$STRING`"
        },
        {
          "name": "nhs_ha",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "nhs_region",
          "type": "`$STRING`"
        },
        {
          "name": "northings",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "nuts",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "oa21",
          "type": "`$STRING`"
        },
        {
          "name": "outcode",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "parish",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "parliamentary_constituency",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "parliamentary_constituency_2024",
          "type": "`$STRING`"
        },
        {
          "name": "pfa",
          "type": "`$STRING`"
        },
        {
          "name": "postcode",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "primary_care_trust",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "quality",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "region",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "result",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "ruc11",
          "type": "`$STRING`"
        },
        {
          "name": "ruc21",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "ttwa",
          "type": "`$STRING`"
        }
      ],
      "name": "postcode",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/postcodes",
              "parts": [
                "postcodes"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              }
            }
          ]
        },
        "list": {
          "input": "data",
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
                    "type": "`$STRING`"
                  },
                  {
                    "example": 51.50354,
                    "kind": "query",
                    "name": "latitude",
                    "orig": "latitude",
                    "type": "`$NUMBER`"
                  },
                  {
                    "example": 3,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": -0.127695,
                    "kind": "query",
                    "name": "longitude",
                    "orig": "longitude",
                    "type": "`$NUMBER`"
                  },
                  {
                    "example": "SW1A 2AA",
                    "kind": "query",
                    "name": "query",
                    "orig": "query",
                    "type": "`$ANY`"
                  },
                  {
                    "example": 500,
                    "kind": "query",
                    "name": "radius",
                    "orig": "radius",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "true",
                    "kind": "query",
                    "name": "widesearch",
                    "orig": "widesearch",
                    "type": "`$BOOLEAN`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/postcodes",
              "parts": [
                "postcodes"
              ],
              "select": {
                "exist": [
                  "filter",
                  "latitude",
                  "limit",
                  "longitude",
                  "query",
                  "radius",
                  "widesearch"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/postcodes/{postcode}",
              "parts": [
                "postcodes",
                "{id}"
              ],
              "rename": {
                "param": {
                  "postcode": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              }
            },
            {
              "args": {
                "query": [
                  {
                    "example": "SW1A",
                    "kind": "query",
                    "name": "outcode",
                    "orig": "outcode",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/random/postcodes",
              "parts": [
                "random",
                "postcodes"
              ],
              "select": {
                "exist": [
                  "outcode"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "scottish_postcode": {
      "fields": [
        {
          "name": "result",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "status",
          "req": true,
          "type": "`$INTEGER`"
        }
      ],
      "name": "scottish_postcode",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "postcode",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/scotland/postcodes/{postcode}",
              "parts": [
                "scotland",
                "postcodes",
                "{id}"
              ],
              "rename": {
                "param": {
                  "postcode": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "terminated_postcode": {
      "fields": [
        {
          "name": "result",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "status",
          "req": true,
          "type": "`$INTEGER`"
        }
      ],
      "name": "terminated_postcode",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "postcode",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/terminated_postcodes/{postcode}",
              "parts": [
                "terminated_postcodes",
                "{id}"
              ],
              "rename": {
                "param": {
                  "postcode": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

