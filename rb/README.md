# Postcodesio Ruby SDK



The Ruby SDK for the Postcodesio API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Nearest` — with named operations (`list`/`load`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/postcodesio-sdk/releases](https://github.com/voxgig-sdk/postcodesio-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Postcodesio_sdk"

client = PostcodesioSDK.new
```

### 2. List nearest records

```ruby
begin
  # list returns an Array of Nearest records — iterate directly.
  nearests = client.Nearest.list
  nearests.each do |item|
    puts "#{item["result"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  nearests = client.Nearest.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = PostcodesioSDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
nearest = client.Nearest.list()
puts nearest
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = PostcodesioSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### PostcodesioSDK

```ruby
require_relative "Postcodesio_sdk"
client = PostcodesioSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = PostcodesioSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### PostcodesioSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `PostcodesioError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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
| `result` | Data for a given postcode |
| `status` |  |

Operations: Load.

API path: `/scotland/postcodes/{postcode}`

#### TerminatedPostcode

| Field | Description |
| --- | --- |
| `result` | Data for a given postcode |
| `status` |  |

Operations: Load.

API path: `/terminated_postcodes/{postcode}`



## Entities


### Nearest

Create an instance: `nearest = client.Nearest`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | `Array` | Array of nearest postcodes sorted by distance |
| `status` | `Integer` |  |

#### Example: List

```ruby
# list returns an Array of Nearest records (raises on error).
nearests = client.Nearest.list
```


### Outcode

Create an instance: `outcode = client.Outcode`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Outcode record (raises on error).
outcode = client.Outcode.load({ "id" => "outcode_id" })
```


### Place

Create an instance: `place = client.Place`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `String` | Unique identifier for the place record (persistent except for Section of Named/Numbered Roads) |
| `country` | `String` | Country within Great Britain (England, Scotland, or Wales) |
| `county_unitary` | `String` | County, Unitary Authority or Greater London Authority that contains this place |
| `county_unitary_type` | `String` | Type of administrative unit (e.g., County, UnitaryAuthority) |
| `district_borough` | `String` | District, Metropolitan District or London Borough containing this place |
| `district_borough_type` | `String` | Type of district/borough administrative unit |
| `eastings` | `Integer` | Ordnance Survey grid reference Easting (1m resolution, not available for Channel Islands/Isle of Man) |
| `latitude` | `Float` | WGS84 latitude coordinate |
| `local_type` | `String` | Ordnance Survey classification (City, Town, Village, Hamlet, etc.) |
| `longitude` | `Float` | WGS84 longitude coordinate |
| `max_eastings` | `Integer` | Eastern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `max_northings` | `Integer` | Northern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `min_eastings` | `Integer` | Western edge of the place's bounding box (Minimum Bounding Rectangle) |
| `min_northings` | `Integer` | Southern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `name_1` | `String` | Official name of the place (preserves original format, e.g., "The Pennines" not "Pennines, The") |
| `name_1_lang` | `String` | Language code for name_1 (cym=Welsh, eng=English, gla=Scottish Gaelic) |
| `name_2` | `String` | Alternative name in a different language |
| `name_2_lang` | `String` | Language code for name_2 (cym=Welsh, eng=English, gla=Scottish Gaelic) |
| `northings` | `Integer` | Ordnance Survey grid reference Northing (1m resolution, not available for Channel Islands/Isle of Man) |
| `outcode` | `String` | Postcode district (first part of the postcode) |
| `region` | `String` | European Region (formerly Government Office Region) containing this place |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Place record (raises on error).
place = client.Place.load({ "id" => "place_id" })
```

#### Example: List

```ruby
# list returns an Array of Place records (raises on error).
places = client.Place.list
```


### Postcode

Create an instance: `postcode = client.Postcode`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin_county` | `String` | The administrative county for this postcode. |
| `admin_district` | `String` | The administrative district or unitary authority for this postcode. |
| `admin_ward` | `String` | The electoral/administrative ward for this postcode. |
| `bua` | `String` | The Built-up Area (2022) for this postcode. |
| `cancer_alliance` | `String` | The Cancer Alliance for this postcode. |
| `ccg` | `String` | NHS Clinical Commissioning Group responsible for planning healthcare services in England. |
| `ced` | `String` | The county electoral division for English postcodes. |
| `codes` | `Hash` | Contains the GSS (Government Statistical Service) codes for administrative areas. |
| `country` | `String` | The UK constituent country for this postcode (England, Scotland, Wales, Northern Ireland, Channel Islands, or Isle of Man). |
| `date_of_introduction` | `String` | The date the postcode was introduced in YYYYMM format. |
| `eastings` | `Integer` | The OS grid reference easting (X-coordinate) to 1 metre resolution. |
| `european_electoral_region` | `String` | The European Electoral Region for this postcode. |
| `icb` | `String` | The NHS Integrated Care Board responsible for healthcare planning in this area. |
| `incode` | `String` | The second part of a postcode after the space (always 3 characters). |
| `latitude` | `Float` | WGS84 latitude coordinate (north-south position). |
| `lep1` | `String` | The primary Local Enterprise Partnership for this postcode. |
| `lep2` | `String` | The secondary Local Enterprise Partnership for this postcode, if it falls within overlapping LEP areas. |
| `longitude` | `Float` | WGS84 longitude coordinate (east-west position). |
| `lsoa` | `String` | 2021 Census LSOA code (smaller statistical area, typically 1,000-1,500 residents). |
| `lsoa11` | `String` | 2011 Census LSOA code. |
| `lsoa21` | `String` | 2021 Census LSOA code. |
| `msoa` | `String` | 2021 Census MSOA code (mid-size statistical area, typically 5,000-7,000 residents). |
| `msoa11` | `String` | 2011 Census MSOA code. |
| `msoa21` | `String` | 2021 Census MSOA code. |
| `national_park` | `String` | The National Park this postcode falls within, if any. |
| `nhs_ha` | `String` | The NHS health authority area for this postcode. |
| `nhs_region` | `String` | The NHS England Region for this postcode. |
| `northings` | `Integer` | The OS grid reference northing (Y-coordinate) to 1 metre resolution. |
| `nuts` | `String` | Statistical geography code for international comparisons (formerly NUTS - Nomenclature of Units for Territorial Statistics). |
| `oa21` | `String` | 2021 Census Output Area code - the smallest census geography. |
| `outcode` | `String` | The first part of a postcode before the space (2-4 characters). |
| `parish` | `String` | The civil parish (England) or community (Wales) for this postcode. |
| `parliamentary_constituency` | `String` | The UK Parliamentary constituency for this postcode. |
| `parliamentary_constituency_2024` | `String` | The UK Parliamentary constituency for this postcode based on July 2024 boundaries. |
| `pfa` | `String` | The police force area for this postcode. |
| `postcode` | `String` | UK postcode format: 2-4 character outward code, a space, and a 3-character inward code (e.g., SW1A 2AA). |
| `primary_care_trust` | `String` | The healthcare administrative area for this postcode. |
| `quality` | `Integer` | Positional Quality Indicator (1-9). |
| `region` | `String` | The regional designation for this postcode (formerly Government Office Regions or GORs). |
| `result` | `Array` | Array containing detailed location information for the requested postcode or nearest postcodes |
| `ruc11` | `String` | The 2011 Census Rural-Urban Classification for this postcode. |
| `ruc21` | `String` | The 2021 Census Rural-Urban Classification for this postcode. |
| `status` | `Integer` |  |
| `ttwa` | `String` | The Travel to Work Area for this postcode. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Postcode record (raises on error).
postcode = client.Postcode.load({ "id" => "postcode_id" })
```

#### Example: List

```ruby
# list returns an Array of Postcode records (raises on error).
postcodes = client.Postcode.list
```

#### Example: Create

```ruby
postcode = client.Postcode.create({
  "admin_county" => "example_admin_county", # String
  "admin_district" => "example_admin_district", # String
  "admin_ward" => "example_admin_ward", # String
  "ccg" => "example_ccg", # String
  "ced" => "example_ced", # String
  "codes" => {}, # Hash
  "country" => "example_country", # String
  "eastings" => 1, # Integer
  "european_electoral_region" => "example_european_electoral_region", # String
  "incode" => "example_incode", # String
  "latitude" => 1, # Float
  "longitude" => 1, # Float
  "lsoa" => "example_lsoa", # String
  "msoa" => "example_msoa", # String
  "nhs_ha" => "example_nhs_ha", # String
  "northings" => 1, # Integer
  "nuts" => "example_nuts", # String
  "outcode" => "example_outcode", # String
  "parish" => "example_parish", # String
  "parliamentary_constituency" => "example_parliamentary_constituency", # String
  "postcode" => "example_postcode", # String
  "primary_care_trust" => "example_primary_care_trust", # String
  "quality" => 1, # Integer
  "region" => "example_region", # String
  "result" => [], # Array
  "status" => 1, # Integer
})
```


### ScottishPostcode

Create an instance: `scottish_postcode = client.ScottishPostcode`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | `Array` | Data for a given postcode |
| `status` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ScottishPostcode record (raises on error).
scottish_postcode = client.ScottishPostcode.load({ "id" => "scottish_postcode_id" })
```


### TerminatedPostcode

Create an instance: `terminated_postcode = client.TerminatedPostcode`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | `Array` | Data for a given postcode |
| `status` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the TerminatedPostcode record (raises on error).
terminated_postcode = client.TerminatedPostcode.load({ "id" => "terminated_postcode_id" })
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Postcodesio_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Postcodesio_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
nearest = client.Nearest
nearest.list()

# nearest.data_get now returns the nearest data from the last list
# nearest.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
