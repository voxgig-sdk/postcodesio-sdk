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
| `result` | ``$ARRAY`` | Yes |  |
| `status` | ``$INTEGER`` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Nearest().list()
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

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | ``$ANY`` | Yes |  |
| `status` | ``$INTEGER`` | Yes |  |

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
| `result` | ``$OBJECT`` | Yes |  |
| `status` | ``$INTEGER`` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Postcode().create({
  result: /* `$OBJECT` */,
  status: /* `$INTEGER` */,
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
| `result` | ``$ARRAY`` | Yes |  |
| `status` | ``$INTEGER`` | Yes |  |

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
| `result` | ``$ARRAY`` | Yes |  |
| `status` | ``$INTEGER`` | Yes |  |

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

