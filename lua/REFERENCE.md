# Postcodesio Lua SDK Reference

Complete API reference for the Postcodesio Lua SDK.


## PostcodesioSDK

### Constructor

```lua
local sdk = require("postcodesio_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Nearest(data)`

Create a new `Nearest` entity instance. Pass `nil` for no initial data.

#### `Outcode(data)`

Create a new `Outcode` entity instance. Pass `nil` for no initial data.

#### `Place(data)`

Create a new `Place` entity instance. Pass `nil` for no initial data.

#### `Postcode(data)`

Create a new `Postcode` entity instance. Pass `nil` for no initial data.

#### `ScottishPostcode(data)`

Create a new `ScottishPostcode` entity instance. Pass `nil` for no initial data.

#### `TerminatedPostcode(data)`

Create a new `TerminatedPostcode` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## NearestEntity

```lua
local nearest = client:Nearest(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | `table` | Yes | Array of nearest postcodes sorted by distance |
| `status` | `number` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Nearest():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NearestEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OutcodeEntity

```lua
local outcode = client:Outcode(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Outcode():load({ id = "outcode_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OutcodeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PlaceEntity

```lua
local place = client:Place(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | Yes | Unique identifier for the place record (persistent except for Section of Named/Numbered Roads) |
| `country` | `string` | Yes | Country within Great Britain (England, Scotland, or Wales) |
| `county_unitary` | `string` | Yes | County, Unitary Authority or Greater London Authority that contains this place |
| `county_unitary_type` | `string` | Yes | Type of administrative unit (e.g., County, UnitaryAuthority) |
| `district_borough` | `string` | Yes | District, Metropolitan District or London Borough containing this place |
| `district_borough_type` | `string` | No | Type of district/borough administrative unit |
| `eastings` | `number` | Yes | Ordnance Survey grid reference Easting (1m resolution, not available for Channel Islands/Isle of Man) |
| `id` | `string` | No |  |
| `latitude` | `number` | Yes | WGS84 latitude coordinate |
| `local_type` | `string` | Yes | Ordnance Survey classification (City, Town, Village, Hamlet, etc.) |
| `longitude` | `number` | Yes | WGS84 longitude coordinate |
| `max_eastings` | `number` | Yes | Eastern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `max_northings` | `number` | Yes | Northern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `min_eastings` | `number` | Yes | Western edge of the place's bounding box (Minimum Bounding Rectangle) |
| `min_northings` | `number` | Yes | Southern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `name_1` | `string` | Yes | Official name of the place (preserves original format, e.g., "The Pennines" not "Pennines, The") |
| `name_1_lang` | `string` | Yes | Language code for name_1 (cym=Welsh, eng=English, gla=Scottish Gaelic) |
| `name_2` | `string` | Yes | Alternative name in a different language |
| `name_2_lang` | `string` | Yes | Language code for name_2 (cym=Welsh, eng=English, gla=Scottish Gaelic) |
| `northings` | `number` | Yes | Ordnance Survey grid reference Northing (1m resolution, not available for Channel Islands/Isle of Man) |
| `outcode` | `string` | Yes | Postcode district (first part of the postcode) |
| `region` | `string` | Yes | European Region (formerly Government Office Region) containing this place |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Place():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Place():load({ id = "place_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlaceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PostcodeEntity

```lua
local postcode = client:Postcode(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin_county` | `string` | Yes | The administrative county for this postcode. |
| `admin_district` | `string` | Yes | The administrative district or unitary authority for this postcode. |
| `admin_ward` | `string` | Yes | The electoral/administrative ward for this postcode. |
| `bua` | `string` | No | The Built-up Area (2022) for this postcode. |
| `cancer_alliance` | `string` | No | The Cancer Alliance for this postcode. |
| `ccg` | `string` | Yes | NHS Clinical Commissioning Group responsible for planning healthcare services in England. |
| `ced` | `string` | Yes | The county electoral division for English postcodes. |
| `codes` | `table` | Yes | Contains the GSS (Government Statistical Service) codes for administrative areas. |
| `country` | `string` | Yes | The UK constituent country for this postcode (England, Scotland, Wales, Northern Ireland, Channel Islands, or Isle of Man). |
| `date_of_introduction` | `string` | No | The date the postcode was introduced in YYYYMM format. |
| `eastings` | `number` | Yes | The OS grid reference easting (X-coordinate) to 1 metre resolution. |
| `european_electoral_region` | `string` | Yes | The European Electoral Region for this postcode. |
| `icb` | `string` | No | The NHS Integrated Care Board responsible for healthcare planning in this area. |
| `id` | `string` | No |  |
| `incode` | `string` | Yes | The second part of a postcode after the space (always 3 characters). |
| `latitude` | `number` | Yes | WGS84 latitude coordinate (north-south position). |
| `lep1` | `string` | No | The primary Local Enterprise Partnership for this postcode. |
| `lep2` | `string` | No | The secondary Local Enterprise Partnership for this postcode, if it falls within overlapping LEP areas. |
| `longitude` | `number` | Yes | WGS84 longitude coordinate (east-west position). |
| `lsoa` | `string` | Yes | 2021 Census LSOA code (smaller statistical area, typically 1,000-1,500 residents). |
| `lsoa11` | `string` | No | 2011 Census LSOA code. |
| `lsoa21` | `string` | No | 2021 Census LSOA code. |
| `msoa` | `string` | Yes | 2021 Census MSOA code (mid-size statistical area, typically 5,000-7,000 residents). |
| `msoa11` | `string` | No | 2011 Census MSOA code. |
| `msoa21` | `string` | No | 2021 Census MSOA code. |
| `national_park` | `string` | No | The National Park this postcode falls within, if any. |
| `nhs_ha` | `string` | Yes | The NHS health authority area for this postcode. |
| `nhs_region` | `string` | No | The NHS England Region for this postcode. |
| `northings` | `number` | Yes | The OS grid reference northing (Y-coordinate) to 1 metre resolution. |
| `nuts` | `string` | Yes | Statistical geography code for international comparisons (formerly NUTS - Nomenclature of Units for Territorial Statistics). |
| `oa21` | `string` | No | 2021 Census Output Area code - the smallest census geography. |
| `outcode` | `string` | Yes | The first part of a postcode before the space (2-4 characters). |
| `parish` | `string` | Yes | The civil parish (England) or community (Wales) for this postcode. |
| `parliamentary_constituency` | `string` | Yes | The UK Parliamentary constituency for this postcode. |
| `parliamentary_constituency_2024` | `string` | No | The UK Parliamentary constituency for this postcode based on July 2024 boundaries. |
| `pfa` | `string` | No | The police force area for this postcode. |
| `postcode` | `string` | Yes | UK postcode format: 2-4 character outward code, a space, and a 3-character inward code (e.g., SW1A 2AA). |
| `primary_care_trust` | `string` | Yes | The healthcare administrative area for this postcode. |
| `quality` | `number` | Yes | Positional Quality Indicator (1-9). |
| `region` | `string` | Yes | The regional designation for this postcode (formerly Government Office Regions or GORs). |
| `result` | `table` | Yes | Array containing detailed location information for the requested postcode or nearest postcodes |
| `ruc11` | `string` | No | The 2011 Census Rural-Urban Classification for this postcode. |
| `ruc21` | `string` | No | The 2021 Census Rural-Urban Classification for this postcode. |
| `status` | `number` | Yes |  |
| `ttwa` | `string` | No | The Travel to Work Area for this postcode. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Postcode():create({
  admin_county = --[[ string ]],
  admin_district = --[[ string ]],
  admin_ward = --[[ string ]],
  ccg = --[[ string ]],
  ced = --[[ string ]],
  codes = --[[ table ]],
  country = --[[ string ]],
  eastings = --[[ number ]],
  european_electoral_region = --[[ string ]],
  incode = --[[ string ]],
  latitude = --[[ number ]],
  longitude = --[[ number ]],
  lsoa = --[[ string ]],
  msoa = --[[ string ]],
  nhs_ha = --[[ string ]],
  northings = --[[ number ]],
  nuts = --[[ string ]],
  outcode = --[[ string ]],
  parish = --[[ string ]],
  parliamentary_constituency = --[[ string ]],
  postcode = --[[ string ]],
  primary_care_trust = --[[ string ]],
  quality = --[[ number ]],
  region = --[[ string ]],
  result = --[[ table ]],
  status = --[[ number ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Postcode():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Postcode():load({ id = "postcode_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PostcodeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ScottishPostcodeEntity

```lua
local scottish_postcode = client:ScottishPostcode(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `result` | `table` | Yes | Data for a given postcode |
| `status` | `number` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ScottishPostcode():load({ id = "scottish_postcode_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScottishPostcodeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TerminatedPostcodeEntity

```lua
local terminated_postcode = client:TerminatedPostcode(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `result` | `table` | Yes | Data for a given postcode |
| `status` | `number` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:TerminatedPostcode():load({ id = "terminated_postcode_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TerminatedPostcodeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

