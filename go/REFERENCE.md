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
| `result` | `[]any` | Yes |  |
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
| `code` | `string` | Yes |  |
| `country` | `string` | Yes |  |
| `county_unitary` | `string` | Yes |  |
| `county_unitary_type` | `string` | Yes |  |
| `district_borough` | `string` | Yes |  |
| `district_borough_type` | `string` | No |  |
| `eastings` | `int` | Yes |  |
| `latitude` | `float64` | Yes |  |
| `local_type` | `string` | Yes |  |
| `longitude` | `float64` | Yes |  |
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
| `admin_county` | `string` | Yes |  |
| `admin_district` | `string` | Yes |  |
| `admin_ward` | `string` | Yes |  |
| `bua` | `string` | No |  |
| `cancer_alliance` | `string` | No |  |
| `ccg` | `string` | Yes |  |
| `ced` | `string` | Yes |  |
| `codes` | `map[string]any` | Yes |  |
| `country` | `string` | Yes |  |
| `date_of_introduction` | `string` | No |  |
| `eastings` | `int` | Yes |  |
| `european_electoral_region` | `string` | Yes |  |
| `icb` | `string` | No |  |
| `incode` | `string` | Yes |  |
| `latitude` | `float64` | Yes |  |
| `lep1` | `string` | No |  |
| `lep2` | `string` | No |  |
| `longitude` | `float64` | Yes |  |
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
| `result` | `[]any` | Yes |  |
| `ruc11` | `string` | No |  |
| `ruc21` | `string` | No |  |
| `status` | `int` | Yes |  |
| `ttwa` | `string` | No |  |

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
| `result` | `[]any` | Yes |  |
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
| `result` | `[]any` | Yes |  |
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

