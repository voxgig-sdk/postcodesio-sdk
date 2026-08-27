# Postcodesio TypeScript SDK



The TypeScript SDK for the Postcodesio API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Nearest()` — each with a small set of operations (`list`, `load`, `create`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/postcodesio-sdk/releases](https://github.com/voxgig-sdk/postcodesio-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { PostcodesioSDK } from '@voxgig-sdk/postcodesio'

const client = new PostcodesioSDK()
```

### 2. List nearest records

`list()` resolves to an array of Nearest ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const nearests = await client.Nearest().list({ postcode_id: "example" })

for (const nearest of nearests) {
  console.log(nearest)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const nearests = await client.Nearest().list()
  console.log(nearests)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = PostcodesioSDK.test()

const nearest = await client.Nearest().list()
// nearest is the entity, populated with mock response data
// — call nearest.data() for the record itself
console.log(nearest)
```

You can also use the instance method:

```ts
const client = new PostcodesioSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Nearest()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new PostcodesioSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
POSTCODESIO_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### PostcodesioSDK

#### Constructor

```ts
new PostcodesioSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Nearest(data?)` | `NearestEntity` | Create a Nearest entity instance. |
| `Outcode(data?)` | `OutcodeEntity` | Create an Outcode entity instance. |
| `Place(data?)` | `PlaceEntity` | Create a Place entity instance. |
| `Postcode(data?)` | `PostcodeEntity` | Create a Postcode entity instance. |
| `ScottishPostcode(data?)` | `ScottishPostcodeEntity` | Create a ScottishPostcode entity instance. |
| `TerminatedPostcode(data?)` | `TerminatedPostcodeEntity` | Create a TerminatedPostcode entity instance. |
| `tester(testopts?, sdkopts?)` | `PostcodesioSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `PostcodesioSDK.test(testopts?, sdkopts?)` | `PostcodesioSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): PostcodesioSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` and `create` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Nearest

| Field | Description |
| --- | --- |
| `result` | Array of nearest postcodes sorted by distance |
| `status` |  |

Operations: list.

API path: `/postcodes/{postcode}/nearest`

#### Outcode

| Field | Description |
| --- | --- |
| `id` |  |

Operations: load.

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
| `id` |  |
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

Operations: list, load.

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
| `id` |  |
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

Operations: create, list, load.

API path: `/postcodes`

#### ScottishPostcode

| Field | Description |
| --- | --- |
| `id` |  |
| `result` | Data for a given postcode |
| `status` |  |

Operations: load.

API path: `/scotland/postcodes/{postcode}`

#### TerminatedPostcode

| Field | Description |
| --- | --- |
| `id` |  |
| `result` | Data for a given postcode |
| `status` |  |

Operations: load.

API path: `/terminated_postcodes/{postcode}`



## Entities


### Nearest

Create an instance: `const nearest = client.Nearest()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | `any[]` | Array of nearest postcodes sorted by distance |
| `status` | `number` |  |

#### Example: List

```ts
const nearests = await client.Nearest().list({ postcode_id: "example" })
```


### Outcode

Create an instance: `const outcode = client.Outcode()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```ts
const outcode = await client.Outcode().load({ id: 'outcode_id' })
```


### Place

Create an instance: `const place = client.Place()`

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
| `eastings` | `number` | Ordnance Survey grid reference Easting (1m resolution, not available for Channel Islands/Isle of Man) |
| `id` | `string` |  |
| `latitude` | `number` | WGS84 latitude coordinate |
| `local_type` | `string` | Ordnance Survey classification (City, Town, Village, Hamlet, etc.) |
| `longitude` | `number` | WGS84 longitude coordinate |
| `max_eastings` | `number` | Eastern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `max_northings` | `number` | Northern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `min_eastings` | `number` | Western edge of the place's bounding box (Minimum Bounding Rectangle) |
| `min_northings` | `number` | Southern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `name_1` | `string` | Official name of the place (preserves original format, e.g., "The Pennines" not "Pennines, The") |
| `name_1_lang` | `string` | Language code for name_1 (cym=Welsh, eng=English, gla=Scottish Gaelic) |
| `name_2` | `string` | Alternative name in a different language |
| `name_2_lang` | `string` | Language code for name_2 (cym=Welsh, eng=English, gla=Scottish Gaelic) |
| `northings` | `number` | Ordnance Survey grid reference Northing (1m resolution, not available for Channel Islands/Isle of Man) |
| `outcode` | `string` | Postcode district (first part of the postcode) |
| `region` | `string` | European Region (formerly Government Office Region) containing this place |

#### Example: Load

```ts
const place = await client.Place().load({ id: 'place_id' })
```

#### Example: List

```ts
const places = await client.Place().list()
```


### Postcode

Create an instance: `const postcode = client.Postcode()`

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
| `codes` | `Record<string, any>` | Contains the GSS (Government Statistical Service) codes for administrative areas. |
| `country` | `string` | The UK constituent country for this postcode (England, Scotland, Wales, Northern Ireland, Channel Islands, or Isle of Man). |
| `date_of_introduction` | `string` | The date the postcode was introduced in YYYYMM format. |
| `eastings` | `number` | The OS grid reference easting (X-coordinate) to 1 metre resolution. |
| `european_electoral_region` | `string` | The European Electoral Region for this postcode. |
| `icb` | `string` | The NHS Integrated Care Board responsible for healthcare planning in this area. |
| `id` | `string` |  |
| `incode` | `string` | The second part of a postcode after the space (always 3 characters). |
| `latitude` | `number` | WGS84 latitude coordinate (north-south position). |
| `lep1` | `string` | The primary Local Enterprise Partnership for this postcode. |
| `lep2` | `string` | The secondary Local Enterprise Partnership for this postcode, if it falls within overlapping LEP areas. |
| `longitude` | `number` | WGS84 longitude coordinate (east-west position). |
| `lsoa` | `string` | 2021 Census LSOA code (smaller statistical area, typically 1,000-1,500 residents). |
| `lsoa11` | `string` | 2011 Census LSOA code. |
| `lsoa21` | `string` | 2021 Census LSOA code. |
| `msoa` | `string` | 2021 Census MSOA code (mid-size statistical area, typically 5,000-7,000 residents). |
| `msoa11` | `string` | 2011 Census MSOA code. |
| `msoa21` | `string` | 2021 Census MSOA code. |
| `national_park` | `string` | The National Park this postcode falls within, if any. |
| `nhs_ha` | `string` | The NHS health authority area for this postcode. |
| `nhs_region` | `string` | The NHS England Region for this postcode. |
| `northings` | `number` | The OS grid reference northing (Y-coordinate) to 1 metre resolution. |
| `nuts` | `string` | Statistical geography code for international comparisons (formerly NUTS - Nomenclature of Units for Territorial Statistics). |
| `oa21` | `string` | 2021 Census Output Area code - the smallest census geography. |
| `outcode` | `string` | The first part of a postcode before the space (2-4 characters). |
| `parish` | `string` | The civil parish (England) or community (Wales) for this postcode. |
| `parliamentary_constituency` | `string` | The UK Parliamentary constituency for this postcode. |
| `parliamentary_constituency_2024` | `string` | The UK Parliamentary constituency for this postcode based on July 2024 boundaries. |
| `pfa` | `string` | The police force area for this postcode. |
| `postcode` | `string` | UK postcode format: 2-4 character outward code, a space, and a 3-character inward code (e.g., SW1A 2AA). |
| `primary_care_trust` | `string` | The healthcare administrative area for this postcode. |
| `quality` | `number` | Positional Quality Indicator (1-9). |
| `region` | `string` | The regional designation for this postcode (formerly Government Office Regions or GORs). |
| `result` | `any[]` | Array containing detailed location information for the requested postcode or nearest postcodes |
| `ruc11` | `string` | The 2011 Census Rural-Urban Classification for this postcode. |
| `ruc21` | `string` | The 2021 Census Rural-Urban Classification for this postcode. |
| `status` | `number` |  |
| `ttwa` | `string` | The Travel to Work Area for this postcode. |

#### Example: Load

```ts
const postcode = await client.Postcode().load({ id: 'postcode_id' })
```

#### Example: List

```ts
const postcodes = await client.Postcode().list()
```

#### Example: Create

```ts
const postcode = await client.Postcode().create({
  admin_county: 'example_admin_county',
  admin_district: 'example_admin_district',
  admin_ward: 'example_admin_ward',
  ccg: 'example_ccg',
  ced: 'example_ced',
  codes: {},
  country: 'example_country',
  eastings: 1,
  european_electoral_region: 'example_european_electoral_region',
  incode: 'example_incode',
  latitude: 1,
  longitude: 1,
  lsoa: 'example_lsoa',
  msoa: 'example_msoa',
  nhs_ha: 'example_nhs_ha',
  northings: 1,
  nuts: 'example_nuts',
  outcode: 'example_outcode',
  parish: 'example_parish',
  parliamentary_constituency: 'example_parliamentary_constituency',
  postcode: 'example_postcode',
  primary_care_trust: 'example_primary_care_trust',
  quality: 1,
  region: 'example_region',
  result: [],
  status: 1,
})
```


### ScottishPostcode

Create an instance: `const scottish_postcode = client.ScottishPostcode()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `result` | `any[]` | Data for a given postcode |
| `status` | `number` |  |

#### Example: Load

```ts
const scottish_postcode = await client.ScottishPostcode().load({ id: 'scottish_postcode_id' })
```


### TerminatedPostcode

Create an instance: `const terminated_postcode = client.TerminatedPostcode()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `result` | `any[]` | Data for a given postcode |
| `status` | `number` |  |

#### Example: Load

```ts
const terminated_postcode = await client.TerminatedPostcode().load({ id: 'terminated_postcode_id' })
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
postcodesio/
├── src/
│   ├── PostcodesioSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { PostcodesioSDK } from '@voxgig-sdk/postcodesio'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const nearest = client.Nearest()
await nearest.list()

// nearest.data() now returns the nearest data from the last `list`
// nearest.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
