# Postcodesio TypeScript SDK



The TypeScript SDK for the Postcodesio API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Nearest()` — each with a small set of operations (`list`, `load`, `create`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
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
| `result` |  |
| `status` |  |

Operations: list.

API path: `/postcodes/{postcode}/nearest`

#### Outcode

| Field | Description |
| --- | --- |

Operations: load.

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

Operations: list, load.

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

Operations: create, list, load.

API path: `/postcodes`

#### ScottishPostcode

| Field | Description |
| --- | --- |
| `result` |  |
| `status` |  |

Operations: load.

API path: `/scotland/postcodes/{postcode}`

#### TerminatedPostcode

| Field | Description |
| --- | --- |
| `result` |  |
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
| `result` | `any[]` |  |
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
| `code` | `string` |  |
| `country` | `string` |  |
| `county_unitary` | `string` |  |
| `county_unitary_type` | `string` |  |
| `district_borough` | `string` |  |
| `district_borough_type` | `string` |  |
| `eastings` | `number` |  |
| `latitude` | `number` |  |
| `local_type` | `string` |  |
| `longitude` | `number` |  |
| `max_eastings` | `number` |  |
| `max_northings` | `number` |  |
| `min_eastings` | `number` |  |
| `min_northings` | `number` |  |
| `name_1` | `string` |  |
| `name_1_lang` | `string` |  |
| `name_2` | `string` |  |
| `name_2_lang` | `string` |  |
| `northings` | `number` |  |
| `outcode` | `string` |  |
| `region` | `string` |  |

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
| `admin_county` | `string` |  |
| `admin_district` | `string` |  |
| `admin_ward` | `string` |  |
| `bua` | `string` |  |
| `cancer_alliance` | `string` |  |
| `ccg` | `string` |  |
| `ced` | `string` |  |
| `codes` | `Record<string, any>` |  |
| `country` | `string` |  |
| `date_of_introduction` | `string` |  |
| `eastings` | `number` |  |
| `european_electoral_region` | `string` |  |
| `icb` | `string` |  |
| `incode` | `string` |  |
| `latitude` | `number` |  |
| `lep1` | `string` |  |
| `lep2` | `string` |  |
| `longitude` | `number` |  |
| `lsoa` | `string` |  |
| `lsoa11` | `string` |  |
| `lsoa21` | `string` |  |
| `msoa` | `string` |  |
| `msoa11` | `string` |  |
| `msoa21` | `string` |  |
| `national_park` | `string` |  |
| `nhs_ha` | `string` |  |
| `nhs_region` | `string` |  |
| `northings` | `number` |  |
| `nuts` | `string` |  |
| `oa21` | `string` |  |
| `outcode` | `string` |  |
| `parish` | `string` |  |
| `parliamentary_constituency` | `string` |  |
| `parliamentary_constituency_2024` | `string` |  |
| `pfa` | `string` |  |
| `postcode` | `string` |  |
| `primary_care_trust` | `string` |  |
| `quality` | `number` |  |
| `region` | `string` |  |
| `result` | `any[]` |  |
| `ruc11` | `string` |  |
| `ruc21` | `string` |  |
| `status` | `number` |  |
| `ttwa` | `string` |  |

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
| `result` | `any[]` |  |
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
| `result` | `any[]` |  |
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
