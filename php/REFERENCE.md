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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

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
$nearest = $client->nearest();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | ``$ARRAY`` | Yes |  |
| `status` | ``$INTEGER`` | Yes |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->nearest()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): NearestEntity`

Create a new `NearestEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## OutcodeEntity

```php
$outcode = $client->outcode();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | ``$ANY`` | Yes |  |
| `status` | ``$INTEGER`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->outcode()->load(["id" => "outcode_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): OutcodeEntity`

Create a new `OutcodeEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PlaceEntity

```php
$place = $client->place();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | ``$STRING`` | Yes |  |
| `country` | ``$STRING`` | Yes |  |
| `county_unitary` | ``$STRING`` | Yes |  |
| `county_unitary_type` | ``$STRING`` | Yes |  |
| `district_borough` | ``$STRING`` | Yes |  |
| `district_borough_type` | ``$STRING`` | No |  |
| `easting` | ``$INTEGER`` | Yes |  |
| `latitude` | ``$NUMBER`` | Yes |  |
| `local_type` | ``$STRING`` | Yes |  |
| `longitude` | ``$NUMBER`` | Yes |  |
| `max_easting` | ``$INTEGER`` | Yes |  |
| `max_northing` | ``$INTEGER`` | Yes |  |
| `min_easting` | ``$INTEGER`` | Yes |  |
| `min_northing` | ``$INTEGER`` | Yes |  |
| `name_1` | ``$STRING`` | Yes |  |
| `name_1_lang` | ``$STRING`` | Yes |  |
| `name_2` | ``$STRING`` | Yes |  |
| `name_2_lang` | ``$STRING`` | Yes |  |
| `northing` | ``$INTEGER`` | Yes |  |
| `outcode` | ``$STRING`` | Yes |  |
| `region` | ``$STRING`` | Yes |  |
| `result` | ``$OBJECT`` | Yes |  |
| `status` | ``$INTEGER`` | Yes |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->place()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->place()->load(["id" => "place_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PlaceEntity`

Create a new `PlaceEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PostcodeEntity

```php
$postcode = $client->postcode();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | ``$OBJECT`` | Yes |  |
| `status` | ``$INTEGER`` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->postcode()->create([
  "result" => /* `$OBJECT` */,
  "status" => /* `$INTEGER` */,
]);
```

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->postcode()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->postcode()->load(["id" => "postcode_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PostcodeEntity`

Create a new `PostcodeEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ScottishPostcodeEntity

```php
$scottish_postcode = $client->scottish_postcode();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | ``$ARRAY`` | Yes |  |
| `status` | ``$INTEGER`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->scottish_postcode()->load(["id" => "scottish_postcode_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ScottishPostcodeEntity`

Create a new `ScottishPostcodeEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## TerminatedPostcodeEntity

```php
$terminated_postcode = $client->terminated_postcode();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | ``$ARRAY`` | Yes |  |
| `status` | ``$INTEGER`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->terminated_postcode()->load(["id" => "terminated_postcode_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): TerminatedPostcodeEntity`

Create a new `TerminatedPostcodeEntity` instance with the same client and
options.

#### `getName(): string`

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

