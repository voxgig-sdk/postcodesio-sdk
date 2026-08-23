# Postcodesio PHP SDK



The PHP SDK for the Postcodesio API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Nearest()` — with named operations (`list`/`load`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/postcodesio-sdk/releases](https://github.com/voxgig-sdk/postcodesio-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'postcodesio_sdk.php';

$client = new PostcodesioSDK();
```

### 2. List nearest records

```php
try {
    // list() returns an array of Nearest records — iterate directly.
    $nearests = $client->Nearest()->list();
    foreach ($nearests as $item) {
        echo $item["result"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $nearests = $client->Nearest()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = PostcodesioSDK::test();

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$nearest = $client->Nearest()->list();
print_r($nearest);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new PostcodesioSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
POSTCODESIO_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### PostcodesioSDK

```php
require_once 'postcodesio_sdk.php';
$client = new PostcodesioSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = PostcodesioSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### PostcodesioSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Nearest` | `($data): NearestEntity` | Create a Nearest entity instance. |
| `Outcode` | `($data): OutcodeEntity` | Create an Outcode entity instance. |
| `Place` | `($data): PlaceEntity` | Create a Place entity instance. |
| `Postcode` | `($data): PostcodeEntity` | Create a Postcode entity instance. |
| `ScottishPostcode` | `($data): ScottishPostcodeEntity` | Create a ScottishPostcode entity instance. |
| `TerminatedPostcode` | `($data): TerminatedPostcodeEntity` | Create a TerminatedPostcode entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$nearest = $client->Nearest();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | `array` | Array of nearest postcodes sorted by distance |
| `status` | `int` |  |

#### Example: List

```php
// list() returns an array of Nearest records (throws on error).
$nearests = $client->Nearest()->list();
```


### Outcode

Create an instance: `$outcode = $client->Outcode();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Outcode record (throws on error).
$outcode = $client->Outcode()->load(["id" => "outcode_id"]);
```


### Place

Create an instance: `$place = $client->Place();`

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
| `eastings` | `int` | Ordnance Survey grid reference Easting (1m resolution, not available for Channel Islands/Isle of Man) |
| `latitude` | `float` | WGS84 latitude coordinate |
| `local_type` | `string` | Ordnance Survey classification (City, Town, Village, Hamlet, etc.) |
| `longitude` | `float` | WGS84 longitude coordinate |
| `max_eastings` | `int` | Eastern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `max_northings` | `int` | Northern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `min_eastings` | `int` | Western edge of the place's bounding box (Minimum Bounding Rectangle) |
| `min_northings` | `int` | Southern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `name_1` | `string` | Official name of the place (preserves original format, e.g., "The Pennines" not "Pennines, The") |
| `name_1_lang` | `string` | Language code for name_1 (cym=Welsh, eng=English, gla=Scottish Gaelic) |
| `name_2` | `string` | Alternative name in a different language |
| `name_2_lang` | `string` | Language code for name_2 (cym=Welsh, eng=English, gla=Scottish Gaelic) |
| `northings` | `int` | Ordnance Survey grid reference Northing (1m resolution, not available for Channel Islands/Isle of Man) |
| `outcode` | `string` | Postcode district (first part of the postcode) |
| `region` | `string` | European Region (formerly Government Office Region) containing this place |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Place record (throws on error).
$place = $client->Place()->load(["id" => "place_id"]);
```

#### Example: List

```php
// list() returns an array of Place records (throws on error).
$places = $client->Place()->list();
```


### Postcode

Create an instance: `$postcode = $client->Postcode();`

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
| `codes` | `array` | Contains the GSS (Government Statistical Service) codes for administrative areas. |
| `country` | `string` | The UK constituent country for this postcode (England, Scotland, Wales, Northern Ireland, Channel Islands, or Isle of Man). |
| `date_of_introduction` | `string` | The date the postcode was introduced in YYYYMM format. |
| `eastings` | `int` | The OS grid reference easting (X-coordinate) to 1 metre resolution. |
| `european_electoral_region` | `string` | The European Electoral Region for this postcode. |
| `icb` | `string` | The NHS Integrated Care Board responsible for healthcare planning in this area. |
| `incode` | `string` | The second part of a postcode after the space (always 3 characters). |
| `latitude` | `float` | WGS84 latitude coordinate (north-south position). |
| `lep1` | `string` | The primary Local Enterprise Partnership for this postcode. |
| `lep2` | `string` | The secondary Local Enterprise Partnership for this postcode, if it falls within overlapping LEP areas. |
| `longitude` | `float` | WGS84 longitude coordinate (east-west position). |
| `lsoa` | `string` | 2021 Census LSOA code (smaller statistical area, typically 1,000-1,500 residents). |
| `lsoa11` | `string` | 2011 Census LSOA code. |
| `lsoa21` | `string` | 2021 Census LSOA code. |
| `msoa` | `string` | 2021 Census MSOA code (mid-size statistical area, typically 5,000-7,000 residents). |
| `msoa11` | `string` | 2011 Census MSOA code. |
| `msoa21` | `string` | 2021 Census MSOA code. |
| `national_park` | `string` | The National Park this postcode falls within, if any. |
| `nhs_ha` | `string` | The NHS health authority area for this postcode. |
| `nhs_region` | `string` | The NHS England Region for this postcode. |
| `northings` | `int` | The OS grid reference northing (Y-coordinate) to 1 metre resolution. |
| `nuts` | `string` | Statistical geography code for international comparisons (formerly NUTS - Nomenclature of Units for Territorial Statistics). |
| `oa21` | `string` | 2021 Census Output Area code - the smallest census geography. |
| `outcode` | `string` | The first part of a postcode before the space (2-4 characters). |
| `parish` | `string` | The civil parish (England) or community (Wales) for this postcode. |
| `parliamentary_constituency` | `string` | The UK Parliamentary constituency for this postcode. |
| `parliamentary_constituency_2024` | `string` | The UK Parliamentary constituency for this postcode based on July 2024 boundaries. |
| `pfa` | `string` | The police force area for this postcode. |
| `postcode` | `string` | UK postcode format: 2-4 character outward code, a space, and a 3-character inward code (e.g., SW1A 2AA). |
| `primary_care_trust` | `string` | The healthcare administrative area for this postcode. |
| `quality` | `int` | Positional Quality Indicator (1-9). |
| `region` | `string` | The regional designation for this postcode (formerly Government Office Regions or GORs). |
| `result` | `array` | Array containing detailed location information for the requested postcode or nearest postcodes |
| `ruc11` | `string` | The 2011 Census Rural-Urban Classification for this postcode. |
| `ruc21` | `string` | The 2021 Census Rural-Urban Classification for this postcode. |
| `status` | `int` |  |
| `ttwa` | `string` | The Travel to Work Area for this postcode. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Postcode record (throws on error).
$postcode = $client->Postcode()->load(["id" => "postcode_id"]);
```

#### Example: List

```php
// list() returns an array of Postcode records (throws on error).
$postcodes = $client->Postcode()->list();
```

#### Example: Create

```php
$postcode = $client->Postcode()->create([
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


### ScottishPostcode

Create an instance: `$scottish_postcode = $client->ScottishPostcode();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | `array` | Data for a given postcode |
| `status` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ScottishPostcode record (throws on error).
$scottish_postcode = $client->ScottishPostcode()->load(["id" => "scottish_postcode_id"]);
```


### TerminatedPostcode

Create an instance: `$terminated_postcode = $client->TerminatedPostcode();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | `array` | Data for a given postcode |
| `status` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the TerminatedPostcode record (throws on error).
$terminated_postcode = $client->TerminatedPostcode()->load(["id" => "terminated_postcode_id"]);
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── postcodesio_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`postcodesio_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$nearest = $client->Nearest();
$nearest->list();

// $nearest->data_get() now returns the nearest data from the last list
// $nearest->match_get() returns the last match criteria
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
