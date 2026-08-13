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
| `result` | `array` | Yes |  |
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
| `code` | `string` | Yes |  |
| `country` | `string` | Yes |  |
| `county_unitary` | `string` | Yes |  |
| `county_unitary_type` | `string` | Yes |  |
| `district_borough` | `string` | Yes |  |
| `district_borough_type` | `string` | No |  |
| `eastings` | `int` | Yes |  |
| `latitude` | `float` | Yes |  |
| `local_type` | `string` | Yes |  |
| `longitude` | `float` | Yes |  |
| `max_eastings` | `int` | Yes |  |
| `max_northings` | `int` | Yes |  |
| `min_eastings` | `int` | Yes |  |
| `min_northings` | `int` | Yes |  |
| `name_1` | `string` | Yes |  |
| `name_1_lang` | `string` | Yes |  |
| `name_2` | `string` | Yes |  |
| `name_2_lang` | `string` | Yes |  |
| `northings` | `int` | Yes |  |
| `outcode` | `string` | Yes |  |
| `region` | `string` | Yes |  |

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
| `admin_county` | `string` | Yes |  |
| `admin_district` | `string` | Yes |  |
| `admin_ward` | `string` | Yes |  |
| `bua` | `string` | No |  |
| `cancer_alliance` | `string` | No |  |
| `ccg` | `string` | Yes |  |
| `ced` | `string` | Yes |  |
| `codes` | `array` | Yes |  |
| `country` | `string` | Yes |  |
| `date_of_introduction` | `string` | No |  |
| `eastings` | `int` | Yes |  |
| `european_electoral_region` | `string` | Yes |  |
| `icb` | `string` | No |  |
| `incode` | `string` | Yes |  |
| `latitude` | `float` | Yes |  |
| `lep1` | `string` | No |  |
| `lep2` | `string` | No |  |
| `longitude` | `float` | Yes |  |
| `lsoa` | `string` | Yes |  |
| `lsoa11` | `string` | No |  |
| `lsoa21` | `string` | No |  |
| `msoa` | `string` | Yes |  |
| `msoa11` | `string` | No |  |
| `msoa21` | `string` | No |  |
| `national_park` | `string` | No |  |
| `nhs_ha` | `string` | Yes |  |
| `nhs_region` | `string` | No |  |
| `northings` | `int` | Yes |  |
| `nuts` | `string` | Yes |  |
| `oa21` | `string` | No |  |
| `outcode` | `string` | Yes |  |
| `parish` | `string` | Yes |  |
| `parliamentary_constituency` | `string` | Yes |  |
| `parliamentary_constituency_2024` | `string` | No |  |
| `pfa` | `string` | No |  |
| `postcode` | `string` | Yes |  |
| `primary_care_trust` | `string` | Yes |  |
| `quality` | `int` | Yes |  |
| `region` | `string` | Yes |  |
| `result` | `array` | Yes |  |
| `ruc11` | `string` | No |  |
| `ruc21` | `string` | No |  |
| `status` | `int` | Yes |  |
| `ttwa` | `string` | No |  |

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
| `result` | `array` | Yes |  |
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
| `result` | `array` | Yes |  |
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

