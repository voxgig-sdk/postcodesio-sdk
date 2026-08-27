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
| `result` | `any[]` | Yes | Array of nearest postcodes sorted by distance |
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

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

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
| `code` | `string` | Yes | Unique identifier for the place record (persistent except for Section of Named/Numbered Roads) |
| `country` | `string` | Yes | Country within Great Britain (England, Scotland, or Wales) |
| `county_unitary` | `string` | Yes | County, Unitary Authority or Greater London Authority that contains this place |
| `county_unitary_type` | `string` | Yes | Type of administrative unit (e.g., County, UnitaryAuthority) |
| `district_borough` | `string` | Yes | District, Metropolitan District or London Borough containing this place |
| `district_borough_type` | `string` | No | Type of district/borough administrative unit |
| `eastings` | `number` | Yes | Ordnance Survey grid reference Easting (1m resolution, not available for Channel Islands/Isle of Man) |
| `id` | `string` | No |  |
| `latitude` | `number` | Yes | WGS84 latitude coordinate |
| `local_type` | `string` | Yes | Ordnance Survey classification (City, Town, Village, Hamlet, etc.) |
| `longitude` | `number` | Yes | WGS84 longitude coordinate |
| `max_eastings` | `number` | Yes | Eastern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `max_northings` | `number` | Yes | Northern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `min_eastings` | `number` | Yes | Western edge of the place's bounding box (Minimum Bounding Rectangle) |
| `min_northings` | `number` | Yes | Southern edge of the place's bounding box (Minimum Bounding Rectangle) |
| `name_1` | `string` | Yes | Official name of the place (preserves original format, e.g., "The Pennines" not "Pennines, The") |
| `name_1_lang` | `string` | Yes | Language code for name_1 (cym=Welsh, eng=English, gla=Scottish Gaelic) |
| `name_2` | `string` | Yes | Alternative name in a different language |
| `name_2_lang` | `string` | Yes | Language code for name_2 (cym=Welsh, eng=English, gla=Scottish Gaelic) |
| `northings` | `number` | Yes | Ordnance Survey grid reference Northing (1m resolution, not available for Channel Islands/Isle of Man) |
| `outcode` | `string` | Yes | Postcode district (first part of the postcode) |
| `region` | `string` | Yes | European Region (formerly Government Office Region) containing this place |

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
| `admin_county` | `string` | Yes | The administrative county for this postcode. |
| `admin_district` | `string` | Yes | The administrative district or unitary authority for this postcode. |
| `admin_ward` | `string` | Yes | The electoral/administrative ward for this postcode. |
| `bua` | `string` | No | The Built-up Area (2022) for this postcode. |
| `cancer_alliance` | `string` | No | The Cancer Alliance for this postcode. |
| `ccg` | `string` | Yes | NHS Clinical Commissioning Group responsible for planning healthcare services in England. |
| `ced` | `string` | Yes | The county electoral division for English postcodes. |
| `codes` | `Record<string, any>` | Yes | Contains the GSS (Government Statistical Service) codes for administrative areas. |
| `country` | `string` | Yes | The UK constituent country for this postcode (England, Scotland, Wales, Northern Ireland, Channel Islands, or Isle of Man). |
| `date_of_introduction` | `string` | No | The date the postcode was introduced in YYYYMM format. |
| `eastings` | `number` | Yes | The OS grid reference easting (X-coordinate) to 1 metre resolution. |
| `european_electoral_region` | `string` | Yes | The European Electoral Region for this postcode. |
| `icb` | `string` | No | The NHS Integrated Care Board responsible for healthcare planning in this area. |
| `id` | `string` | No |  |
| `incode` | `string` | Yes | The second part of a postcode after the space (always 3 characters). |
| `latitude` | `number` | Yes | WGS84 latitude coordinate (north-south position). |
| `lep1` | `string` | No | The primary Local Enterprise Partnership for this postcode. |
| `lep2` | `string` | No | The secondary Local Enterprise Partnership for this postcode, if it falls within overlapping LEP areas. |
| `longitude` | `number` | Yes | WGS84 longitude coordinate (east-west position). |
| `lsoa` | `string` | Yes | 2021 Census LSOA code (smaller statistical area, typically 1,000-1,500 residents). |
| `lsoa11` | `string` | No | 2011 Census LSOA code. |
| `lsoa21` | `string` | No | 2021 Census LSOA code. |
| `msoa` | `string` | Yes | 2021 Census MSOA code (mid-size statistical area, typically 5,000-7,000 residents). |
| `msoa11` | `string` | No | 2011 Census MSOA code. |
| `msoa21` | `string` | No | 2021 Census MSOA code. |
| `national_park` | `string` | No | The National Park this postcode falls within, if any. |
| `nhs_ha` | `string` | Yes | The NHS health authority area for this postcode. |
| `nhs_region` | `string` | No | The NHS England Region for this postcode. |
| `northings` | `number` | Yes | The OS grid reference northing (Y-coordinate) to 1 metre resolution. |
| `nuts` | `string` | Yes | Statistical geography code for international comparisons (formerly NUTS - Nomenclature of Units for Territorial Statistics). |
| `oa21` | `string` | No | 2021 Census Output Area code - the smallest census geography. |
| `outcode` | `string` | Yes | The first part of a postcode before the space (2-4 characters). |
| `parish` | `string` | Yes | The civil parish (England) or community (Wales) for this postcode. |
| `parliamentary_constituency` | `string` | Yes | The UK Parliamentary constituency for this postcode. |
| `parliamentary_constituency_2024` | `string` | No | The UK Parliamentary constituency for this postcode based on July 2024 boundaries. |
| `pfa` | `string` | No | The police force area for this postcode. |
| `postcode` | `string` | Yes | UK postcode format: 2-4 character outward code, a space, and a 3-character inward code (e.g., SW1A 2AA). |
| `primary_care_trust` | `string` | Yes | The healthcare administrative area for this postcode. |
| `quality` | `number` | Yes | Positional Quality Indicator (1-9). |
| `region` | `string` | Yes | The regional designation for this postcode (formerly Government Office Regions or GORs). |
| `result` | `any[]` | Yes | Array containing detailed location information for the requested postcode or nearest postcodes |
| `ruc11` | `string` | No | The 2011 Census Rural-Urban Classification for this postcode. |
| `ruc21` | `string` | No | The 2021 Census Rural-Urban Classification for this postcode. |
| `status` | `number` | Yes |  |
| `ttwa` | `string` | No | The Travel to Work Area for this postcode. |

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
| `id` | `string` | No |  |
| `result` | `any[]` | Yes | Data for a given postcode |
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
| `id` | `string` | No |  |
| `result` | `any[]` | Yes | Data for a given postcode |
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

