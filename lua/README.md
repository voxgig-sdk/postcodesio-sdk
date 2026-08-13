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
| `result` |  |
| `status` |  |

Operations: List.

API path: `/postcodes/{postcode}/nearest`

#### Outcode

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/outcodes/{outcode}`

#### Place

| Field | Description |
| --- | --- |
| `code` |  |
| `country` |  |
| `county_unitary` |  |
| `county_unitary_type` |  |
| `district_borough` |  |
| `district_borough_type` |  |
| `eastings` |  |
| `latitude` |  |
| `local_type` |  |
| `longitude` |  |
| `max_eastings` |  |
| `max_northings` |  |
| `min_eastings` |  |
| `min_northings` |  |
| `name_1` |  |
| `name_1_lang` |  |
| `name_2` |  |
| `name_2_lang` |  |
| `northings` |  |
| `outcode` |  |
| `region` |  |

Operations: List, Load.

API path: `/places`

#### Postcode

| Field | Description |
| --- | --- |
| `admin_county` |  |
| `admin_district` |  |
| `admin_ward` |  |
| `bua` |  |
| `cancer_alliance` |  |
| `ccg` |  |
| `ced` |  |
| `codes` |  |
| `country` |  |
| `date_of_introduction` |  |
| `eastings` |  |
| `european_electoral_region` |  |
| `icb` |  |
| `incode` |  |
| `latitude` |  |
| `lep1` |  |
| `lep2` |  |
| `longitude` |  |
| `lsoa` |  |
| `lsoa11` |  |
| `lsoa21` |  |
| `msoa` |  |
| `msoa11` |  |
| `msoa21` |  |
| `national_park` |  |
| `nhs_ha` |  |
| `nhs_region` |  |
| `northings` |  |
| `nuts` |  |
| `oa21` |  |
| `outcode` |  |
| `parish` |  |
| `parliamentary_constituency` |  |
| `parliamentary_constituency_2024` |  |
| `pfa` |  |
| `postcode` |  |
| `primary_care_trust` |  |
| `quality` |  |
| `region` |  |
| `result` |  |
| `ruc11` |  |
| `ruc21` |  |
| `status` |  |
| `ttwa` |  |

Operations: Create, List, Load.

API path: `/postcodes`

#### ScottishPostcode

| Field | Description |
| --- | --- |
| `result` |  |
| `status` |  |

Operations: Load.

API path: `/scotland/postcodes/{postcode}`

#### TerminatedPostcode

| Field | Description |
| --- | --- |
| `result` |  |
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
| `result` | `table` |  |
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
| `code` | `string` |  |
| `country` | `string` |  |
| `county_unitary` | `string` |  |
| `county_unitary_type` | `string` |  |
| `district_borough` | `string` |  |
| `district_borough_type` | `string` |  |
| `eastings` | `number` |  |
| `latitude` | `number` |  |
| `local_type` | `string` |  |
| `longitude` | `number` |  |
| `max_eastings` | `number` |  |
| `max_northings` | `number` |  |
| `min_eastings` | `number` |  |
| `min_northings` | `number` |  |
| `name_1` | `string` |  |
| `name_1_lang` | `string` |  |
| `name_2` | `string` |  |
| `name_2_lang` | `string` |  |
| `northings` | `number` |  |
| `outcode` | `string` |  |
| `region` | `string` |  |

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
| `admin_county` | `string` |  |
| `admin_district` | `string` |  |
| `admin_ward` | `string` |  |
| `bua` | `string` |  |
| `cancer_alliance` | `string` |  |
| `ccg` | `string` |  |
| `ced` | `string` |  |
| `codes` | `table` |  |
| `country` | `string` |  |
| `date_of_introduction` | `string` |  |
| `eastings` | `number` |  |
| `european_electoral_region` | `string` |  |
| `icb` | `string` |  |
| `incode` | `string` |  |
| `latitude` | `number` |  |
| `lep1` | `string` |  |
| `lep2` | `string` |  |
| `longitude` | `number` |  |
| `lsoa` | `string` |  |
| `lsoa11` | `string` |  |
| `lsoa21` | `string` |  |
| `msoa` | `string` |  |
| `msoa11` | `string` |  |
| `msoa21` | `string` |  |
| `national_park` | `string` |  |
| `nhs_ha` | `string` |  |
| `nhs_region` | `string` |  |
| `northings` | `number` |  |
| `nuts` | `string` |  |
| `oa21` | `string` |  |
| `outcode` | `string` |  |
| `parish` | `string` |  |
| `parliamentary_constituency` | `string` |  |
| `parliamentary_constituency_2024` | `string` |  |
| `pfa` | `string` |  |
| `postcode` | `string` |  |
| `primary_care_trust` | `string` |  |
| `quality` | `number` |  |
| `region` | `string` |  |
| `result` | `table` |  |
| `ruc11` | `string` |  |
| `ruc21` | `string` |  |
| `status` | `number` |  |
| `ttwa` | `string` |  |

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
| `result` | `table` |  |
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
| `result` | `table` |  |
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
