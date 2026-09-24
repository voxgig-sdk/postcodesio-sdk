
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Postcodesio',
        slug: "postcodesio",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
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
          "title": "Result",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Array of nearest postcodes sorted by distance"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int32"
        }
      ],
      "name": "nearest",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/postcodes/{postcode}/nearest",
              "segments": [
                {
                  "lit": "postcodes"
                },
                {
                  "var": "postcode_id"
                },
                {
                  "lit": "nearest"
                }
              ],
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
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              },
              "args": {
                "params": [
                  {
                    "name": "postcode_id",
                    "orig": "postcode",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "SW1A 2AA"
                  }
                ]
              },
              "select": {
                "exist": [
                  "postcode_id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.postcode"
          ]
        ]
      }
    },
    "outcode": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "outcode",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/outcodes/{outcode}",
              "segments": [
                {
                  "lit": "outcodes"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "outcodes",
                "{id}"
              ],
              "rename": {
                "param": {
                  "outcode": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "outcode",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "SW1A"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
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
          "title": "Code",
          "type": "`$STRING`",
          "req": true,
          "short": "Unique identifier for the place record (persistent except for Section of Named/Numbered Roads)"
        },
        {
          "name": "country",
          "title": "Country",
          "type": "`$STRING`",
          "req": true,
          "short": "Country within Great Britain (England, Scotland, or Wales)"
        },
        {
          "name": "county_unitary",
          "title": "County Unitary",
          "type": "`$STRING`",
          "req": true,
          "short": "County, Unitary Authority or Greater London Authority that contains this place"
        },
        {
          "name": "county_unitary_type",
          "title": "County Unitary Type",
          "type": "`$STRING`",
          "req": true,
          "short": "Type of administrative unit (e.g., County, UnitaryAuthority)"
        },
        {
          "name": "district_borough",
          "title": "District Borough",
          "type": "`$STRING`",
          "req": true,
          "short": "District, Metropolitan District or London Borough containing this place"
        },
        {
          "name": "district_borough_type",
          "title": "District Borough Type",
          "type": "`$STRING`",
          "short": "Type of district/borough administrative unit"
        },
        {
          "name": "eastings",
          "title": "Eastings",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Ordnance Survey grid reference Easting (1m resolution, not available for Channel Islands/Isle of Man)"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "latitude",
          "title": "Latitude",
          "type": "`$NUMBER`",
          "req": true,
          "short": "WGS84 latitude coordinate",
          "format": "double"
        },
        {
          "name": "local_type",
          "title": "Local Type",
          "type": "`$STRING`",
          "req": true,
          "short": "Ordnance Survey classification (City, Town, Village, Hamlet, etc.)"
        },
        {
          "name": "longitude",
          "title": "Longitude",
          "type": "`$NUMBER`",
          "req": true,
          "short": "WGS84 longitude coordinate",
          "format": "double"
        },
        {
          "name": "max_eastings",
          "title": "Max Eastings",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Eastern edge of the place's bounding box (Minimum Bounding Rectangle)"
        },
        {
          "name": "max_northings",
          "title": "Max Northings",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Northern edge of the place's bounding box (Minimum Bounding Rectangle)"
        },
        {
          "name": "min_eastings",
          "title": "Min Eastings",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Western edge of the place's bounding box (Minimum Bounding Rectangle)"
        },
        {
          "name": "min_northings",
          "title": "Min Northings",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Southern edge of the place's bounding box (Minimum Bounding Rectangle)"
        },
        {
          "name": "name_1",
          "title": "Name 1",
          "type": "`$STRING`",
          "req": true,
          "short": "Official name of the place (preserves original format, e.g., \"The Pennines\" not \"Pennines, The\")"
        },
        {
          "name": "name_1_lang",
          "title": "Name 1 Lang",
          "type": "`$STRING`",
          "req": true,
          "short": "Language code for name_1 (cym=Welsh, eng=English, gla=Scottish Gaelic)"
        },
        {
          "name": "name_2",
          "title": "Name 2",
          "type": "`$STRING`",
          "req": true,
          "short": "Alternative name in a different language"
        },
        {
          "name": "name_2_lang",
          "title": "Name 2 Lang",
          "type": "`$STRING`",
          "req": true,
          "short": "Language code for name_2 (cym=Welsh, eng=English, gla=Scottish Gaelic)"
        },
        {
          "name": "northings",
          "title": "Northings",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Ordnance Survey grid reference Northing (1m resolution, not available for Channel Islands/Isle of Man)"
        },
        {
          "name": "outcode",
          "title": "Outcode",
          "type": "`$STRING`",
          "req": true,
          "short": "Postcode district (first part of the postcode)"
        },
        {
          "name": "region",
          "title": "Region",
          "type": "`$STRING`",
          "req": true,
          "short": "European Region (formerly Government Office Region) containing this place"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "place",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/places",
              "segments": [
                {
                  "lit": "places"
                }
              ],
              "parts": [
                "places"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/places/{code}",
              "segments": [
                {
                  "lit": "places"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "places",
                "{id}"
              ],
              "rename": {
                "param": {
                  "code": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "code",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/random/places",
              "segments": [
                {
                  "lit": "random"
                },
                {
                  "lit": "places"
                }
              ],
              "parts": [
                "random",
                "places"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              },
              "args": {},
              "select": {}
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
          "title": "Admin County",
          "type": "`$STRING`",
          "req": true,
          "short": "The administrative county for this postcode."
        },
        {
          "name": "admin_district",
          "title": "Admin District",
          "type": "`$STRING`",
          "req": true,
          "short": "The administrative district or unitary authority for this postcode."
        },
        {
          "name": "admin_ward",
          "title": "Admin Ward",
          "type": "`$STRING`",
          "req": true,
          "short": "The electoral/administrative ward for this postcode."
        },
        {
          "name": "bua",
          "title": "Bua",
          "type": "`$STRING`",
          "short": "The Built-up Area (2022) for this postcode."
        },
        {
          "name": "cancer_alliance",
          "title": "Cancer Alliance",
          "type": "`$STRING`",
          "short": "The Cancer Alliance for this postcode."
        },
        {
          "name": "ccg",
          "title": "Ccg",
          "type": "`$STRING`",
          "req": true,
          "short": "NHS Clinical Commissioning Group responsible for planning healthcare services in England."
        },
        {
          "name": "ced",
          "title": "Ced",
          "type": "`$STRING`",
          "req": true,
          "short": "The county electoral division for English postcodes."
        },
        {
          "name": "codes",
          "title": "Codes",
          "type": "`$OBJECT`",
          "req": true,
          "short": "Contains the GSS (Government Statistical Service) codes for administrative areas."
        },
        {
          "name": "country",
          "title": "Country",
          "type": "`$STRING`",
          "req": true,
          "short": "The UK constituent country for this postcode (England, Scotland, Wales, Northern Ireland, Channel Islands, or Isle of Man)."
        },
        {
          "name": "date_of_introduction",
          "title": "Date Of Introduction",
          "type": "`$STRING`",
          "short": "The date the postcode was introduced in YYYYMM format."
        },
        {
          "name": "eastings",
          "title": "Eastings",
          "type": "`$INTEGER`",
          "req": true,
          "short": "The OS grid reference easting (X-coordinate) to 1 metre resolution.",
          "format": "int32"
        },
        {
          "name": "european_electoral_region",
          "title": "European Electoral Region",
          "type": "`$STRING`",
          "req": true,
          "short": "The European Electoral Region for this postcode."
        },
        {
          "name": "icb",
          "title": "Icb",
          "type": "`$STRING`",
          "short": "The NHS Integrated Care Board responsible for healthcare planning in this area."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "incode",
          "title": "Incode",
          "type": "`$STRING`",
          "req": true,
          "short": "The second part of a postcode after the space (always 3 characters)."
        },
        {
          "name": "latitude",
          "title": "Latitude",
          "type": "`$NUMBER`",
          "req": true,
          "short": "WGS84 latitude coordinate (north-south position).",
          "format": "double"
        },
        {
          "name": "lep1",
          "title": "Lep1",
          "type": "`$STRING`",
          "short": "The primary Local Enterprise Partnership for this postcode."
        },
        {
          "name": "lep2",
          "title": "Lep2",
          "type": "`$STRING`",
          "short": "The secondary Local Enterprise Partnership for this postcode, if it falls within overlapping LEP areas."
        },
        {
          "name": "longitude",
          "title": "Longitude",
          "type": "`$NUMBER`",
          "req": true,
          "short": "WGS84 longitude coordinate (east-west position).",
          "format": "double"
        },
        {
          "name": "lsoa",
          "title": "Lsoa",
          "type": "`$STRING`",
          "req": true,
          "short": "2021 Census LSOA code (smaller statistical area, typically 1,000-1,500 residents)."
        },
        {
          "name": "lsoa11",
          "title": "Lsoa11",
          "type": "`$STRING`",
          "short": "2011 Census LSOA code."
        },
        {
          "name": "lsoa21",
          "title": "Lsoa21",
          "type": "`$STRING`",
          "short": "2021 Census LSOA code."
        },
        {
          "name": "msoa",
          "title": "Msoa",
          "type": "`$STRING`",
          "req": true,
          "short": "2021 Census MSOA code (mid-size statistical area, typically 5,000-7,000 residents)."
        },
        {
          "name": "msoa11",
          "title": "Msoa11",
          "type": "`$STRING`",
          "short": "2011 Census MSOA code."
        },
        {
          "name": "msoa21",
          "title": "Msoa21",
          "type": "`$STRING`",
          "short": "2021 Census MSOA code."
        },
        {
          "name": "national_park",
          "title": "National Park",
          "type": "`$STRING`",
          "short": "The National Park this postcode falls within, if any."
        },
        {
          "name": "nhs_ha",
          "title": "Nhs Ha",
          "type": "`$STRING`",
          "req": true,
          "short": "The NHS health authority area for this postcode."
        },
        {
          "name": "nhs_region",
          "title": "Nhs Region",
          "type": "`$STRING`",
          "short": "The NHS England Region for this postcode."
        },
        {
          "name": "northings",
          "title": "Northings",
          "type": "`$INTEGER`",
          "req": true,
          "short": "The OS grid reference northing (Y-coordinate) to 1 metre resolution.",
          "format": "int32"
        },
        {
          "name": "nuts",
          "title": "Nuts",
          "type": "`$STRING`",
          "req": true,
          "short": "Statistical geography code for international comparisons (formerly NUTS - Nomenclature of Units for Territorial Statistics)."
        },
        {
          "name": "oa21",
          "title": "Oa21",
          "type": "`$STRING`",
          "short": "2021 Census Output Area code - the smallest census geography."
        },
        {
          "name": "outcode",
          "title": "Outcode",
          "type": "`$STRING`",
          "req": true,
          "short": "The first part of a postcode before the space (2-4 characters)."
        },
        {
          "name": "parish",
          "title": "Parish",
          "type": "`$STRING`",
          "req": true,
          "short": "The civil parish (England) or community (Wales) for this postcode."
        },
        {
          "name": "parliamentary_constituency",
          "title": "Parliamentary Constituency",
          "type": "`$STRING`",
          "req": true,
          "short": "The UK Parliamentary constituency for this postcode."
        },
        {
          "name": "parliamentary_constituency_2024",
          "title": "Parliamentary Constituency 2024",
          "type": "`$STRING`",
          "short": "The UK Parliamentary constituency for this postcode based on July 2024 boundaries."
        },
        {
          "name": "pfa",
          "title": "Pfa",
          "type": "`$STRING`",
          "short": "The police force area for this postcode."
        },
        {
          "name": "postcode",
          "title": "Postcode",
          "type": "`$STRING`",
          "req": true,
          "short": "UK postcode format: 2-4 character outward code, a space, and a 3-character inward code (e.g., SW1A 2AA)."
        },
        {
          "name": "primary_care_trust",
          "title": "Primary Care Trust",
          "type": "`$STRING`",
          "req": true,
          "short": "The healthcare administrative area for this postcode."
        },
        {
          "name": "quality",
          "title": "Quality",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Positional Quality Indicator (1-9)."
        },
        {
          "name": "region",
          "title": "Region",
          "type": "`$STRING`",
          "req": true,
          "short": "The regional designation for this postcode (formerly Government Office Regions or GORs)."
        },
        {
          "name": "result",
          "title": "Result",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Array containing detailed location information for the requested postcode or nearest postcodes"
        },
        {
          "name": "ruc11",
          "title": "Ruc11",
          "type": "`$STRING`",
          "short": "The 2011 Census Rural-Urban Classification for this postcode."
        },
        {
          "name": "ruc21",
          "title": "Ruc21",
          "type": "`$STRING`",
          "short": "The 2021 Census Rural-Urban Classification for this postcode."
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int32"
        },
        {
          "name": "ttwa",
          "title": "Ttwa",
          "type": "`$STRING`",
          "short": "The Travel to Work Area for this postcode."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "postcode",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/postcodes",
              "segments": [
                {
                  "lit": "postcodes"
                }
              ],
              "parts": [
                "postcodes"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/postcodes",
              "segments": [
                {
                  "lit": "postcodes"
                }
              ],
              "parts": [
                "postcodes"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              },
              "args": {
                "query": [
                  {
                    "name": "filter",
                    "orig": "filter",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "postcode"
                  },
                  {
                    "name": "latitude",
                    "orig": "latitude",
                    "type": "`$NUMBER`",
                    "kind": "query",
                    "example": 51.50354
                  },
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 3
                  },
                  {
                    "name": "longitude",
                    "orig": "longitude",
                    "type": "`$NUMBER`",
                    "kind": "query",
                    "example": -0.127695
                  },
                  {
                    "name": "query",
                    "orig": "query",
                    "type": "`$ANY`",
                    "kind": "query",
                    "example": "SW1A 2AA"
                  },
                  {
                    "name": "radius",
                    "orig": "radius",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 500
                  },
                  {
                    "name": "widesearch",
                    "orig": "widesearch",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "example": "true"
                  }
                ]
              },
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
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/postcodes/{postcode}",
              "segments": [
                {
                  "lit": "postcodes"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "postcodes",
                "{id}"
              ],
              "rename": {
                "param": {
                  "postcode": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "postcode",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "SW1A 2AA"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/random/postcodes",
              "segments": [
                {
                  "lit": "random"
                },
                {
                  "lit": "postcodes"
                }
              ],
              "parts": [
                "random",
                "postcodes"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              },
              "args": {
                "query": [
                  {
                    "name": "outcode",
                    "orig": "outcode",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "SW1A"
                  }
                ]
              },
              "select": {
                "exist": [
                  "outcode"
                ]
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
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "result",
          "title": "Result",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Data for a given postcode"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int32"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "scottish_postcode",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/scotland/postcodes/{postcode}",
              "segments": [
                {
                  "lit": "scotland"
                },
                {
                  "lit": "postcodes"
                },
                {
                  "var": "id"
                }
              ],
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
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "postcode",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
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
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "result",
          "title": "Result",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Data for a given postcode"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int32"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "terminated_postcode",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/terminated_postcodes/{postcode}",
              "segments": [
                {
                  "lit": "terminated_postcodes"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "terminated_postcodes",
                "{id}"
              ],
              "rename": {
                "param": {
                  "postcode": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "postcode",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
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
  config,
  FEATURE_PLUGINS,
}

