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
| `result` | `Array` | Yes | Array of nearest postcodes sorted by distance |
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

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

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
| `code` | `String` | Yes | Unique identifier for the place record (persistent except for Section of Named/Numbered Roads) |
| `country` | `String` | Yes | Country within Great Britain (England, Scotland, or Wales) |
| `county_unitary` | `String` | Yes | County, Unitary Authority or Greater London Authority that contains this place |
| `county_unitary_type` | `String` | Yes | Type of administrative unit (e.g., County, UnitaryAuthority) |
| `district_borough` | `String` | Yes | District, Metropolitan District or London Borough containing this place |
| `district_borough_type` | `String` | No | Type of district/borough administrative unit |
| `eastings` | `Integer` | Yes | Ordnance Survey grid reference Easting (1m resolution, not available for Channel Islands/Isle of Man) |
| `id` | `String` | No |  |
| `latitude` | `Float` | Yes | WGS84 latitude coordinate |
| `local_type` | `String` | Yes | Ordnance Survey classification (City, Town, Village, Hamlet, etc.) |
| `longitude` | `Float` | Yes | WGS84 longitude coordinate |
| `max_eastings` | `Integer` | Yes | Eastern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `max_northings` | `Integer` | Yes | Northern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `min_eastings` | `Integer` | Yes | Western edge of the place's bounding box (Minimum Bounding Rectangle) |
| `min_northings` | `Integer` | Yes | Southern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `name_1` | `String` | Yes | Official name of the place (preserves original format, e.g., "The Pennines" not "Pennines, The") |
| `name_1_lang` | `String` | Yes | Language code for name_1 (cym=Welsh, eng=English, gla=Scottish Gaelic) |
| `name_2` | `String` | Yes | Alternative name in a different language |
| `name_2_lang` | `String` | Yes | Language code for name_2 (cym=Welsh, eng=English, gla=Scottish Gaelic) |
| `northings` | `Integer` | Yes | Ordnance Survey grid reference Northing (1m resolution, not available for Channel Islands/Isle of Man) |
| `outcode` | `String` | Yes | Postcode district (first part of the postcode) |
| `region` | `String` | Yes | European Region (formerly Government Office Region) containing this place |

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
| `admin_county` | `String` | Yes | The administrative county for this postcode. |
| `admin_district` | `String` | Yes | The administrative district or unitary authority for this postcode. |
| `admin_ward` | `String` | Yes | The electoral/administrative ward for this postcode. |
| `bua` | `String` | No | The Built-up Area (2022) for this postcode. |
| `cancer_alliance` | `String` | No | The Cancer Alliance for this postcode. |
| `ccg` | `String` | Yes | NHS Clinical Commissioning Group responsible for planning healthcare services in England. |
| `ced` | `String` | Yes | The county electoral division for English postcodes. |
| `codes` | `Hash` | Yes | Contains the GSS (Government Statistical Service) codes for administrative areas. |
| `country` | `String` | Yes | The UK constituent country for this postcode (England, Scotland, Wales, Northern Ireland, Channel Islands, or Isle of Man). |
| `date_of_introduction` | `String` | No | The date the postcode was introduced in YYYYMM format. |
| `eastings` | `Integer` | Yes | The OS grid reference easting (X-coordinate) to 1 metre resolution. |
| `european_electoral_region` | `String` | Yes | The European Electoral Region for this postcode. |
| `icb` | `String` | No | The NHS Integrated Care Board responsible for healthcare planning in this area. |
| `id` | `String` | No |  |
| `incode` | `String` | Yes | The second part of a postcode after the space (always 3 characters). |
| `latitude` | `Float` | Yes | WGS84 latitude coordinate (north-south position). |
| `lep1` | `String` | No | The primary Local Enterprise Partnership for this postcode. |
| `lep2` | `String` | No | The secondary Local Enterprise Partnership for this postcode, if it falls within overlapping LEP areas. |
| `longitude` | `Float` | Yes | WGS84 longitude coordinate (east-west position). |
| `lsoa` | `String` | Yes | 2021 Census LSOA code (smaller statistical area, typically 1,000-1,500 residents). |
| `lsoa11` | `String` | No | 2011 Census LSOA code. |
| `lsoa21` | `String` | No | 2021 Census LSOA code. |
| `msoa` | `String` | Yes | 2021 Census MSOA code (mid-size statistical area, typically 5,000-7,000 residents). |
| `msoa11` | `String` | No | 2011 Census MSOA code. |
| `msoa21` | `String` | No | 2021 Census MSOA code. |
| `national_park` | `String` | No | The National Park this postcode falls within, if any. |
| `nhs_ha` | `String` | Yes | The NHS health authority area for this postcode. |
| `nhs_region` | `String` | No | The NHS England Region for this postcode. |
| `northings` | `Integer` | Yes | The OS grid reference northing (Y-coordinate) to 1 metre resolution. |
| `nuts` | `String` | Yes | Statistical geography code for international comparisons (formerly NUTS - Nomenclature of Units for Territorial Statistics). |
| `oa21` | `String` | No | 2021 Census Output Area code - the smallest census geography. |
| `outcode` | `String` | Yes | The first part of a postcode before the space (2-4 characters). |
| `parish` | `String` | Yes | The civil parish (England) or community (Wales) for this postcode. |
| `parliamentary_constituency` | `String` | Yes | The UK Parliamentary constituency for this postcode. |
| `parliamentary_constituency_2024` | `String` | No | The UK Parliamentary constituency for this postcode based on July 2024 boundaries. |
| `pfa` | `String` | No | The police force area for this postcode. |
| `postcode` | `String` | Yes | UK postcode format: 2-4 character outward code, a space, and a 3-character inward code (e.g., SW1A 2AA). |
| `primary_care_trust` | `String` | Yes | The healthcare administrative area for this postcode. |
| `quality` | `Integer` | Yes | Positional Quality Indicator (1-9). |
| `region` | `String` | Yes | The regional designation for this postcode (formerly Government Office Regions or GORs). |
| `result` | `Array` | Yes | Array containing detailed location information for the requested postcode or nearest postcodes |
| `ruc11` | `String` | No | The 2011 Census Rural-Urban Classification for this postcode. |
| `ruc21` | `String` | No | The 2021 Census Rural-Urban Classification for this postcode. |
| `status` | `Integer` | Yes |  |
| `ttwa` | `String` | No | The Travel to Work Area for this postcode. |

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
| `id` | `String` | No |  |
| `result` | `Array` | Yes | Data for a given postcode |
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
| `id` | `String` | No |  |
| `result` | `Array` | Yes | Data for a given postcode |
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

