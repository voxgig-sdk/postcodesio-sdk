# Postcodesio TypeScript SDK Reference

Complete API reference for the Postcodesio TypeScript SDK.


## PostcodesioSDK

### Constructor

```ts
new PostcodesioSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `PostcodesioSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = PostcodesioSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `PostcodesioSDK` instance in test mode.


### Instance Methods

#### `Nearest(data?: object)`

Create a new `Nearest` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NearestEntity` instance.

#### `Outcode(data?: object)`

Create a new `Outcode` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OutcodeEntity` instance.

#### `Place(data?: object)`

Create a new `Place` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PlaceEntity` instance.

#### `Postcode(data?: object)`

Create a new `Postcode` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PostcodeEntity` instance.

#### `ScottishPostcode(data?: object)`

Create a new `ScottishPostcode` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ScottishPostcodeEntity` instance.

#### `TerminatedPostcode(data?: object)`

Create a new `TerminatedPostcode` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TerminatedPostcodeEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `PostcodesioSDK.test()`.

**Returns:** `PostcodesioSDK` instance in test mode.


---

## NearestEntity

```ts
const nearest = client.Nearest()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | `any[]` | Yes |  |
| `status` | `number` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Nearest().list({ postcode_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NearestEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostcodesioSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OutcodeEntity

```ts
const outcode = client.Outcode()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Outcode().load({ id: 'outcode_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OutcodeEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostcodesioSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PlaceEntity

```ts
const place = client.Place()
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
| `eastings` | `number` | Yes |  |
| `latitude` | `number` | Yes |  |
| `local_type` | `string` | Yes |  |
| `longitude` | `number` | Yes |  |
| `max_eastings` | `number` | Yes |  |
| `max_northings` | `number` | Yes |  |
| `min_eastings` | `number` | Yes |  |
| `min_northings` | `number` | Yes |  |
| `name_1` | `string` | Yes |  |
| `name_1_lang` | `string` | Yes |  |
| `name_2` | `string` | Yes |  |
| `name_2_lang` | `string` | Yes |  |
| `northings` | `number` | Yes |  |
| `outcode` | `string` | Yes |  |
| `region` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Place().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Place().load({ id: 'place_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PlaceEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostcodesioSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PostcodeEntity

```ts
const postcode = client.Postcode()
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
| `codes` | `Record<string, any>` | Yes |  |
| `country` | `string` | Yes |  |
| `date_of_introduction` | `string` | No |  |
| `eastings` | `number` | Yes |  |
| `european_electoral_region` | `string` | Yes |  |
| `icb` | `string` | No |  |
| `incode` | `string` | Yes |  |
| `latitude` | `number` | Yes |  |
| `lep1` | `string` | No |  |
| `lep2` | `string` | No |  |
| `longitude` | `number` | Yes |  |
| `lsoa` | `string` | Yes |  |
| `lsoa11` | `string` | No |  |
| `lsoa21` | `string` | No |  |
| `msoa` | `string` | Yes |  |
| `msoa11` | `string` | No |  |
| `msoa21` | `string` | No |  |
| `national_park` | `string` | No |  |
| `nhs_ha` | `string` | Yes |  |
| `nhs_region` | `string` | No |  |
| `northings` | `number` | Yes |  |
| `nuts` | `string` | Yes |  |
| `oa21` | `string` | No |  |
| `outcode` | `string` | Yes |  |
| `parish` | `string` | Yes |  |
| `parliamentary_constituency` | `string` | Yes |  |
| `parliamentary_constituency_2024` | `string` | No |  |
| `pfa` | `string` | No |  |
| `postcode` | `string` | Yes |  |
| `primary_care_trust` | `string` | Yes |  |
| `quality` | `number` | Yes |  |
| `region` | `string` | Yes |  |
| `result` | `any[]` | Yes |  |
| `ruc11` | `string` | No |  |
| `ruc21` | `string` | No |  |
| `status` | `number` | Yes |  |
| `ttwa` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Postcode().create({
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Postcode().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Postcode().load({ id: 'postcode_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PostcodeEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostcodesioSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ScottishPostcodeEntity

```ts
const scottish_postcode = client.ScottishPostcode()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | `any[]` | Yes |  |
| `status` | `number` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ScottishPostcode().load({ id: 'scottish_postcode_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ScottishPostcodeEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostcodesioSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TerminatedPostcodeEntity

```ts
const terminated_postcode = client.TerminatedPostcode()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | `any[]` | Yes |  |
| `status` | `number` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.TerminatedPostcode().load({ id: 'terminated_postcode_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TerminatedPostcodeEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostcodesioSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new PostcodesioSDK({
  feature: {
    test: { active: true },
  }
})
```

