# Postcodesio Golang SDK



The Golang SDK for the Postcodesio API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Nearest(nil)` — each with the same small set of operations (`List`, `Load`, `Create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
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
| `"result"` | Array of nearest postcodes sorted by distance |
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
| `"code"` | Unique identifier for the place record (persistent except for Section of Named/Numbered Roads) |
| `"country"` | Country within Great Britain (England, Scotland, or Wales) |
| `"county_unitary"` | County, Unitary Authority or Greater London Authority that contains this place |
| `"county_unitary_type"` | Type of administrative unit (e.g., County, UnitaryAuthority) |
| `"district_borough"` | District, Metropolitan District or London Borough containing this place |
| `"district_borough_type"` | Type of district/borough administrative unit |
| `"eastings"` | Ordnance Survey grid reference Easting (1m resolution, not available for Channel Islands/Isle of Man) |
| `"latitude"` | WGS84 latitude coordinate |
| `"local_type"` | Ordnance Survey classification (City, Town, Village, Hamlet, etc.) |
| `"longitude"` | WGS84 longitude coordinate |
| `"max_eastings"` | Eastern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `"max_northings"` | Northern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `"min_eastings"` | Western edge of the place's bounding box (Minimum Bounding Rectangle) |
| `"min_northings"` | Southern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `"name_1"` | Official name of the place (preserves original format, e.g., "The Pennines" not "Pennines, The") |
| `"name_1_lang"` | Language code for name_1 (cym=Welsh, eng=English, gla=Scottish Gaelic) |
| `"name_2"` | Alternative name in a different language |
| `"name_2_lang"` | Language code for name_2 (cym=Welsh, eng=English, gla=Scottish Gaelic) |
| `"northings"` | Ordnance Survey grid reference Northing (1m resolution, not available for Channel Islands/Isle of Man) |
| `"outcode"` | Postcode district (first part of the postcode) |
| `"region"` | European Region (formerly Government Office Region) containing this place |

Operations: List, Load.

API path: `/places`

#### Postcode

| Field | Description |
| --- | --- |
| `"admin_county"` | The administrative county for this postcode. |
| `"admin_district"` | The administrative district or unitary authority for this postcode. |
| `"admin_ward"` | The electoral/administrative ward for this postcode. |
| `"bua"` | The Built-up Area (2022) for this postcode. |
| `"cancer_alliance"` | The Cancer Alliance for this postcode. |
| `"ccg"` | NHS Clinical Commissioning Group responsible for planning healthcare services in England. |
| `"ced"` | The county electoral division for English postcodes. |
| `"codes"` | Contains the GSS (Government Statistical Service) codes for administrative areas. |
| `"country"` | The UK constituent country for this postcode (England, Scotland, Wales, Northern Ireland, Channel Islands, or Isle of Man). |
| `"date_of_introduction"` | The date the postcode was introduced in YYYYMM format. |
| `"eastings"` | The OS grid reference easting (X-coordinate) to 1 metre resolution. |
| `"european_electoral_region"` | The European Electoral Region for this postcode. |
| `"icb"` | The NHS Integrated Care Board responsible for healthcare planning in this area. |
| `"incode"` | The second part of a postcode after the space (always 3 characters). |
| `"latitude"` | WGS84 latitude coordinate (north-south position). |
| `"lep1"` | The primary Local Enterprise Partnership for this postcode. |
| `"lep2"` | The secondary Local Enterprise Partnership for this postcode, if it falls within overlapping LEP areas. |
| `"longitude"` | WGS84 longitude coordinate (east-west position). |
| `"lsoa"` | 2021 Census LSOA code (smaller statistical area, typically 1,000-1,500 residents). |
| `"lsoa11"` | 2011 Census LSOA code. |
| `"lsoa21"` | 2021 Census LSOA code. |
| `"msoa"` | 2021 Census MSOA code (mid-size statistical area, typically 5,000-7,000 residents). |
| `"msoa11"` | 2011 Census MSOA code. |
| `"msoa21"` | 2021 Census MSOA code. |
| `"national_park"` | The National Park this postcode falls within, if any. |
| `"nhs_ha"` | The NHS health authority area for this postcode. |
| `"nhs_region"` | The NHS England Region for this postcode. |
| `"northings"` | The OS grid reference northing (Y-coordinate) to 1 metre resolution. |
| `"nuts"` | Statistical geography code for international comparisons (formerly NUTS - Nomenclature of Units for Territorial Statistics). |
| `"oa21"` | 2021 Census Output Area code - the smallest census geography. |
| `"outcode"` | The first part of a postcode before the space (2-4 characters). |
| `"parish"` | The civil parish (England) or community (Wales) for this postcode. |
| `"parliamentary_constituency"` | The UK Parliamentary constituency for this postcode. |
| `"parliamentary_constituency_2024"` | The UK Parliamentary constituency for this postcode based on July 2024 boundaries. |
| `"pfa"` | The police force area for this postcode. |
| `"postcode"` | UK postcode format: 2-4 character outward code, a space, and a 3-character inward code (e.g., SW1A 2AA). |
| `"primary_care_trust"` | The healthcare administrative area for this postcode. |
| `"quality"` | Positional Quality Indicator (1-9). |
| `"region"` | The regional designation for this postcode (formerly Government Office Regions or GORs). |
| `"result"` | Array containing detailed location information for the requested postcode or nearest postcodes |
| `"ruc11"` | The 2011 Census Rural-Urban Classification for this postcode. |
| `"ruc21"` | The 2021 Census Rural-Urban Classification for this postcode. |
| `"status"` |  |
| `"ttwa"` | The Travel to Work Area for this postcode. |

Operations: Create, List, Load.

API path: `/postcodes`

#### ScottishPostcode

| Field | Description |
| --- | --- |
| `"result"` | Data for a given postcode |
| `"status"` |  |

Operations: Load.

API path: `/scotland/postcodes/{postcode}`

#### TerminatedPostcode

| Field | Description |
| --- | --- |
| `"result"` | Data for a given postcode |
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
| `result` | `[]any` | Array of nearest postcodes sorted by distance |
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
| `code` | `string` | Unique identifier for the place record (persistent except for Section of Named/Numbered Roads) |
| `country` | `string` | Country within Great Britain (England, Scotland, or Wales) |
| `county_unitary` | `string` | County, Unitary Authority or Greater London Authority that contains this place |
| `county_unitary_type` | `string` | Type of administrative unit (e.g., County, UnitaryAuthority) |
| `district_borough` | `string` | District, Metropolitan District or London Borough containing this place |
| `district_borough_type` | `string` | Type of district/borough administrative unit |
| `eastings` | `int` | Ordnance Survey grid reference Easting (1m resolution, not available for Channel Islands/Isle of Man) |
| `latitude` | `float64` | WGS84 latitude coordinate |
| `local_type` | `string` | Ordnance Survey classification (City, Town, Village, Hamlet, etc.) |
| `longitude` | `float64` | WGS84 longitude coordinate |
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
| `admin_county` | `string` | The administrative county for this postcode. |
| `admin_district` | `string` | The administrative district or unitary authority for this postcode. |
| `admin_ward` | `string` | The electoral/administrative ward for this postcode. |
| `bua` | `string` | The Built-up Area (2022) for this postcode. |
| `cancer_alliance` | `string` | The Cancer Alliance for this postcode. |
| `ccg` | `string` | NHS Clinical Commissioning Group responsible for planning healthcare services in England. |
| `ced` | `string` | The county electoral division for English postcodes. |
| `codes` | `map[string]any` | Contains the GSS (Government Statistical Service) codes for administrative areas. |
| `country` | `string` | The UK constituent country for this postcode (England, Scotland, Wales, Northern Ireland, Channel Islands, or Isle of Man). |
| `date_of_introduction` | `string` | The date the postcode was introduced in YYYYMM format. |
| `eastings` | `int` | The OS grid reference easting (X-coordinate) to 1 metre resolution. |
| `european_electoral_region` | `string` | The European Electoral Region for this postcode. |
| `icb` | `string` | The NHS Integrated Care Board responsible for healthcare planning in this area. |
| `incode` | `string` | The second part of a postcode after the space (always 3 characters). |
| `latitude` | `float64` | WGS84 latitude coordinate (north-south position). |
| `lep1` | `string` | The primary Local Enterprise Partnership for this postcode. |
| `lep2` | `string` | The secondary Local Enterprise Partnership for this postcode, if it falls within overlapping LEP areas. |
| `longitude` | `float64` | WGS84 longitude coordinate (east-west position). |
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
| `result` | `[]any` | Array containing detailed location information for the requested postcode or nearest postcodes |
| `ruc11` | `string` | The 2011 Census Rural-Urban Classification for this postcode. |
| `ruc21` | `string` | The 2021 Census Rural-Urban Classification for this postcode. |
| `status` | `int` |  |
| `ttwa` | `string` | The Travel to Work Area for this postcode. |

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
| `result` | `[]any` | Data for a given postcode |
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
| `result` | `[]any` | Data for a given postcode |
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
