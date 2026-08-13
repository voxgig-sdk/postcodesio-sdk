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
| `result` | `table` | Yes |  |
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
| `code` | `string` | Yes |  |
| `country` | `string` | Yes |  |
| `county_unitary` | `string` | Yes |  |
| `county_unitary_type` | `string` | Yes |  |
| `district_borough` | `string` | Yes |  |
| `district_borough_type` | `string` | No |  |
| `eastings` | `number` | Yes |  |
| `latitude` | `number` | Yes |  |
| `local_type` | `string` | Yes |  |
| `longitude` | `number` | Yes |  |
| `max_eastings` | `number` | Yes |  |
| `max_northings` | `number` | Yes |  |
| `min_eastings` | `number` | Yes |  |
| `min_northings` | `number` | Yes |  |
| `name_1` | `string` | Yes |  |
| `name_1_lang` | `string` | Yes |  |
| `name_2` | `string` | Yes |  |
| `name_2_lang` | `string` | Yes |  |
| `northings` | `number` | Yes |  |
| `outcode` | `string` | Yes |  |
| `region` | `string` | Yes |  |

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
| `admin_county` | `string` | Yes |  |
| `admin_district` | `string` | Yes |  |
| `admin_ward` | `string` | Yes |  |
| `bua` | `string` | No |  |
| `cancer_alliance` | `string` | No |  |
| `ccg` | `string` | Yes |  |
| `ced` | `string` | Yes |  |
| `codes` | `table` | Yes |  |
| `country` | `string` | Yes |  |
| `date_of_introduction` | `string` | No |  |
| `eastings` | `number` | Yes |  |
| `european_electoral_region` | `string` | Yes |  |
| `icb` | `string` | No |  |
| `incode` | `string` | Yes |  |
| `latitude` | `number` | Yes |  |
| `lep1` | `string` | No |  |
| `lep2` | `string` | No |  |
| `longitude` | `number` | Yes |  |
| `lsoa` | `string` | Yes |  |
| `lsoa11` | `string` | No |  |
| `lsoa21` | `string` | No |  |
| `msoa` | `string` | Yes |  |
| `msoa11` | `string` | No |  |
| `msoa21` | `string` | No |  |
| `national_park` | `string` | No |  |
| `nhs_ha` | `string` | Yes |  |
| `nhs_region` | `string` | No |  |
| `northings` | `number` | Yes |  |
| `nuts` | `string` | Yes |  |
| `oa21` | `string` | No |  |
| `outcode` | `string` | Yes |  |
| `parish` | `string` | Yes |  |
| `parliamentary_constituency` | `string` | Yes |  |
| `parliamentary_constituency_2024` | `string` | No |  |
| `pfa` | `string` | No |  |
| `postcode` | `string` | Yes |  |
| `primary_care_trust` | `string` | Yes |  |
| `quality` | `number` | Yes |  |
| `region` | `string` | Yes |  |
| `result` | `table` | Yes |  |
| `ruc11` | `string` | No |  |
| `ruc21` | `string` | No |  |
| `status` | `number` | Yes |  |
| `ttwa` | `string` | No |  |

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
| `result` | `table` | Yes |  |
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
| `result` | `table` | Yes |  |
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

