# Postcodesio Ruby SDK



The Ruby SDK for the Postcodesio API — an entity-oriented client using idiomatic Ruby conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/postcodesio-sdk/releases](https://github.com/voxgig-sdk/postcodesio-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Postcodesio_sdk"

client = PostcodesioSDK.new
```

### 2. List nearests

```ruby
begin
  result = client.nearest.list
  if result.is_a?(Array)
    result.each do |item|
      d = item.data_get
      puts "#{d["id"]} #{d["name"]}"
    end
  end
rescue => err
  warn "list failed: #{err}"
end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  warn result["err"]
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = PostcodesioSDK.test

result = client.nearest.load({ "id" => "test01" })
# result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = PostcodesioSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### PostcodesioSDK

```ruby
require_relative "Postcodesio_sdk"
client = PostcodesioSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = PostcodesioSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### PostcodesioSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Nearest` | `(data) -> NearestEntity` | Create a Nearest entity instance. |
| `Outcode` | `(data) -> OutcodeEntity` | Create a Outcode entity instance. |
| `Place` | `(data) -> PlaceEntity` | Create a Place entity instance. |
| `Postcode` | `(data) -> PostcodeEntity` | Create a Postcode entity instance. |
| `ScottishPostcode` | `(data) -> ScottishPostcodeEntity` | Create a ScottishPostcode entity instance. |
| `TerminatedPostcode` | `(data) -> TerminatedPostcodeEntity` | Create a TerminatedPostcode entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> Array` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `PostcodesioError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Nearest

| Field | Description |
| --- | --- |
| `result` |  |
| `status` |  |

Operations: List.

API path: `/postcodes/{postcode}/nearest`

#### Outcode

| Field | Description |
| --- | --- |
| `result` |  |
| `status` |  |

Operations: Load.

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
| `easting` |  |
| `latitude` |  |
| `local_type` |  |
| `longitude` |  |
| `max_easting` |  |
| `max_northing` |  |
| `min_easting` |  |
| `min_northing` |  |
| `name_1` |  |
| `name_1_lang` |  |
| `name_2` |  |
| `name_2_lang` |  |
| `northing` |  |
| `outcode` |  |
| `region` |  |
| `result` |  |
| `status` |  |

Operations: List, Load.

API path: `/places`

#### Postcode

| Field | Description |
| --- | --- |
| `result` |  |
| `status` |  |

Operations: Create, List, Load.

API path: `/postcodes`

#### ScottishPostcode

| Field | Description |
| --- | --- |
| `result` |  |
| `status` |  |

Operations: Load.

API path: `/scotland/postcodes/{postcode}`

#### TerminatedPostcode

| Field | Description |
| --- | --- |
| `result` |  |
| `status` |  |

Operations: Load.

API path: `/terminated_postcodes/{postcode}`



## Entities


### Nearest

Create an instance: `const nearest = client.nearest`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | ``$ARRAY`` |  |
| `status` | ``$INTEGER`` |  |

#### Example: List

```ts
const nearests = await client.nearest.list()
```


### Outcode

Create an instance: `const outcode = client.outcode`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | ``$ANY`` |  |
| `status` | ``$INTEGER`` |  |

#### Example: Load

```ts
const outcode = await client.outcode.load({ id: 'outcode_id' })
```


### Place

Create an instance: `const place = client.place`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | ``$STRING`` |  |
| `country` | ``$STRING`` |  |
| `county_unitary` | ``$STRING`` |  |
| `county_unitary_type` | ``$STRING`` |  |
| `district_borough` | ``$STRING`` |  |
| `district_borough_type` | ``$STRING`` |  |
| `easting` | ``$INTEGER`` |  |
| `latitude` | ``$NUMBER`` |  |
| `local_type` | ``$STRING`` |  |
| `longitude` | ``$NUMBER`` |  |
| `max_easting` | ``$INTEGER`` |  |
| `max_northing` | ``$INTEGER`` |  |
| `min_easting` | ``$INTEGER`` |  |
| `min_northing` | ``$INTEGER`` |  |
| `name_1` | ``$STRING`` |  |
| `name_1_lang` | ``$STRING`` |  |
| `name_2` | ``$STRING`` |  |
| `name_2_lang` | ``$STRING`` |  |
| `northing` | ``$INTEGER`` |  |
| `outcode` | ``$STRING`` |  |
| `region` | ``$STRING`` |  |
| `result` | ``$OBJECT`` |  |
| `status` | ``$INTEGER`` |  |

#### Example: Load

```ts
const place = await client.place.load({ id: 'place_id' })
```

#### Example: List

```ts
const places = await client.place.list()
```


### Postcode

Create an instance: `const postcode = client.postcode`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | ``$OBJECT`` |  |
| `status` | ``$INTEGER`` |  |

#### Example: Load

```ts
const postcode = await client.postcode.load({ id: 'postcode_id' })
```

#### Example: List

```ts
const postcodes = await client.postcode.list()
```

#### Example: Create

```ts
const postcode = await client.postcode.create({
  result: /* `$OBJECT` */,
  status: /* `$INTEGER` */,
})
```


### ScottishPostcode

Create an instance: `const scottish_postcode = client.scottish_postcode`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | ``$ARRAY`` |  |
| `status` | ``$INTEGER`` |  |

#### Example: Load

```ts
const scottish_postcode = await client.scottish_postcode.load({ id: 'scottish_postcode_id' })
```


### TerminatedPostcode

Create an instance: `const terminated_postcode = client.terminated_postcode`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | ``$ARRAY`` |  |
| `status` | ``$INTEGER`` |  |

#### Example: Load

```ts
const terminated_postcode = await client.terminated_postcode.load({ id: 'terminated_postcode_id' })
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as a second return value.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Postcodesio_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Postcodesio_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
nearest = client.nearest
nearest.load({ "id" => "example_id" })

# nearest.data_get now returns the loaded nearest data
# nearest.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
