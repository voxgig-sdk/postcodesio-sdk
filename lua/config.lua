-- Postcodesio SDK configuration

local function make_config()
  return {
    main = {
      name = "Postcodesio",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["active"] = true,
            ["name"] = "result",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "status",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 1,
          },
        },
        ["name"] = "nearest",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["example"] = "SW1A 2AA",
                      ["kind"] = "param",
                      ["name"] = "postcode_id",
                      ["orig"] = "postcode",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
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
                ["index$"] = 0,
              },
            },
            ["key$"] = "list",
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
        ["fields"] = {},
        ["name"] = "outcode",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["example"] = "SW1A",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "outcode",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
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
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["place"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "code",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "country",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "county_unitary",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "county_unitary_type",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "district_borough",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "district_borough_type",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "eastings",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 6,
          },
          {
            ["active"] = true,
            ["name"] = "latitude",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
            ["index$"] = 7,
          },
          {
            ["active"] = true,
            ["name"] = "local_type",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 8,
          },
          {
            ["active"] = true,
            ["name"] = "longitude",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
            ["index$"] = 9,
          },
          {
            ["active"] = true,
            ["name"] = "max_eastings",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 10,
          },
          {
            ["active"] = true,
            ["name"] = "max_northings",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 11,
          },
          {
            ["active"] = true,
            ["name"] = "min_eastings",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 12,
          },
          {
            ["active"] = true,
            ["name"] = "min_northings",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 13,
          },
          {
            ["active"] = true,
            ["name"] = "name_1",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 14,
          },
          {
            ["active"] = true,
            ["name"] = "name_1_lang",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 15,
          },
          {
            ["active"] = true,
            ["name"] = "name_2",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 16,
          },
          {
            ["active"] = true,
            ["name"] = "name_2_lang",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 17,
          },
          {
            ["active"] = true,
            ["name"] = "northings",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 18,
          },
          {
            ["active"] = true,
            ["name"] = "outcode",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 19,
          },
          {
            ["active"] = true,
            ["name"] = "region",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 20,
          },
        },
        ["name"] = "place",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
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
                ["index$"] = 0,
              },
            },
            ["key$"] = "list",
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "code",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
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
                ["index$"] = 0,
              },
              {
                ["active"] = true,
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
                ["index$"] = 1,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["postcode"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "admin_county",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "admin_district",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "admin_ward",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "bua",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "cancer_alliance",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "ccg",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "ced",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 6,
          },
          {
            ["active"] = true,
            ["name"] = "codes",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
            ["index$"] = 7,
          },
          {
            ["active"] = true,
            ["name"] = "country",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 8,
          },
          {
            ["active"] = true,
            ["name"] = "date_of_introduction",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 9,
          },
          {
            ["active"] = true,
            ["name"] = "eastings",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 10,
          },
          {
            ["active"] = true,
            ["name"] = "european_electoral_region",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 11,
          },
          {
            ["active"] = true,
            ["name"] = "icb",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 12,
          },
          {
            ["active"] = true,
            ["name"] = "incode",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 13,
          },
          {
            ["active"] = true,
            ["name"] = "latitude",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
            ["index$"] = 14,
          },
          {
            ["active"] = true,
            ["name"] = "lep1",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 15,
          },
          {
            ["active"] = true,
            ["name"] = "lep2",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 16,
          },
          {
            ["active"] = true,
            ["name"] = "longitude",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
            ["index$"] = 17,
          },
          {
            ["active"] = true,
            ["name"] = "lsoa",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 18,
          },
          {
            ["active"] = true,
            ["name"] = "lsoa11",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 19,
          },
          {
            ["active"] = true,
            ["name"] = "lsoa21",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 20,
          },
          {
            ["active"] = true,
            ["name"] = "msoa",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 21,
          },
          {
            ["active"] = true,
            ["name"] = "msoa11",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 22,
          },
          {
            ["active"] = true,
            ["name"] = "msoa21",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 23,
          },
          {
            ["active"] = true,
            ["name"] = "national_park",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 24,
          },
          {
            ["active"] = true,
            ["name"] = "nhs_ha",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 25,
          },
          {
            ["active"] = true,
            ["name"] = "nhs_region",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 26,
          },
          {
            ["active"] = true,
            ["name"] = "northings",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 27,
          },
          {
            ["active"] = true,
            ["name"] = "nuts",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 28,
          },
          {
            ["active"] = true,
            ["name"] = "oa21",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 29,
          },
          {
            ["active"] = true,
            ["name"] = "outcode",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 30,
          },
          {
            ["active"] = true,
            ["name"] = "parish",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 31,
          },
          {
            ["active"] = true,
            ["name"] = "parliamentary_constituency",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 32,
          },
          {
            ["active"] = true,
            ["name"] = "parliamentary_constituency_2024",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 33,
          },
          {
            ["active"] = true,
            ["name"] = "pfa",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 34,
          },
          {
            ["active"] = true,
            ["name"] = "postcode",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 35,
          },
          {
            ["active"] = true,
            ["name"] = "primary_care_trust",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 36,
          },
          {
            ["active"] = true,
            ["name"] = "quality",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 37,
          },
          {
            ["active"] = true,
            ["name"] = "region",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 38,
          },
          {
            ["active"] = true,
            ["name"] = "result",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["index$"] = 39,
          },
          {
            ["active"] = true,
            ["name"] = "ruc11",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 40,
          },
          {
            ["active"] = true,
            ["name"] = "ruc21",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 41,
          },
          {
            ["active"] = true,
            ["name"] = "status",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 42,
          },
          {
            ["active"] = true,
            ["name"] = "ttwa",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 43,
          },
        },
        ["name"] = "postcode",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["active"] = true,
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
                ["index$"] = 0,
              },
            },
            ["key$"] = "create",
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["example"] = "postcode",
                      ["kind"] = "query",
                      ["name"] = "filter",
                      ["orig"] = "filter",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = 51.50354,
                      ["kind"] = "query",
                      ["name"] = "latitude",
                      ["orig"] = "latitude",
                      ["reqd"] = false,
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = 3,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["reqd"] = false,
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = -0.127695,
                      ["kind"] = "query",
                      ["name"] = "longitude",
                      ["orig"] = "longitude",
                      ["reqd"] = false,
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = "SW1A 2AA",
                      ["kind"] = "query",
                      ["name"] = "query",
                      ["orig"] = "query",
                      ["reqd"] = false,
                      ["type"] = "`$ANY`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = 500,
                      ["kind"] = "query",
                      ["name"] = "radius",
                      ["orig"] = "radius",
                      ["reqd"] = false,
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = "true",
                      ["kind"] = "query",
                      ["name"] = "widesearch",
                      ["orig"] = "widesearch",
                      ["reqd"] = false,
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
                ["index$"] = 0,
              },
            },
            ["key$"] = "list",
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["example"] = "SW1A 2AA",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "postcode",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
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
                ["index$"] = 0,
              },
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["example"] = "SW1A",
                      ["kind"] = "query",
                      ["name"] = "outcode",
                      ["orig"] = "outcode",
                      ["reqd"] = false,
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
                ["index$"] = 1,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["scottish_postcode"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "result",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "status",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 1,
          },
        },
        ["name"] = "scottish_postcode",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "postcode",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
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
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["terminated_postcode"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "result",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "status",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 1,
          },
        },
        ["name"] = "terminated_postcode",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "postcode",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
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
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
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
