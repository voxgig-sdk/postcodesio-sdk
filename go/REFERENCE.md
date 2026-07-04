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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | ``$ARRAY`` | Yes |  |
| `status` | ``$INTEGER`` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Nearest(nil).List(nil, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | ``$ANY`` | Yes |  |
| `status` | ``$INTEGER`` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Outcode(nil).Load(map[string]any{"id": "outcode_id"}, nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Place(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Place(nil).Load(map[string]any{"id": "place_id"}, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | ``$OBJECT`` | Yes |  |
| `status` | ``$INTEGER`` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Postcode(nil).Create(map[string]any{
    "result": /* `$OBJECT` */,
    "status": /* `$INTEGER` */,
}, nil)
```

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Postcode(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Postcode(nil).Load(map[string]any{"id": "postcode_id"}, nil)
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
scottish_postcode := client.ScottishPostcode(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | ``$ARRAY`` | Yes |  |
| `status` | ``$INTEGER`` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ScottishPostcode(nil).Load(map[string]any{"id": "scottish_postcode_id"}, nil)
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
terminated_postcode := client.TerminatedPostcode(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | ``$ARRAY`` | Yes |  |
| `status` | ``$INTEGER`` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.TerminatedPostcode(nil).Load(map[string]any{"id": "terminated_postcode_id"}, nil)
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

