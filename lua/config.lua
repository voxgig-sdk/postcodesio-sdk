-- Postcodesio SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Postcodesio",
      slug = "postcodesio",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://api.postcodes.io",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["nearest"] = {},
        ["outcode"] = {},
        ["place"] = {},
        ["postcode"] = {},
        ["scottish_postcode"] = {},
        ["terminated_postcode"] = {},
      },
    },
    entity = {
      ["nearest"] = {
        ["fields"] = {
          {
            ["name"] = "result",
            ["req"] = true,
            ["short"] = "Array of nearest postcodes sorted by distance",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "status",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "nearest",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "SW1A 2AA",
                      ["kind"] = "param",
                      ["name"] = "postcode_id",
                      ["orig"] = "postcode",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/postcodes/{postcode}/nearest",
                ["parts"] = {
                  "postcodes",
                  "{postcode_id}",
                  "nearest",
                },
                ["rename"] = {
                  ["param"] = {
                    ["postcode"] = "postcode_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "postcode_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.result`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "postcode",
            },
          },
        },
      },
      ["outcode"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "outcode",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "SW1A",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "outcode",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/outcodes/{outcode}",
                ["parts"] = {
                  "outcodes",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["outcode"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.result`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["place"] = {
        ["fields"] = {
          {
            ["name"] = "code",
            ["req"] = true,
            ["short"] = "Unique identifier for the place record (persistent except for Section of Named/Numbered Roads)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "country",
            ["req"] = true,
            ["short"] = "Country within Great Britain (England, Scotland, or Wales)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "county_unitary",
            ["req"] = true,
            ["short"] = "County, Unitary Authority or Greater London Authority that contains this place",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "county_unitary_type",
            ["req"] = true,
            ["short"] = "Type of administrative unit (e.g., County, UnitaryAuthority)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "district_borough",
            ["req"] = true,
            ["short"] = "District, Metropolitan District or London Borough containing this place",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "district_borough_type",
            ["short"] = "Type of district/borough administrative unit",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "eastings",
            ["req"] = true,
            ["short"] = "Ordnance Survey grid reference Easting (1m resolution, not available for Channel Islands/Isle of Man)",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "latitude",
            ["req"] = true,
            ["short"] = "WGS84 latitude coordinate",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "local_type",
            ["req"] = true,
            ["short"] = "Ordnance Survey classification (City, Town, Village, Hamlet, etc.)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "longitude",
            ["req"] = true,
            ["short"] = "WGS84 longitude coordinate",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "max_eastings",
            ["req"] = true,
            ["short"] = "Eastern edge of the place's bounding box (Minimum Bounding Rectangle)",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "max_northings",
            ["req"] = true,
            ["short"] = "Northern edge of the place's bounding box (Minimum Bounding Rectangle)",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "min_eastings",
            ["req"] = true,
            ["short"] = "Western edge of the place's bounding box (Minimum Bounding Rectangle)",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "min_northings",
            ["req"] = true,
            ["short"] = "Southern edge of the place's bounding box (Minimum Bounding Rectangle)",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "name_1",
            ["req"] = true,
            ["short"] = "Official name of the place (preserves original format, e.g., \"The Pennines\" not \"Pennines, The\")",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name_1_lang",
            ["req"] = true,
            ["short"] = "Language code for name_1 (cym=Welsh, eng=English, gla=Scottish Gaelic)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name_2",
            ["req"] = true,
            ["short"] = "Alternative name in a different language",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name_2_lang",
            ["req"] = true,
            ["short"] = "Language code for name_2 (cym=Welsh, eng=English, gla=Scottish Gaelic)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "northings",
            ["req"] = true,
            ["short"] = "Ordnance Survey grid reference Northing (1m resolution, not available for Channel Islands/Isle of Man)",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "outcode",
            ["req"] = true,
            ["short"] = "Postcode district (first part of the postcode)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "region",
            ["req"] = true,
            ["short"] = "European Region (formerly Government Office Region) containing this place",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "place",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/places",
                ["parts"] = {
                  "places",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.result`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "code",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/places/{code}",
                ["parts"] = {
                  "places",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["code"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.result`",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/random/places",
                ["parts"] = {
                  "random",
                  "places",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.result`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["postcode"] = {
        ["fields"] = {
          {
            ["name"] = "admin_county",
            ["req"] = true,
            ["short"] = "The administrative county for this postcode.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "admin_district",
            ["req"] = true,
            ["short"] = "The administrative district or unitary authority for this postcode.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "admin_ward",
            ["req"] = true,
            ["short"] = "The electoral/administrative ward for this postcode.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "bua",
            ["short"] = "The Built-up Area (2022) for this postcode.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "cancer_alliance",
            ["short"] = "The Cancer Alliance for this postcode.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "ccg",
            ["req"] = true,
            ["short"] = "NHS Clinical Commissioning Group responsible for planning healthcare services in England.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "ced",
            ["req"] = true,
            ["short"] = "The county electoral division for English postcodes.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "codes",
            ["req"] = true,
            ["short"] = "Contains the GSS (Government Statistical Service) codes for administrative areas.",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "country",
            ["req"] = true,
            ["short"] = "The UK constituent country for this postcode (England, Scotland, Wales, Northern Ireland, Channel Islands, or Isle of Man).",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "date_of_introduction",
            ["short"] = "The date the postcode was introduced in YYYYMM format.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "eastings",
            ["req"] = true,
            ["short"] = "The OS grid reference easting (X-coordinate) to 1 metre resolution.",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "european_electoral_region",
            ["req"] = true,
            ["short"] = "The European Electoral Region for this postcode.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "icb",
            ["short"] = "The NHS Integrated Care Board responsible for healthcare planning in this area.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "incode",
            ["req"] = true,
            ["short"] = "The second part of a postcode after the space (always 3 characters).",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "latitude",
            ["req"] = true,
            ["short"] = "WGS84 latitude coordinate (north-south position).",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "lep1",
            ["short"] = "The primary Local Enterprise Partnership for this postcode.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "lep2",
            ["short"] = "The secondary Local Enterprise Partnership for this postcode, if it falls within overlapping LEP areas.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "longitude",
            ["req"] = true,
            ["short"] = "WGS84 longitude coordinate (east-west position).",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "lsoa",
            ["req"] = true,
            ["short"] = "2021 Census LSOA code (smaller statistical area, typically 1,000-1,500 residents).",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "lsoa11",
            ["short"] = "2011 Census LSOA code.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "lsoa21",
            ["short"] = "2021 Census LSOA code.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "msoa",
            ["req"] = true,
            ["short"] = "2021 Census MSOA code (mid-size statistical area, typically 5,000-7,000 residents).",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "msoa11",
            ["short"] = "2011 Census MSOA code.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "msoa21",
            ["short"] = "2021 Census MSOA code.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "national_park",
            ["short"] = "The National Park this postcode falls within, if any.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "nhs_ha",
            ["req"] = true,
            ["short"] = "The NHS health authority area for this postcode.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "nhs_region",
            ["short"] = "The NHS England Region for this postcode.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "northings",
            ["req"] = true,
            ["short"] = "The OS grid reference northing (Y-coordinate) to 1 metre resolution.",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "nuts",
            ["req"] = true,
            ["short"] = "Statistical geography code for international comparisons (formerly NUTS - Nomenclature of Units for Territorial Statistics).",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "oa21",
            ["short"] = "2021 Census Output Area code - the smallest census geography.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "outcode",
            ["req"] = true,
            ["short"] = "The first part of a postcode before the space (2-4 characters).",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "parish",
            ["req"] = true,
            ["short"] = "The civil parish (England) or community (Wales) for this postcode.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "parliamentary_constituency",
            ["req"] = true,
            ["short"] = "The UK Parliamentary constituency for this postcode.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "parliamentary_constituency_2024",
            ["short"] = "The UK Parliamentary constituency for this postcode based on July 2024 boundaries.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "pfa",
            ["short"] = "The police force area for this postcode.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "postcode",
            ["req"] = true,
            ["short"] = "UK postcode format: 2-4 character outward code, a space, and a 3-character inward code (e.g., SW1A 2AA).",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "primary_care_trust",
            ["req"] = true,
            ["short"] = "The healthcare administrative area for this postcode.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "quality",
            ["req"] = true,
            ["short"] = "Positional Quality Indicator (1-9).",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "region",
            ["req"] = true,
            ["short"] = "The regional designation for this postcode (formerly Government Office Regions or GORs).",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "result",
            ["req"] = true,
            ["short"] = "Array containing detailed location information for the requested postcode or nearest postcodes",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "ruc11",
            ["short"] = "The 2011 Census Rural-Urban Classification for this postcode.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "ruc21",
            ["short"] = "The 2021 Census Rural-Urban Classification for this postcode.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "status",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "ttwa",
            ["short"] = "The Travel to Work Area for this postcode.",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "postcode",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/postcodes",
                ["parts"] = {
                  "postcodes",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.result`",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "postcode",
                      ["kind"] = "query",
                      ["name"] = "filter",
                      ["orig"] = "filter",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 51.50354,
                      ["kind"] = "query",
                      ["name"] = "latitude",
                      ["orig"] = "latitude",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["example"] = 3,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = -0.127695,
                      ["kind"] = "query",
                      ["name"] = "longitude",
                      ["orig"] = "longitude",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["example"] = "SW1A 2AA",
                      ["kind"] = "query",
                      ["name"] = "query",
                      ["orig"] = "query",
                      ["type"] = "`$ANY`",
                    },
                    {
                      ["example"] = 500,
                      ["kind"] = "query",
                      ["name"] = "radius",
                      ["orig"] = "radius",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "true",
                      ["kind"] = "query",
                      ["name"] = "widesearch",
                      ["orig"] = "widesearch",
                      ["type"] = "`$BOOLEAN`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/postcodes",
                ["parts"] = {
                  "postcodes",
                },
                ["select"] = {
                  ["exist"] = {
                    "filter",
                    "latitude",
                    "limit",
                    "longitude",
                    "query",
                    "radius",
                    "widesearch",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.result`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "SW1A 2AA",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "postcode",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/postcodes/{postcode}",
                ["parts"] = {
                  "postcodes",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["postcode"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.result`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "SW1A",
                      ["kind"] = "query",
                      ["name"] = "outcode",
                      ["orig"] = "outcode",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/random/postcodes",
                ["parts"] = {
                  "random",
                  "postcodes",
                },
                ["select"] = {
                  ["exist"] = {
                    "outcode",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.result`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["scottish_postcode"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "result",
            ["req"] = true,
            ["short"] = "Data for a given postcode",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "status",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "scottish_postcode",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "postcode",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/scotland/postcodes/{postcode}",
                ["parts"] = {
                  "scotland",
                  "postcodes",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["postcode"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["terminated_postcode"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "result",
            ["req"] = true,
            ["short"] = "Data for a given postcode",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "status",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "terminated_postcode",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "postcode",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/terminated_postcodes/{postcode}",
                ["parts"] = {
                  "terminated_postcodes",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["postcode"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
