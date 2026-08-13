# Postcodesio Python SDK Reference

Complete API reference for the Postcodesio Python SDK.


## PostcodesioSDK

### Constructor

```python
from postcodesio_sdk import PostcodesioSDK

client = PostcodesioSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `PostcodesioSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = PostcodesioSDK.test()
```


### Instance Methods

#### `Nearest(data=None)`

Create a new `NearestEntity` instance. Pass `None` for no initial data.

#### `Outcode(data=None)`

Create a new `OutcodeEntity` instance. Pass `None` for no initial data.

#### `Place(data=None)`

Create a new `PlaceEntity` instance. Pass `None` for no initial data.

#### `Postcode(data=None)`

Create a new `PostcodeEntity` instance. Pass `None` for no initial data.

#### `ScottishPostcode(data=None)`

Create a new `ScottishPostcodeEntity` instance. Pass `None` for no initial data.

#### `TerminatedPostcode(data=None)`

Create a new `TerminatedPostcodeEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## NearestEntity

```python
nearest = client.Nearest()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | `list` | Yes |  |
| `status` | `int` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Nearest().list({"postcode_id": "example"})
for nearest in results:
    print(nearest)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NearestEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OutcodeEntity

```python
outcode = client.Outcode()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Outcode().load({"id": "outcode_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OutcodeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PlaceEntity

```python
place = client.Place()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `str` | Yes |  |
| `country` | `str` | Yes |  |
| `county_unitary` | `str` | Yes |  |
| `county_unitary_type` | `str` | Yes |  |
| `district_borough` | `str` | Yes |  |
| `district_borough_type` | `str` | No |  |
| `eastings` | `int` | Yes |  |
| `latitude` | `float` | Yes |  |
| `local_type` | `str` | Yes |  |
| `longitude` | `float` | Yes |  |
| `max_eastings` | `int` | Yes |  |
| `max_northings` | `int` | Yes |  |
| `min_eastings` | `int` | Yes |  |
| `min_northings` | `int` | Yes |  |
| `name_1` | `str` | Yes |  |
| `name_1_lang` | `str` | Yes |  |
| `name_2` | `str` | Yes |  |
| `name_2_lang` | `str` | Yes |  |
| `northings` | `int` | Yes |  |
| `outcode` | `str` | Yes |  |
| `region` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Place().list()
for place in results:
    print(place)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Place().load({"id": "place_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlaceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PostcodeEntity

```python
postcode = client.Postcode()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin_county` | `str` | Yes |  |
| `admin_district` | `str` | Yes |  |
| `admin_ward` | `str` | Yes |  |
| `bua` | `str` | No |  |
| `cancer_alliance` | `str` | No |  |
| `ccg` | `str` | Yes |  |
| `ced` | `str` | Yes |  |
| `codes` | `dict` | Yes |  |
| `country` | `str` | Yes |  |
| `date_of_introduction` | `str` | No |  |
| `eastings` | `int` | Yes |  |
| `european_electoral_region` | `str` | Yes |  |
| `icb` | `str` | No |  |
| `incode` | `str` | Yes |  |
| `latitude` | `float` | Yes |  |
| `lep1` | `str` | No |  |
| `lep2` | `str` | No |  |
| `longitude` | `float` | Yes |  |
| `lsoa` | `str` | Yes |  |
| `lsoa11` | `str` | No |  |
| `lsoa21` | `str` | No |  |
| `msoa` | `str` | Yes |  |
| `msoa11` | `str` | No |  |
| `msoa21` | `str` | No |  |
| `national_park` | `str` | No |  |
| `nhs_ha` | `str` | Yes |  |
| `nhs_region` | `str` | No |  |
| `northings` | `int` | Yes |  |
| `nuts` | `str` | Yes |  |
| `oa21` | `str` | No |  |
| `outcode` | `str` | Yes |  |
| `parish` | `str` | Yes |  |
| `parliamentary_constituency` | `str` | Yes |  |
| `parliamentary_constituency_2024` | `str` | No |  |
| `pfa` | `str` | No |  |
| `postcode` | `str` | Yes |  |
| `primary_care_trust` | `str` | Yes |  |
| `quality` | `int` | Yes |  |
| `region` | `str` | Yes |  |
| `result` | `list` | Yes |  |
| `ruc11` | `str` | No |  |
| `ruc21` | `str` | No |  |
| `status` | `int` | Yes |  |
| `ttwa` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Postcode().create({
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

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Postcode().list()
for postcode in results:
    print(postcode)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Postcode().load({"id": "postcode_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PostcodeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ScottishPostcodeEntity

```python
scottish_postcode = client.ScottishPostcode()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | `list` | Yes |  |
| `status` | `int` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ScottishPostcode().load({"id": "scottish_postcode_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScottishPostcodeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TerminatedPostcodeEntity

```python
terminated_postcode = client.TerminatedPostcode()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | `list` | Yes |  |
| `status` | `int` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.TerminatedPostcode().load({"id": "terminated_postcode_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TerminatedPostcodeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = PostcodesioSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

