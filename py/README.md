# Postcodesio Python SDK



The Python SDK for the Postcodesio API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Nearest()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/postcodesio-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from postcodesio_sdk import PostcodesioSDK

client = PostcodesioSDK()
```

### 2. List nearest records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    nearests = client.Nearest().list({"postcode_id": "example"})
    for nearest in nearests:
        print(nearest)
except Exception as err:
    print(f"list failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    nearests = client.Nearest().list()
    print(nearests)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = PostcodesioSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
nearest = client.Nearest().list()
# nearest contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = PostcodesioSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### PostcodesioSDK

```python
from postcodesio_sdk import PostcodesioSDK

client = PostcodesioSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = PostcodesioSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### PostcodesioSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `nearest = client.Nearest()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | `list` |  |
| `status` | `int` |  |

#### Example: List

```python
nearests = client.Nearest().list({"postcode_id": "example"})
```


### Outcode

Create an instance: `outcode = client.Outcode()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
outcode = client.Outcode().load({"id": "outcode_id"})
```


### Place

Create an instance: `place = client.Place()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `str` |  |
| `country` | `str` |  |
| `county_unitary` | `str` |  |
| `county_unitary_type` | `str` |  |
| `district_borough` | `str` |  |
| `district_borough_type` | `str` |  |
| `eastings` | `int` |  |
| `latitude` | `float` |  |
| `local_type` | `str` |  |
| `longitude` | `float` |  |
| `max_eastings` | `int` |  |
| `max_northings` | `int` |  |
| `min_eastings` | `int` |  |
| `min_northings` | `int` |  |
| `name_1` | `str` |  |
| `name_1_lang` | `str` |  |
| `name_2` | `str` |  |
| `name_2_lang` | `str` |  |
| `northings` | `int` |  |
| `outcode` | `str` |  |
| `region` | `str` |  |

#### Example: Load

```python
place = client.Place().load({"id": "place_id"})
```

#### Example: List

```python
places = client.Place().list()
```


### Postcode

Create an instance: `postcode = client.Postcode()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin_county` | `str` |  |
| `admin_district` | `str` |  |
| `admin_ward` | `str` |  |
| `bua` | `str` |  |
| `cancer_alliance` | `str` |  |
| `ccg` | `str` |  |
| `ced` | `str` |  |
| `codes` | `dict` |  |
| `country` | `str` |  |
| `date_of_introduction` | `str` |  |
| `eastings` | `int` |  |
| `european_electoral_region` | `str` |  |
| `icb` | `str` |  |
| `incode` | `str` |  |
| `latitude` | `float` |  |
| `lep1` | `str` |  |
| `lep2` | `str` |  |
| `longitude` | `float` |  |
| `lsoa` | `str` |  |
| `lsoa11` | `str` |  |
| `lsoa21` | `str` |  |
| `msoa` | `str` |  |
| `msoa11` | `str` |  |
| `msoa21` | `str` |  |
| `national_park` | `str` |  |
| `nhs_ha` | `str` |  |
| `nhs_region` | `str` |  |
| `northings` | `int` |  |
| `nuts` | `str` |  |
| `oa21` | `str` |  |
| `outcode` | `str` |  |
| `parish` | `str` |  |
| `parliamentary_constituency` | `str` |  |
| `parliamentary_constituency_2024` | `str` |  |
| `pfa` | `str` |  |
| `postcode` | `str` |  |
| `primary_care_trust` | `str` |  |
| `quality` | `int` |  |
| `region` | `str` |  |
| `result` | `list` |  |
| `ruc11` | `str` |  |
| `ruc21` | `str` |  |
| `status` | `int` |  |
| `ttwa` | `str` |  |

#### Example: Load

```python
postcode = client.Postcode().load({"id": "postcode_id"})
```

#### Example: List

```python
postcodes = client.Postcode().list()
```

#### Example: Create

```python
postcode = client.Postcode().create({
    "admin_county": "example_admin_county",  # str
    "admin_district": "example_admin_district",  # str
    "admin_ward": "example_admin_ward",  # str
    "ccg": "example_ccg",  # str
    "ced": "example_ced",  # str
    "codes": {},  # dict
    "country": "example_country",  # str
    "eastings": 1,  # int
    "european_electoral_region": "example_european_electoral_region",  # str
    "incode": "example_incode",  # str
    "latitude": 1,  # float
    "longitude": 1,  # float
    "lsoa": "example_lsoa",  # str
    "msoa": "example_msoa",  # str
    "nhs_ha": "example_nhs_ha",  # str
    "northings": 1,  # int
    "nuts": "example_nuts",  # str
    "outcode": "example_outcode",  # str
    "parish": "example_parish",  # str
    "parliamentary_constituency": "example_parliamentary_constituency",  # str
    "postcode": "example_postcode",  # str
    "primary_care_trust": "example_primary_care_trust",  # str
    "quality": 1,  # int
    "region": "example_region",  # str
    "result": [],  # list
    "status": 1,  # int
})
```


### ScottishPostcode

Create an instance: `scottish_postcode = client.ScottishPostcode()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | `list` |  |
| `status` | `int` |  |

#### Example: Load

```python
scottish_postcode = client.ScottishPostcode().load({"id": "scottish_postcode_id"})
```


### TerminatedPostcode

Create an instance: `terminated_postcode = client.TerminatedPostcode()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | `list` |  |
| `status` | `int` |  |

#### Example: Load

```python
terminated_postcode = client.TerminatedPostcode().load({"id": "terminated_postcode_id"})
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── postcodesio_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`postcodesio_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
nearest = client.Nearest()
nearest.list()

# nearest.data_get() now returns the nearest data from the last list
# nearest.match_get() returns the last match criteria
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
