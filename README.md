# Postcodesio SDK

Look up, validate and geocode UK postcodes with administrative and geospatial data, no API key required

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About API Reference - Postcodes.io

[Postcodes.io](https://postcodes.io) is a free, open-source UK postcode lookup and geocoder. It is maintained by the team behind the commercial [Ideal Postcodes](https://ideal-postcodes.co.uk) service, but the public API at `https://api.postcodes.io` is freely usable with no authentication.

What you can do with the API:

- Validate UK postcodes and look up their full record (latitude/longitude, administrative areas, parliamentary constituency, NHS region, etc.)
- Reverse-geocode coordinates to find the nearest postcodes
- Resolve outward codes (the first half of a postcode) to administrative geography
- Look up places (populated areas / settlements) by code or name
- Check terminated and Scottish-specific postcode records
- Pick a random postcode for testing or seeding data

The API is CORS-enabled so it can be called directly from browsers. Data is refreshed from official UK sources (Ordnance Survey, ONS) as updates are released. No API key, OAuth, or registration is required for the public endpoint.

## Try it

**TypeScript**
```bash
npm install postcodesio
```

**Python**
```bash
pip install postcodesio-sdk
```

**PHP**
```bash
composer require voxgig/postcodesio-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/postcodesio-sdk/go
```

**Ruby**
```bash
gem install postcodesio-sdk
```

**Lua**
```bash
luarocks install postcodesio-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { PostcodesioSDK } from 'postcodesio'

const client = new PostcodesioSDK({})

// List all nearests
const nearests = await client.Nearest().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o postcodesio-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "postcodesio": {
      "command": "/abs/path/to/postcodesio-mcp"
    }
  }
}
```

## Entities

The API exposes 6 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Nearest** | Reverse-geocoding helpers that return the nearest postcodes to a given postcode or coordinate, typically under `/postcodes/{postcode}/nearest` and `/postcodes?lon=&lat=`. | `/postcodes/{postcode}/nearest` |
| **Outcode** | The outward (first half) part of a UK postcode, resolved to its administrative geography and centroid via `/outcodes/{outcode}`. | `/outcodes/{outcode}` |
| **Place** | Populated places / settlements from the OS Open Names dataset, searchable via `/places` and retrievable by code at `/places/{code}`. | `/places` |
| **Postcode** | A full UK postcode record with location, administrative areas and codes; looked up at `/postcodes/{postcode}` with bulk and validation variants. | `/postcodes` |
| **ScottishPostcode** | Scottish-specific postcode data including the Scottish Parliamentary Constituency, exposed via `/scotland/postcodes/{postcode}`. | `/scotland/postcodes/{postcode}` |
| **TerminatedPostcode** | Records for postcodes that have been retired by Royal Mail, available at `/terminated_postcodes/{postcode}`. | `/terminated_postcodes/{postcode}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from postcodesio_sdk import PostcodesioSDK

client = PostcodesioSDK({})

# List all nearests
nearests, err = client.Nearest(None).list(None, None)
```

### PHP

```php
<?php
require_once 'postcodesio_sdk.php';

$client = new PostcodesioSDK([]);

// List all nearests
[$nearests, $err] = $client->Nearest(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/postcodesio-sdk/go"

client := sdk.NewPostcodesioSDK(map[string]any{})

// List all nearests
nearests, err := client.Nearest(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Postcodesio_sdk"

client = PostcodesioSDK.new({})

# List all nearests
nearests, err = client.Nearest(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("postcodesio_sdk")

local client = sdk.new({})

-- List all nearests
local nearests, err = client:Nearest(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = PostcodesioSDK.test()
const result = await client.Nearest().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = PostcodesioSDK.test(None, None)
result, err = client.Nearest(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = PostcodesioSDK::test(null, null);
[$result, $err] = $client->Nearest(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Nearest(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = PostcodesioSDK.test(nil, nil)
result, err = client.Nearest(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Nearest(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the API Reference - Postcodes.io

- Upstream: [https://postcodes.io](https://postcodes.io)
- API docs: [https://postcodes.io/docs](https://postcodes.io/docs)

- Postcodes.io is released under the MIT licence
- Source code is open and hosted on GitHub for forking and self-hosting
- Underlying data is sourced from Ordnance Survey and the Office for National Statistics; consult their respective open data licences for redistribution

---

Generated from the API Reference - Postcodes.io OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
