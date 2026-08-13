# Postcodesio Ruby SDK Reference

Complete API reference for the Postcodesio Ruby SDK.


## PostcodesioSDK

### Constructor

```ruby
require_relative 'Postcodesio_sdk'

client = PostcodesioSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `PostcodesioSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = PostcodesioSDK.test
```


### Instance Methods

#### `Nearest(data = nil)`

Create a new `Nearest` entity instance. Pass `nil` for no initial data.

#### `Outcode(data = nil)`

Create a new `Outcode` entity instance. Pass `nil` for no initial data.

#### `Place(data = nil)`

Create a new `Place` entity instance. Pass `nil` for no initial data.

#### `Postcode(data = nil)`

Create a new `Postcode` entity instance. Pass `nil` for no initial data.

#### `ScottishPostcode(data = nil)`

Create a new `ScottishPostcode` entity instance. Pass `nil` for no initial data.

#### `TerminatedPostcode(data = nil)`

Create a new `TerminatedPostcode` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## NearestEntity

```ruby
nearest = client.Nearest
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | `Array` | Yes |  |
| `status` | `Integer` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Nearest.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `NearestEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OutcodeEntity

```ruby
outcode = client.Outcode
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Outcode.load({ "id" => "outcode_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OutcodeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PlaceEntity

```ruby
place = client.Place
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `String` | Yes |  |
| `country` | `String` | Yes |  |
| `county_unitary` | `String` | Yes |  |
| `county_unitary_type` | `String` | Yes |  |
| `district_borough` | `String` | Yes |  |
| `district_borough_type` | `String` | No |  |
| `eastings` | `Integer` | Yes |  |
| `latitude` | `Float` | Yes |  |
| `local_type` | `String` | Yes |  |
| `longitude` | `Float` | Yes |  |
| `max_eastings` | `Integer` | Yes |  |
| `max_northings` | `Integer` | Yes |  |
| `min_eastings` | `Integer` | Yes |  |
| `min_northings` | `Integer` | Yes |  |
| `name_1` | `String` | Yes |  |
| `name_1_lang` | `String` | Yes |  |
| `name_2` | `String` | Yes |  |
| `name_2_lang` | `String` | Yes |  |
| `northings` | `Integer` | Yes |  |
| `outcode` | `String` | Yes |  |
| `region` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Place.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Place.load({ "id" => "place_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PlaceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PostcodeEntity

```ruby
postcode = client.Postcode
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin_county` | `String` | Yes |  |
| `admin_district` | `String` | Yes |  |
| `admin_ward` | `String` | Yes |  |
| `bua` | `String` | No |  |
| `cancer_alliance` | `String` | No |  |
| `ccg` | `String` | Yes |  |
| `ced` | `String` | Yes |  |
| `codes` | `Hash` | Yes |  |
| `country` | `String` | Yes |  |
| `date_of_introduction` | `String` | No |  |
| `eastings` | `Integer` | Yes |  |
| `european_electoral_region` | `String` | Yes |  |
| `icb` | `String` | No |  |
| `incode` | `String` | Yes |  |
| `latitude` | `Float` | Yes |  |
| `lep1` | `String` | No |  |
| `lep2` | `String` | No |  |
| `longitude` | `Float` | Yes |  |
| `lsoa` | `String` | Yes |  |
| `lsoa11` | `String` | No |  |
| `lsoa21` | `String` | No |  |
| `msoa` | `String` | Yes |  |
| `msoa11` | `String` | No |  |
| `msoa21` | `String` | No |  |
| `national_park` | `String` | No |  |
| `nhs_ha` | `String` | Yes |  |
| `nhs_region` | `String` | No |  |
| `northings` | `Integer` | Yes |  |
| `nuts` | `String` | Yes |  |
| `oa21` | `String` | No |  |
| `outcode` | `String` | Yes |  |
| `parish` | `String` | Yes |  |
| `parliamentary_constituency` | `String` | Yes |  |
| `parliamentary_constituency_2024` | `String` | No |  |
| `pfa` | `String` | No |  |
| `postcode` | `String` | Yes |  |
| `primary_care_trust` | `String` | Yes |  |
| `quality` | `Integer` | Yes |  |
| `region` | `String` | Yes |  |
| `result` | `Array` | Yes |  |
| `ruc11` | `String` | No |  |
| `ruc21` | `String` | No |  |
| `status` | `Integer` | Yes |  |
| `ttwa` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Postcode.create({
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

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Postcode.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Postcode.load({ "id" => "postcode_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PostcodeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ScottishPostcodeEntity

```ruby
scottish_postcode = client.ScottishPostcode
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | `Array` | Yes |  |
| `status` | `Integer` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ScottishPostcode.load({ "id" => "scottish_postcode_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ScottishPostcodeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TerminatedPostcodeEntity

```ruby
terminated_postcode = client.TerminatedPostcode
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | `Array` | Yes |  |
| `status` | `Integer` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.TerminatedPostcode.load({ "id" => "terminated_postcode_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TerminatedPostcodeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = PostcodesioSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

