# Postcodesio Golang SDK



The Golang SDK for the Postcodesio API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Nearest(nil)` — each with the same small set of operations (`List`, `Load`, `Create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/postcodesio-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/postcodesio-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/postcodesio-sdk/go=../postcodesio-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/postcodesio-sdk/go"
)

func main() {
    client := sdk.New()

    // List nearest records — the value is the array of records itself.
    nearests, err := client.Nearest(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range nearests.([]any) {
        fmt.Println(item)
    }
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
nearests, err := client.Nearest(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = nearests
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

nearest, err := client.Nearest(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(nearest) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewPostcodesioSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewPostcodesioSDK

```go
func NewPostcodesioSDK(options map[string]any) *PostcodesioSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *PostcodesioSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### PostcodesioSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Nearest` | `(data map[string]any) PostcodesioEntity` | Create a Nearest entity instance. |
| `Outcode` | `(data map[string]any) PostcodesioEntity` | Create an Outcode entity instance. |
| `Place` | `(data map[string]any) PostcodesioEntity` | Create a Place entity instance. |
| `Postcode` | `(data map[string]any) PostcodesioEntity` | Create a Postcode entity instance. |
| `ScottishPostcode` | `(data map[string]any) PostcodesioEntity` | Create a ScottishPostcode entity instance. |
| `TerminatedPostcode` | `(data map[string]any) PostcodesioEntity` | Create a TerminatedPostcode entity instance. |

### Entity interface (PostcodesioEntity)

All entities implement the `PostcodesioEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    nearest, err := client.Nearest(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // nearest is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Nearest

| Field | Description |
| --- | --- |
| `"result"` |  |
| `"status"` |  |

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
| `"code"` |  |
| `"country"` |  |
| `"county_unitary"` |  |
| `"county_unitary_type"` |  |
| `"district_borough"` |  |
| `"district_borough_type"` |  |
| `"eastings"` |  |
| `"latitude"` |  |
| `"local_type"` |  |
| `"longitude"` |  |
| `"max_eastings"` |  |
| `"max_northings"` |  |
| `"min_eastings"` |  |
| `"min_northings"` |  |
| `"name_1"` |  |
| `"name_1_lang"` |  |
| `"name_2"` |  |
| `"name_2_lang"` |  |
| `"northings"` |  |
| `"outcode"` |  |
| `"region"` |  |

Operations: List, Load.

API path: `/places`

#### Postcode

| Field | Description |
| --- | --- |
| `"admin_county"` |  |
| `"admin_district"` |  |
| `"admin_ward"` |  |
| `"bua"` |  |
| `"cancer_alliance"` |  |
| `"ccg"` |  |
| `"ced"` |  |
| `"codes"` |  |
| `"country"` |  |
| `"date_of_introduction"` |  |
| `"eastings"` |  |
| `"european_electoral_region"` |  |
| `"icb"` |  |
| `"incode"` |  |
| `"latitude"` |  |
| `"lep1"` |  |
| `"lep2"` |  |
| `"longitude"` |  |
| `"lsoa"` |  |
| `"lsoa11"` |  |
| `"lsoa21"` |  |
| `"msoa"` |  |
| `"msoa11"` |  |
| `"msoa21"` |  |
| `"national_park"` |  |
| `"nhs_ha"` |  |
| `"nhs_region"` |  |
| `"northings"` |  |
| `"nuts"` |  |
| `"oa21"` |  |
| `"outcode"` |  |
| `"parish"` |  |
| `"parliamentary_constituency"` |  |
| `"parliamentary_constituency_2024"` |  |
| `"pfa"` |  |
| `"postcode"` |  |
| `"primary_care_trust"` |  |
| `"quality"` |  |
| `"region"` |  |
| `"result"` |  |
| `"ruc11"` |  |
| `"ruc21"` |  |
| `"status"` |  |
| `"ttwa"` |  |

Operations: Create, List, Load.

API path: `/postcodes`

#### ScottishPostcode

| Field | Description |
| --- | --- |
| `"result"` |  |
| `"status"` |  |

Operations: Load.

API path: `/scotland/postcodes/{postcode}`

#### TerminatedPostcode

| Field | Description |
| --- | --- |
| `"result"` |  |
| `"status"` |  |

Operations: Load.

API path: `/terminated_postcodes/{postcode}`



## Entities


### Nearest

Create an instance: `nearest := client.Nearest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | `[]any` |  |
| `status` | `int` |  |

#### Example: List

```go
nearests, err := client.Nearest(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(nearests) // the array of records
```


### Outcode

Create an instance: `outcode := client.Outcode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
outcode, err := client.Outcode(nil).Load(map[string]any{"id": "outcode_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(outcode) // the loaded record
```


### Place

Create an instance: `place := client.Place(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` |  |
| `country` | `string` |  |
| `county_unitary` | `string` |  |
| `county_unitary_type` | `string` |  |
| `district_borough` | `string` |  |
| `district_borough_type` | `string` |  |
| `eastings` | `int` |  |
| `latitude` | `float64` |  |
| `local_type` | `string` |  |
| `longitude` | `float64` |  |
| `max_eastings` | `int` |  |
| `max_northings` | `int` |  |
| `min_eastings` | `int` |  |
| `min_northings` | `int` |  |
| `name_1` | `string` |  |
| `name_1_lang` | `string` |  |
| `name_2` | `string` |  |
| `name_2_lang` | `string` |  |
| `northings` | `int` |  |
| `outcode` | `string` |  |
| `region` | `string` |  |

#### Example: Load

```go
place, err := client.Place(nil).Load(map[string]any{"id": "place_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(place) // the loaded record
```

#### Example: List

```go
places, err := client.Place(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(places) // the array of records
```


### Postcode

Create an instance: `postcode := client.Postcode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin_county` | `string` |  |
| `admin_district` | `string` |  |
| `admin_ward` | `string` |  |
| `bua` | `string` |  |
| `cancer_alliance` | `string` |  |
| `ccg` | `string` |  |
| `ced` | `string` |  |
| `codes` | `map[string]any` |  |
| `country` | `string` |  |
| `date_of_introduction` | `string` |  |
| `eastings` | `int` |  |
| `european_electoral_region` | `string` |  |
| `icb` | `string` |  |
| `incode` | `string` |  |
| `latitude` | `float64` |  |
| `lep1` | `string` |  |
| `lep2` | `string` |  |
| `longitude` | `float64` |  |
| `lsoa` | `string` |  |
| `lsoa11` | `string` |  |
| `lsoa21` | `string` |  |
| `msoa` | `string` |  |
| `msoa11` | `string` |  |
| `msoa21` | `string` |  |
| `national_park` | `string` |  |
| `nhs_ha` | `string` |  |
| `nhs_region` | `string` |  |
| `northings` | `int` |  |
| `nuts` | `string` |  |
| `oa21` | `string` |  |
| `outcode` | `string` |  |
| `parish` | `string` |  |
| `parliamentary_constituency` | `string` |  |
| `parliamentary_constituency_2024` | `string` |  |
| `pfa` | `string` |  |
| `postcode` | `string` |  |
| `primary_care_trust` | `string` |  |
| `quality` | `int` |  |
| `region` | `string` |  |
| `result` | `[]any` |  |
| `ruc11` | `string` |  |
| `ruc21` | `string` |  |
| `status` | `int` |  |
| `ttwa` | `string` |  |

#### Example: Load

```go
postcode, err := client.Postcode(nil).Load(map[string]any{"id": "postcode_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(postcode) // the loaded record
```

#### Example: List

```go
postcodes, err := client.Postcode(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(postcodes) // the array of records
```

#### Example: Create

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


### ScottishPostcode

Create an instance: `scottishPostcode := client.ScottishPostcode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | `[]any` |  |
| `status` | `int` |  |

#### Example: Load

```go
scottishPostcode, err := client.ScottishPostcode(nil).Load(map[string]any{"id": "scottish_postcode_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(scottishPostcode) // the loaded record
```


### TerminatedPostcode

Create an instance: `terminatedPostcode := client.TerminatedPostcode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | `[]any` |  |
| `status` | `int` |  |

#### Example: Load

```go
terminatedPostcode, err := client.TerminatedPostcode(nil).Load(map[string]any{"id": "terminated_postcode_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(terminatedPostcode) // the loaded record
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/postcodesio-sdk/go/
├── postcodesio.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/postcodesio-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
nearest := client.Nearest(nil)
nearest.List(nil, nil)

// nearest.Data() now returns the nearest data from the last list
// nearest.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
