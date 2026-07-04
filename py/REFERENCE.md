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
| `result` | ``$ARRAY`` | Yes |  |
| `status` | ``$INTEGER`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Nearest().list({})
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

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | ``$ANY`` | Yes |  |
| `status` | ``$INTEGER`` | Yes |  |

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

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Place().list({})
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
| `result` | ``$OBJECT`` | Yes |  |
| `status` | ``$INTEGER`` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Postcode().create({
    "result": ...,  # `$OBJECT`
    "status": ...,  # `$INTEGER`
})
```

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Postcode().list({})
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
| `result` | ``$ARRAY`` | Yes |  |
| `status` | ``$INTEGER`` | Yes |  |

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
| `result` | ``$ARRAY`` | Yes |  |
| `status` | ``$INTEGER`` | Yes |  |

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

