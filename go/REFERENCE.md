# Postcodesio Golang SDK Reference

Complete API reference for the Postcodesio Golang SDK.


## PostcodesioSDK

### Constructor

```go
func NewPostcodesioSDK(options map[string]any) *PostcodesioSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *PostcodesioSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *PostcodesioSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Nearest(data map[string]any) PostcodesioEntity`

Create a new `Nearest` entity instance. Pass `nil` for no initial data.

#### `Outcode(data map[string]any) PostcodesioEntity`

Create a new `Outcode` entity instance. Pass `nil` for no initial data.

#### `Place(data map[string]any) PostcodesioEntity`

Create a new `Place` entity instance. Pass `nil` for no initial data.

#### `Postcode(data map[string]any) PostcodesioEntity`

Create a new `Postcode` entity instance. Pass `nil` for no initial data.

#### `ScottishPostcode(data map[string]any) PostcodesioEntity`

Create a new `ScottishPostcode` entity instance. Pass `nil` for no initial data.

#### `TerminatedPostcode(data map[string]any) PostcodesioEntity`

Create a new `TerminatedPostcode` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## NearestEntity

```go
nearest := client.Nearest(nil)
fmt.Println(nearest.GetName()) // "nearest"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | `[]any` | Yes | Array of nearest postcodes sorted by distance |
| `status` | `int` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Nearest(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `NearestEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## OutcodeEntity

```go
outcode := client.Outcode(nil)
fmt.Println(outcode.GetName()) // "outcode"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Outcode(nil).Load(map[string]any{"id": "outcode_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OutcodeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PlaceEntity

```go
place := client.Place(nil)
fmt.Println(place.GetName()) // "place"
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
| `latitude` | `float64` | Yes | WGS84 latitude coordinate |
| `local_type` | `string` | Yes | Ordnance Survey classification (City, Town, Village, Hamlet, etc.) |
| `longitude` | `float64` | Yes | WGS84 longitude coordinate |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Place(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Place(nil).Load(map[string]any{"id": "place_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PlaceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PostcodeEntity

```go
postcode := client.Postcode(nil)
fmt.Println(postcode.GetName()) // "postcode"
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
| `codes` | `map[string]any` | Yes | Contains the GSS (Government Statistical Service) codes for administrative areas. |
| `country` | `string` | Yes | The UK constituent country for this postcode (England, Scotland, Wales, Northern Ireland, Channel Islands, or Isle of Man). |
| `date_of_introduction` | `string` | No | The date the postcode was introduced in YYYYMM format. |
| `eastings` | `int` | Yes | The OS grid reference easting (X-coordinate) to 1 metre resolution. |
| `european_electoral_region` | `string` | Yes | The European Electoral Region for this postcode. |
| `icb` | `string` | No | The NHS Integrated Care Board responsible for healthcare planning in this area. |
| `id` | `string` | No |  |
| `incode` | `string` | Yes | The second part of a postcode after the space (always 3 characters). |
| `latitude` | `float64` | Yes | WGS84 latitude coordinate (north-south position). |
| `lep1` | `string` | No | The primary Local Enterprise Partnership for this postcode. |
| `lep2` | `string` | No | The secondary Local Enterprise Partnership for this postcode, if it falls within overlapping LEP areas. |
| `longitude` | `float64` | Yes | WGS84 longitude coordinate (east-west position). |
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
| `result` | `[]any` | Yes | Array containing detailed location information for the requested postcode or nearest postcodes |
| `ruc11` | `string` | No | The 2011 Census Rural-Urban Classification for this postcode. |
| `ruc21` | `string` | No | The 2021 Census Rural-Urban Classification for this postcode. |
| `status` | `int` | Yes |  |
| `ttwa` | `string` | No | The Travel to Work Area for this postcode. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Postcode(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Postcode(nil).Load(map[string]any{"id": "postcode_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Postcode(nil).Create(map[string]any{
    "admin_county": "example_admin_county",
    "admin_district": "example_admin_district",
    "admin_ward": "example_admin_ward",
    "ccg": "example_ccg",
    "ced": "example_ced",
    "codes": map[string]any{},
    "country": "example_country",
    "eastings": 1,
    "european_electoral_region": "example_european_electoral_region",
    "incode": "example_incode",
    "latitude": 1,
    "longitude": 1,
    "lsoa": "example_lsoa",
    "msoa": "example_msoa",
    "nhs_ha": "example_nhs_ha",
    "northings": 1,
    "nuts": "example_nuts",
    "outcode": "example_outcode",
    "parish": "example_parish",
    "parliamentary_constituency": "example_parliamentary_constituency",
    "postcode": "example_postcode",
    "primary_care_trust": "example_primary_care_trust",
    "quality": 1,
    "region": "example_region",
    "result": []any{},
    "status": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PostcodeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ScottishPostcodeEntity

```go
scottishPostcode := client.ScottishPostcode(nil)
fmt.Println(scottishPostcode.GetName()) // "scottish_postcode"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `result` | `[]any` | Yes | Data for a given postcode |
| `status` | `int` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ScottishPostcode(nil).Load(map[string]any{"id": "scottish_postcode_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ScottishPostcodeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TerminatedPostcodeEntity

```go
terminatedPostcode := client.TerminatedPostcode(nil)
fmt.Println(terminatedPostcode.GetName()) // "terminated_postcode"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `result` | `[]any` | Yes | Data for a given postcode |
| `status` | `int` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.TerminatedPostcode(nil).Load(map[string]any{"id": "terminated_postcode_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TerminatedPostcodeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewPostcodesioSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

