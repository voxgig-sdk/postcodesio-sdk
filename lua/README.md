# Postcodesio Lua SDK



The Lua SDK for the Postcodesio API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Nearest()` — each with the same small set of operations (`list`, `load`, `create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/postcodesio-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("postcodesio_sdk")

local client = sdk.new()
```

### 2. List nearest records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local nearests, err = client:Nearest():list()
if err then error(err) end

for _, item in ipairs(nearests) do
  print(item["result"])
end
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local nearests, err = client:Nearest():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Nearest():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
POSTCODESIO_TEST_LIVE=TRUE
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### PostcodesioSDK

```lua
local sdk = require("postcodesio_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### PostcodesioSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Nearest` | `(data) -> NearestEntity` | Create a Nearest entity instance. |
| `Outcode` | `(data) -> OutcodeEntity` | Create an Outcode entity instance. |
| `Place` | `(data) -> PlaceEntity` | Create a Place entity instance. |
| `Postcode` | `(data) -> PostcodeEntity` | Create a Postcode entity instance. |
| `ScottishPostcode` | `(data) -> ScottishPostcodeEntity` | Create a ScottishPostcode entity instance. |
| `TerminatedPostcode` | `(data) -> TerminatedPostcodeEntity` | Create a TerminatedPostcode entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local outcode, err = client:Outcode():load({ id = "example_id" })
    if err then error(err) end
    -- outcode is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Nearest

| Field | Description |
| --- | --- |
| `result` | Array of nearest postcodes sorted by distance |
| `status` |  |

Operations: List.

API path: `/postcodes/{postcode}/nearest`

#### Outcode

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load.

API path: `/outcodes/{outcode}`

#### Place

| Field | Description |
| --- | --- |
| `code` | Unique identifier for the place record (persistent except for Section of Named/Numbered Roads) |
| `country` | Country within Great Britain (England, Scotland, or Wales) |
| `county_unitary` | County, Unitary Authority or Greater London Authority that contains this place |
| `county_unitary_type` | Type of administrative unit (e.g., County, UnitaryAuthority) |
| `district_borough` | District, Metropolitan District or London Borough containing this place |
| `district_borough_type` | Type of district/borough administrative unit |
| `eastings` | Ordnance Survey grid reference Easting (1m resolution, not available for Channel Islands/Isle of Man) |
| `id` |  |
| `latitude` | WGS84 latitude coordinate |
| `local_type` | Ordnance Survey classification (City, Town, Village, Hamlet, etc.) |
| `longitude` | WGS84 longitude coordinate |
| `max_eastings` | Eastern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `max_northings` | Northern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `min_eastings` | Western edge of the place's bounding box (Minimum Bounding Rectangle) |
| `min_northings` | Southern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `name_1` | Official name of the place (preserves original format, e.g., "The Pennines" not "Pennines, The") |
| `name_1_lang` | Language code for name_1 (cym=Welsh, eng=English, gla=Scottish Gaelic) |
| `name_2` | Alternative name in a different language |
| `name_2_lang` | Language code for name_2 (cym=Welsh, eng=English, gla=Scottish Gaelic) |
| `northings` | Ordnance Survey grid reference Northing (1m resolution, not available for Channel Islands/Isle of Man) |
| `outcode` | Postcode district (first part of the postcode) |
| `region` | European Region (formerly Government Office Region) containing this place |

Operations: List, Load.

API path: `/places`

#### Postcode

| Field | Description |
| --- | --- |
| `admin_county` | The administrative county for this postcode. |
| `admin_district` | The administrative district or unitary authority for this postcode. |
| `admin_ward` | The electoral/administrative ward for this postcode. |
| `bua` | The Built-up Area (2022) for this postcode. |
| `cancer_alliance` | The Cancer Alliance for this postcode. |
| `ccg` | NHS Clinical Commissioning Group responsible for planning healthcare services in England. |
| `ced` | The county electoral division for English postcodes. |
| `codes` | Contains the GSS (Government Statistical Service) codes for administrative areas. |
| `country` | The UK constituent country for this postcode (England, Scotland, Wales, Northern Ireland, Channel Islands, or Isle of Man). |
| `date_of_introduction` | The date the postcode was introduced in YYYYMM format. |
| `eastings` | The OS grid reference easting (X-coordinate) to 1 metre resolution. |
| `european_electoral_region` | The European Electoral Region for this postcode. |
| `icb` | The NHS Integrated Care Board responsible for healthcare planning in this area. |
| `id` |  |
| `incode` | The second part of a postcode after the space (always 3 characters). |
| `latitude` | WGS84 latitude coordinate (north-south position). |
| `lep1` | The primary Local Enterprise Partnership for this postcode. |
| `lep2` | The secondary Local Enterprise Partnership for this postcode, if it falls within overlapping LEP areas. |
| `longitude` | WGS84 longitude coordinate (east-west position). |
| `lsoa` | 2021 Census LSOA code (smaller statistical area, typically 1,000-1,500 residents). |
| `lsoa11` | 2011 Census LSOA code. |
| `lsoa21` | 2021 Census LSOA code. |
| `msoa` | 2021 Census MSOA code (mid-size statistical area, typically 5,000-7,000 residents). |
| `msoa11` | 2011 Census MSOA code. |
| `msoa21` | 2021 Census MSOA code. |
| `national_park` | The National Park this postcode falls within, if any. |
| `nhs_ha` | The NHS health authority area for this postcode. |
| `nhs_region` | The NHS England Region for this postcode. |
| `northings` | The OS grid reference northing (Y-coordinate) to 1 metre resolution. |
| `nuts` | Statistical geography code for international comparisons (formerly NUTS - Nomenclature of Units for Territorial Statistics). |
| `oa21` | 2021 Census Output Area code - the smallest census geography. |
| `outcode` | The first part of a postcode before the space (2-4 characters). |
| `parish` | The civil parish (England) or community (Wales) for this postcode. |
| `parliamentary_constituency` | The UK Parliamentary constituency for this postcode. |
| `parliamentary_constituency_2024` | The UK Parliamentary constituency for this postcode based on July 2024 boundaries. |
| `pfa` | The police force area for this postcode. |
| `postcode` | UK postcode format: 2-4 character outward code, a space, and a 3-character inward code (e.g., SW1A 2AA). |
| `primary_care_trust` | The healthcare administrative area for this postcode. |
| `quality` | Positional Quality Indicator (1-9). |
| `region` | The regional designation for this postcode (formerly Government Office Regions or GORs). |
| `result` | Array containing detailed location information for the requested postcode or nearest postcodes |
| `ruc11` | The 2011 Census Rural-Urban Classification for this postcode. |
| `ruc21` | The 2021 Census Rural-Urban Classification for this postcode. |
| `status` |  |
| `ttwa` | The Travel to Work Area for this postcode. |

Operations: Create, List, Load.

API path: `/postcodes`

#### ScottishPostcode

| Field | Description |
| --- | --- |
| `id` |  |
| `result` | Data for a given postcode |
| `status` |  |

Operations: Load.

API path: `/scotland/postcodes/{postcode}`

#### TerminatedPostcode

| Field | Description |
| --- | --- |
| `id` |  |
| `result` | Data for a given postcode |
| `status` |  |

Operations: Load.

API path: `/terminated_postcodes/{postcode}`



## Entities


### Nearest

Create an instance: `local nearest = client:Nearest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | `table` | Array of nearest postcodes sorted by distance |
| `status` | `number` |  |

#### Example: List

```lua
local nearests, err = client:Nearest():list()
```


### Outcode

Create an instance: `local outcode = client:Outcode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local outcode, err = client:Outcode():load({ id = "outcode_id" })
```


### Place

Create an instance: `local place = client:Place(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` | Unique identifier for the place record (persistent except for Section of Named/Numbered Roads) |
| `country` | `string` | Country within Great Britain (England, Scotland, or Wales) |
| `county_unitary` | `string` | County, Unitary Authority or Greater London Authority that contains this place |
| `county_unitary_type` | `string` | Type of administrative unit (e.g., County, UnitaryAuthority) |
| `district_borough` | `string` | District, Metropolitan District or London Borough containing this place |
| `district_borough_type` | `string` | Type of district/borough administrative unit |
| `eastings` | `number` | Ordnance Survey grid reference Easting (1m resolution, not available for Channel Islands/Isle of Man) |
| `id` | `string` |  |
| `latitude` | `number` | WGS84 latitude coordinate |
| `local_type` | `string` | Ordnance Survey classification (City, Town, Village, Hamlet, etc.) |
| `longitude` | `number` | WGS84 longitude coordinate |
| `max_eastings` | `number` | Eastern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `max_northings` | `number` | Northern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `min_eastings` | `number` | Western edge of the place's bounding box (Minimum Bounding Rectangle) |
| `min_northings` | `number` | Southern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `name_1` | `string` | Official name of the place (preserves original format, e.g., "The Pennines" not "Pennines, The") |
| `name_1_lang` | `string` | Language code for name_1 (cym=Welsh, eng=English, gla=Scottish Gaelic) |
| `name_2` | `string` | Alternative name in a different language |
| `name_2_lang` | `string` | Language code for name_2 (cym=Welsh, eng=English, gla=Scottish Gaelic) |
| `northings` | `number` | Ordnance Survey grid reference Northing (1m resolution, not available for Channel Islands/Isle of Man) |
| `outcode` | `string` | Postcode district (first part of the postcode) |
| `region` | `string` | European Region (formerly Government Office Region) containing this place |

#### Example: Load

```lua
local place, err = client:Place():load({ id = "place_id" })
```

#### Example: List

```lua
local places, err = client:Place():list()
```


### Postcode

Create an instance: `local postcode = client:Postcode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin_county` | `string` | The administrative county for this postcode. |
| `admin_district` | `string` | The administrative district or unitary authority for this postcode. |
| `admin_ward` | `string` | The electoral/administrative ward for this postcode. |
| `bua` | `string` | The Built-up Area (2022) for this postcode. |
| `cancer_alliance` | `string` | The Cancer Alliance for this postcode. |
| `ccg` | `string` | NHS Clinical Commissioning Group responsible for planning healthcare services in England. |
| `ced` | `string` | The county electoral division for English postcodes. |
| `codes` | `table` | Contains the GSS (Government Statistical Service) codes for administrative areas. |
| `country` | `string` | The UK constituent country for this postcode (England, Scotland, Wales, Northern Ireland, Channel Islands, or Isle of Man). |
| `date_of_introduction` | `string` | The date the postcode was introduced in YYYYMM format. |
| `eastings` | `number` | The OS grid reference easting (X-coordinate) to 1 metre resolution. |
| `european_electoral_region` | `string` | The European Electoral Region for this postcode. |
| `icb` | `string` | The NHS Integrated Care Board responsible for healthcare planning in this area. |
| `id` | `string` |  |
| `incode` | `string` | The second part of a postcode after the space (always 3 characters). |
| `latitude` | `number` | WGS84 latitude coordinate (north-south position). |
| `lep1` | `string` | The primary Local Enterprise Partnership for this postcode. |
| `lep2` | `string` | The secondary Local Enterprise Partnership for this postcode, if it falls within overlapping LEP areas. |
| `longitude` | `number` | WGS84 longitude coordinate (east-west position). |
| `lsoa` | `string` | 2021 Census LSOA code (smaller statistical area, typically 1,000-1,500 residents). |
| `lsoa11` | `string` | 2011 Census LSOA code. |
| `lsoa21` | `string` | 2021 Census LSOA code. |
| `msoa` | `string` | 2021 Census MSOA code (mid-size statistical area, typically 5,000-7,000 residents). |
| `msoa11` | `string` | 2011 Census MSOA code. |
| `msoa21` | `string` | 2021 Census MSOA code. |
| `national_park` | `string` | The National Park this postcode falls within, if any. |
| `nhs_ha` | `string` | The NHS health authority area for this postcode. |
| `nhs_region` | `string` | The NHS England Region for this postcode. |
| `northings` | `number` | The OS grid reference northing (Y-coordinate) to 1 metre resolution. |
| `nuts` | `string` | Statistical geography code for international comparisons (formerly NUTS - Nomenclature of Units for Territorial Statistics). |
| `oa21` | `string` | 2021 Census Output Area code - the smallest census geography. |
| `outcode` | `string` | The first part of a postcode before the space (2-4 characters). |
| `parish` | `string` | The civil parish (England) or community (Wales) for this postcode. |
| `parliamentary_constituency` | `string` | The UK Parliamentary constituency for this postcode. |
| `parliamentary_constituency_2024` | `string` | The UK Parliamentary constituency for this postcode based on July 2024 boundaries. |
| `pfa` | `string` | The police force area for this postcode. |
| `postcode` | `string` | UK postcode format: 2-4 character outward code, a space, and a 3-character inward code (e.g., SW1A 2AA). |
| `primary_care_trust` | `string` | The healthcare administrative area for this postcode. |
| `quality` | `number` | Positional Quality Indicator (1-9). |
| `region` | `string` | The regional designation for this postcode (formerly Government Office Regions or GORs). |
| `result` | `table` | Array containing detailed location information for the requested postcode or nearest postcodes |
| `ruc11` | `string` | The 2011 Census Rural-Urban Classification for this postcode. |
| `ruc21` | `string` | The 2021 Census Rural-Urban Classification for this postcode. |
| `status` | `number` |  |
| `ttwa` | `string` | The Travel to Work Area for this postcode. |

#### Example: Load

```lua
local postcode, err = client:Postcode():load({ id = "postcode_id" })
```

#### Example: List

```lua
local postcodes, err = client:Postcode():list()
```

#### Example: Create

```lua
local postcode, err = client:Postcode():create({
  admin_county = "example_admin_county", -- string
  admin_district = "example_admin_district", -- string
  admin_ward = "example_admin_ward", -- string
  ccg = "example_ccg", -- string
  ced = "example_ced", -- string
  codes = {}, -- table
  country = "example_country", -- string
  eastings = 1, -- number
  european_electoral_region = "example_european_electoral_region", -- string
  incode = "example_incode", -- string
  latitude = 1, -- number
  longitude = 1, -- number
  lsoa = "example_lsoa", -- string
  msoa = "example_msoa", -- string
  nhs_ha = "example_nhs_ha", -- string
  northings = 1, -- number
  nuts = "example_nuts", -- string
  outcode = "example_outcode", -- string
  parish = "example_parish", -- string
  parliamentary_constituency = "example_parliamentary_constituency", -- string
  postcode = "example_postcode", -- string
  primary_care_trust = "example_primary_care_trust", -- string
  quality = 1, -- number
  region = "example_region", -- string
  result = {}, -- table
  status = 1, -- number
})
```


### ScottishPostcode

Create an instance: `local scottish_postcode = client:ScottishPostcode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `result` | `table` | Data for a given postcode |
| `status` | `number` |  |

#### Example: Load

```lua
local scottish_postcode, err = client:ScottishPostcode():load({ id = "scottish_postcode_id" })
```


### TerminatedPostcode

Create an instance: `local terminated_postcode = client:TerminatedPostcode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `result` | `table` | Data for a given postcode |
| `status` | `number` |  |

#### Example: Load

```lua
local terminated_postcode, err = client:TerminatedPostcode():load({ id = "terminated_postcode_id" })
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── postcodesio_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`postcodesio_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local nearest = client:Nearest()
nearest:list()

-- nearest:data_get() now returns the nearest data from the last list
-- nearest:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
