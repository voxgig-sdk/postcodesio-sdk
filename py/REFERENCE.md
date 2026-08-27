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
| `result` | `list` | Yes | Array of nearest postcodes sorted by distance |
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

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

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
| `code` | `str` | Yes | Unique identifier for the place record (persistent except for Section of Named/Numbered Roads) |
| `country` | `str` | Yes | Country within Great Britain (England, Scotland, or Wales) |
| `county_unitary` | `str` | Yes | County, Unitary Authority or Greater London Authority that contains this place |
| `county_unitary_type` | `str` | Yes | Type of administrative unit (e.g., County, UnitaryAuthority) |
| `district_borough` | `str` | Yes | District, Metropolitan District or London Borough containing this place |
| `district_borough_type` | `str` | No | Type of district/borough administrative unit |
| `eastings` | `int` | Yes | Ordnance Survey grid reference Easting (1m resolution, not available for Channel Islands/Isle of Man) |
| `id` | `str` | No |  |
| `latitude` | `float` | Yes | WGS84 latitude coordinate |
| `local_type` | `str` | Yes | Ordnance Survey classification (City, Town, Village, Hamlet, etc.) |
| `longitude` | `float` | Yes | WGS84 longitude coordinate |
| `max_eastings` | `int` | Yes | Eastern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `max_northings` | `int` | Yes | Northern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `min_eastings` | `int` | Yes | Western edge of the place's bounding box (Minimum Bounding Rectangle) |
| `min_northings` | `int` | Yes | Southern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `name_1` | `str` | Yes | Official name of the place (preserves original format, e.g., "The Pennines" not "Pennines, The") |
| `name_1_lang` | `str` | Yes | Language code for name_1 (cym=Welsh, eng=English, gla=Scottish Gaelic) |
| `name_2` | `str` | Yes | Alternative name in a different language |
| `name_2_lang` | `str` | Yes | Language code for name_2 (cym=Welsh, eng=English, gla=Scottish Gaelic) |
| `northings` | `int` | Yes | Ordnance Survey grid reference Northing (1m resolution, not available for Channel Islands/Isle of Man) |
| `outcode` | `str` | Yes | Postcode district (first part of the postcode) |
| `region` | `str` | Yes | European Region (formerly Government Office Region) containing this place |

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
| `admin_county` | `str` | Yes | The administrative county for this postcode. |
| `admin_district` | `str` | Yes | The administrative district or unitary authority for this postcode. |
| `admin_ward` | `str` | Yes | The electoral/administrative ward for this postcode. |
| `bua` | `str` | No | The Built-up Area (2022) for this postcode. |
| `cancer_alliance` | `str` | No | The Cancer Alliance for this postcode. |
| `ccg` | `str` | Yes | NHS Clinical Commissioning Group responsible for planning healthcare services in England. |
| `ced` | `str` | Yes | The county electoral division for English postcodes. |
| `codes` | `dict` | Yes | Contains the GSS (Government Statistical Service) codes for administrative areas. |
| `country` | `str` | Yes | The UK constituent country for this postcode (England, Scotland, Wales, Northern Ireland, Channel Islands, or Isle of Man). |
| `date_of_introduction` | `str` | No | The date the postcode was introduced in YYYYMM format. |
| `eastings` | `int` | Yes | The OS grid reference easting (X-coordinate) to 1 metre resolution. |
| `european_electoral_region` | `str` | Yes | The European Electoral Region for this postcode. |
| `icb` | `str` | No | The NHS Integrated Care Board responsible for healthcare planning in this area. |
| `id` | `str` | No |  |
| `incode` | `str` | Yes | The second part of a postcode after the space (always 3 characters). |
| `latitude` | `float` | Yes | WGS84 latitude coordinate (north-south position). |
| `lep1` | `str` | No | The primary Local Enterprise Partnership for this postcode. |
| `lep2` | `str` | No | The secondary Local Enterprise Partnership for this postcode, if it falls within overlapping LEP areas. |
| `longitude` | `float` | Yes | WGS84 longitude coordinate (east-west position). |
| `lsoa` | `str` | Yes | 2021 Census LSOA code (smaller statistical area, typically 1,000-1,500 residents). |
| `lsoa11` | `str` | No | 2011 Census LSOA code. |
| `lsoa21` | `str` | No | 2021 Census LSOA code. |
| `msoa` | `str` | Yes | 2021 Census MSOA code (mid-size statistical area, typically 5,000-7,000 residents). |
| `msoa11` | `str` | No | 2011 Census MSOA code. |
| `msoa21` | `str` | No | 2021 Census MSOA code. |
| `national_park` | `str` | No | The National Park this postcode falls within, if any. |
| `nhs_ha` | `str` | Yes | The NHS health authority area for this postcode. |
| `nhs_region` | `str` | No | The NHS England Region for this postcode. |
| `northings` | `int` | Yes | The OS grid reference northing (Y-coordinate) to 1 metre resolution. |
| `nuts` | `str` | Yes | Statistical geography code for international comparisons (formerly NUTS - Nomenclature of Units for Territorial Statistics). |
| `oa21` | `str` | No | 2021 Census Output Area code - the smallest census geography. |
| `outcode` | `str` | Yes | The first part of a postcode before the space (2-4 characters). |
| `parish` | `str` | Yes | The civil parish (England) or community (Wales) for this postcode. |
| `parliamentary_constituency` | `str` | Yes | The UK Parliamentary constituency for this postcode. |
| `parliamentary_constituency_2024` | `str` | No | The UK Parliamentary constituency for this postcode based on July 2024 boundaries. |
| `pfa` | `str` | No | The police force area for this postcode. |
| `postcode` | `str` | Yes | UK postcode format: 2-4 character outward code, a space, and a 3-character inward code (e.g., SW1A 2AA). |
| `primary_care_trust` | `str` | Yes | The healthcare administrative area for this postcode. |
| `quality` | `int` | Yes | Positional Quality Indicator (1-9). |
| `region` | `str` | Yes | The regional designation for this postcode (formerly Government Office Regions or GORs). |
| `result` | `list` | Yes | Array containing detailed location information for the requested postcode or nearest postcodes |
| `ruc11` | `str` | No | The 2011 Census Rural-Urban Classification for this postcode. |
| `ruc21` | `str` | No | The 2021 Census Rural-Urban Classification for this postcode. |
| `status` | `int` | Yes |  |
| `ttwa` | `str` | No | The Travel to Work Area for this postcode. |

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
| `id` | `str` | No |  |
| `result` | `list` | Yes | Data for a given postcode |
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
| `id` | `str` | No |  |
| `result` | `list` | Yes | Data for a given postcode |
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

