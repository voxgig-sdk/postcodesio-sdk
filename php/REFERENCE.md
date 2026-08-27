# Postcodesio PHP SDK Reference

Complete API reference for the Postcodesio PHP SDK.


## PostcodesioSDK

### Constructor

```php
require_once __DIR__ . '/postcodesio_sdk.php';

$client = new PostcodesioSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `PostcodesioSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = PostcodesioSDK::test();
```


### Instance Methods

#### `Nearest($data = null)`

Create a new `NearestEntity` instance. Pass `null` for no initial data.

#### `Outcode($data = null)`

Create a new `OutcodeEntity` instance. Pass `null` for no initial data.

#### `Place($data = null)`

Create a new `PlaceEntity` instance. Pass `null` for no initial data.

#### `Postcode($data = null)`

Create a new `PostcodeEntity` instance. Pass `null` for no initial data.

#### `ScottishPostcode($data = null)`

Create a new `ScottishPostcodeEntity` instance. Pass `null` for no initial data.

#### `TerminatedPostcode($data = null)`

Create a new `TerminatedPostcodeEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): PostcodesioUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## NearestEntity

```php
$nearest = $client->Nearest();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | `array` | Yes | Array of nearest postcodes sorted by distance |
| `status` | `int` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Nearest()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): NearestEntity`

Create a new `NearestEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OutcodeEntity

```php
$outcode = $client->Outcode();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Outcode()->load(["id" => "outcode_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OutcodeEntity`

Create a new `OutcodeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PlaceEntity

```php
$place = $client->Place();
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
| `eastings` | `int` | Yes | Ordnance Survey grid reference Easting (1m resolution, not available for Channel Islands/Isle of Man) |
| `id` | `string` | No |  |
| `latitude` | `float` | Yes | WGS84 latitude coordinate |
| `local_type` | `string` | Yes | Ordnance Survey classification (City, Town, Village, Hamlet, etc.) |
| `longitude` | `float` | Yes | WGS84 longitude coordinate |
| `max_eastings` | `int` | Yes | Eastern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `max_northings` | `int` | Yes | Northern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `min_eastings` | `int` | Yes | Western edge of the place's bounding box (Minimum Bounding Rectangle) |
| `min_northings` | `int` | Yes | Southern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `name_1` | `string` | Yes | Official name of the place (preserves original format, e.g., "The Pennines" not "Pennines, The") |
| `name_1_lang` | `string` | Yes | Language code for name_1 (cym=Welsh, eng=English, gla=Scottish Gaelic) |
| `name_2` | `string` | Yes | Alternative name in a different language |
| `name_2_lang` | `string` | Yes | Language code for name_2 (cym=Welsh, eng=English, gla=Scottish Gaelic) |
| `northings` | `int` | Yes | Ordnance Survey grid reference Northing (1m resolution, not available for Channel Islands/Isle of Man) |
| `outcode` | `string` | Yes | Postcode district (first part of the postcode) |
| `region` | `string` | Yes | European Region (formerly Government Office Region) containing this place |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Place()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Place()->load(["id" => "place_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PlaceEntity`

Create a new `PlaceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PostcodeEntity

```php
$postcode = $client->Postcode();
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
| `codes` | `array` | Yes | Contains the GSS (Government Statistical Service) codes for administrative areas. |
| `country` | `string` | Yes | The UK constituent country for this postcode (England, Scotland, Wales, Northern Ireland, Channel Islands, or Isle of Man). |
| `date_of_introduction` | `string` | No | The date the postcode was introduced in YYYYMM format. |
| `eastings` | `int` | Yes | The OS grid reference easting (X-coordinate) to 1 metre resolution. |
| `european_electoral_region` | `string` | Yes | The European Electoral Region for this postcode. |
| `icb` | `string` | No | The NHS Integrated Care Board responsible for healthcare planning in this area. |
| `id` | `string` | No |  |
| `incode` | `string` | Yes | The second part of a postcode after the space (always 3 characters). |
| `latitude` | `float` | Yes | WGS84 latitude coordinate (north-south position). |
| `lep1` | `string` | No | The primary Local Enterprise Partnership for this postcode. |
| `lep2` | `string` | No | The secondary Local Enterprise Partnership for this postcode, if it falls within overlapping LEP areas. |
| `longitude` | `float` | Yes | WGS84 longitude coordinate (east-west position). |
| `lsoa` | `string` | Yes | 2021 Census LSOA code (smaller statistical area, typically 1,000-1,500 residents). |
| `lsoa11` | `string` | No | 2011 Census LSOA code. |
| `lsoa21` | `string` | No | 2021 Census LSOA code. |
| `msoa` | `string` | Yes | 2021 Census MSOA code (mid-size statistical area, typically 5,000-7,000 residents). |
| `msoa11` | `string` | No | 2011 Census MSOA code. |
| `msoa21` | `string` | No | 2021 Census MSOA code. |
| `national_park` | `string` | No | The National Park this postcode falls within, if any. |
| `nhs_ha` | `string` | Yes | The NHS health authority area for this postcode. |
| `nhs_region` | `string` | No | The NHS England Region for this postcode. |
| `northings` | `int` | Yes | The OS grid reference northing (Y-coordinate) to 1 metre resolution. |
| `nuts` | `string` | Yes | Statistical geography code for international comparisons (formerly NUTS - Nomenclature of Units for Territorial Statistics). |
| `oa21` | `string` | No | 2021 Census Output Area code - the smallest census geography. |
| `outcode` | `string` | Yes | The first part of a postcode before the space (2-4 characters). |
| `parish` | `string` | Yes | The civil parish (England) or community (Wales) for this postcode. |
| `parliamentary_constituency` | `string` | Yes | The UK Parliamentary constituency for this postcode. |
| `parliamentary_constituency_2024` | `string` | No | The UK Parliamentary constituency for this postcode based on July 2024 boundaries. |
| `pfa` | `string` | No | The police force area for this postcode. |
| `postcode` | `string` | Yes | UK postcode format: 2-4 character outward code, a space, and a 3-character inward code (e.g., SW1A 2AA). |
| `primary_care_trust` | `string` | Yes | The healthcare administrative area for this postcode. |
| `quality` | `int` | Yes | Positional Quality Indicator (1-9). |
| `region` | `string` | Yes | The regional designation for this postcode (formerly Government Office Regions or GORs). |
| `result` | `array` | Yes | Array containing detailed location information for the requested postcode or nearest postcodes |
| `ruc11` | `string` | No | The 2011 Census Rural-Urban Classification for this postcode. |
| `ruc21` | `string` | No | The 2021 Census Rural-Urban Classification for this postcode. |
| `status` | `int` | Yes |  |
| `ttwa` | `string` | No | The Travel to Work Area for this postcode. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Postcode()->create([
  "admin_county" => null, // string
  "admin_district" => null, // string
  "admin_ward" => null, // string
  "ccg" => null, // string
  "ced" => null, // string
  "codes" => null, // array
  "country" => null, // string
  "eastings" => null, // int
  "european_electoral_region" => null, // string
  "incode" => null, // string
  "latitude" => null, // float
  "longitude" => null, // float
  "lsoa" => null, // string
  "msoa" => null, // string
  "nhs_ha" => null, // string
  "northings" => null, // int
  "nuts" => null, // string
  "outcode" => null, // string
  "parish" => null, // string
  "parliamentary_constituency" => null, // string
  "postcode" => null, // string
  "primary_care_trust" => null, // string
  "quality" => null, // int
  "region" => null, // string
  "result" => null, // array
  "status" => null, // int
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Postcode()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Postcode()->load(["id" => "postcode_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PostcodeEntity`

Create a new `PostcodeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ScottishPostcodeEntity

```php
$scottish_postcode = $client->ScottishPostcode();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `result` | `array` | Yes | Data for a given postcode |
| `status` | `int` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ScottishPostcode()->load(["id" => "scottish_postcode_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ScottishPostcodeEntity`

Create a new `ScottishPostcodeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TerminatedPostcodeEntity

```php
$terminated_postcode = $client->TerminatedPostcode();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `result` | `array` | Yes | Data for a given postcode |
| `status` | `int` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->TerminatedPostcode()->load(["id" => "terminated_postcode_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TerminatedPostcodeEntity`

Create a new `TerminatedPostcodeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new PostcodesioSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

