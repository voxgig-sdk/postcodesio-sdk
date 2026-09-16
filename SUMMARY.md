# API Reference - Postcodes.io

Postcodes.io is a free postcode lookup API and geocoder for the UK. ## Endpoint All services can be accessed from the following endpoint. ``` https://api.postcodes.io ``` The API accepts GET and POST requests. POST methods use content type `application/json`. ## Responses Each response comes with an appropriate HTTP Status code (except for JSONP requests). These include 200 for success, 400 for a bad request, 404 for not found and 500 for server error. The HTTP Status code is also included in the response body. ## Authentication Postcodes.io does not require authentication.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 6 entities and 11 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Nearest

Results: Success.

SDK operations: `list`.

Key fields to recognise:

- `result`: Array of nearest postcodes sorted by distance

### Outcode

Results: Success.

SDK operations: `load`.

### Place

Results: Success; Successfully retrieved a random place.

SDK operations: `list`, `load`.

Key fields to recognise:

- `code`: Unique identifier for the place record (persistent except for Section of Named/Numbered Roads)
- `country`: Country within Great Britain (England, Scotland, or Wales)
- `county_unitary`: County, Unitary Authority or Greater London Authority that contains this place
- `county_unitary_type`: Type of administrative unit (for example, County, UnitaryAuthority)
- `district_borough`: District, Metropolitan District or London Borough containing this place

### Postcode

Results: Success.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `admin_county`: The administrative county for this postcode. May be empty for areas without county-level administration.
- `admin_district`: The administrative district or unitary authority for this postcode.
- `admin_ward`: The electoral/administrative ward for this postcode.
- `bua`: The Built-up Area (2022) for this postcode. Built-up areas are land which has been &#39;irreversibly urbanised&#39;.
- `cancer_alliance`: The Cancer Alliance for this postcode. Cancer Alliances bring together NHS providers and commissioners to improve cancer care.

### ScottishPostcode

Results: Success.

SDK operations: `load`.

Key fields to recognise:

- `result`: Data for a given postcode

### TerminatedPostcode

Results: Success.

SDK operations: `load`.

Key fields to recognise:

- `result`: Data for a given postcode

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Nearest | `list` | `GET /postcodes/{postcode}/nearest` | See reference |
| Outcode | `load` | `GET /outcodes/{outcode}` | See reference |
| Place | `list` | `GET /places` | See reference |
| Place | `load` | `GET /places/{code}` | See reference |
| Place | `load` | `GET /random/places` | See reference |
| Postcode | `create` | `POST /postcodes` | See reference |
| Postcode | `list` | `GET /postcodes` | See reference |
| Postcode | `load` | `GET /postcodes/{postcode}` | See reference |
| Postcode | `load` | `GET /random/postcodes` | See reference |
| ScottishPostcode | `load` | `GET /scotland/postcodes/{postcode}` | See reference |
| TerminatedPostcode | `load` | `GET /terminated_postcodes/{postcode}` | See reference |

## Connect to the API

- API Server: `https://api.postcodes.io`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `postcodesio_list`: List records for an entity. Supported entities: `nearest`, `place`, `postcode`.
- `postcodesio_load`: Load one record for an entity. Supported entities: `outcode`, `place`, `postcode`, `scottish_postcode`, `terminated_postcode`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

