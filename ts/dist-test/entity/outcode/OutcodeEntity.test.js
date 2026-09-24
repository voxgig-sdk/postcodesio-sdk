"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('OutcodeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when POSTCODESIO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('POSTCODESIO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.PostcodesioSDK.test();
        const ent = testsdk.Outcode();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.POSTCODESIO_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'outcode.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 } }, "id": { "field": "id", "name": "id" }, "name": "outcode", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /outcodes/{outcode}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "SW1A", "k": "param", "n": "id", "or": "outcode", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/outcodes/{outcode}", "q": { "exist": ["id"] }, "r": { "param": { "outcode": "id" } }, "s": [{ "lit": "outcodes" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.result`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "outcode", "name__orig": "outcode", "Name": "Outcode", "name_": "outcode", "name-": "outcode", "NAME": "OUTCODE", "index$": 1 }, { "active": true, "entity": "outcode", "key$": "BasicOutcodeFlow", "kind": "basic", "name": "BasicOutcodeFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "outcode_ref01", "srcdatavar": "outcode_ref01_data", "suffix": "_dt0" }, "m": { "id": "outcode01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-outcode_ref01" } }], "index$": 0 }] }, 'Outcode', { "GET /outcodes/{outcode}": { "protocol": "http", "operationId": "FindOutcode", "responses": { "200": { "description": "Success", "content": { "application/json": { "schema": { "title": "Outcode Response", "type": "object", "required": ["status", "result"], "properties": { "status": { "type": "integer", "format": "int32", "enum": [200] }, "result": { "description": "Comprehensive geographical and administrative data for the specified outcode, including location coordinates, administrative boundaries, and related postal information", "oneOf": [{ "required": ["outcode", "eastings", "northings", "admin_county", "admin_district", "admin_ward", "longitude", "latitude", "country", "parish"], "properties": { "outcode": { "title": "Outcode", "type": "string", "description": "First part of the postcode before the space (e.g., \"SW1A\" in \"SW1A 1AA\"). Usually 2-4 characters.", "example": "SW1A" }, "eastings": { "title": "Eastings", "type": "number", "format": "int32", "nullable": true, "description": "Ordnance Survey eastings coordinate (1m resolution). Returns 0 if location unavailable.", "example": 529740 }, "northings": { "title": "Northings", "type": "number", "format": "int32", "nullable": true, "description": "Ordnance Survey northings coordinate (1m resolution). Returns 0 if location unavailable.", "example": 180066 }, "admin_county": { "title": "Administrative County", "type": "array", "items": { "type": "string" }, "description": "Administrative counties within this outcode.", "example": [] }, "admin_district": { "title": "District", "type": "array", "items": { "type": "string" }, "description": "District/unitary authorities within this outcode.", "example": ["Westminster", "Wandsworth"] }, "admin_ward": { "title": "Ward", "type": "array", "items": { "type": "string" }, "description": "Administrative/electoral wards within this outcode.", "example": ["Nine Elms", "St. James's"] }, "longitude": { "title": "Longitude", "type": "number", "format": "double", "nullable": true, "description": "WGS84 longitude coordinate. May be null if location unavailable.", "example": -0.132066 }, "latitude": { "title": "Latitude", "type": "number", "format": "double", "nullable": true, "description": "WGS84 latitude coordinate. May be null if location unavailable.", "example": 51.50464 }, "country": { "title": "Country", "type": "array", "items": { "type": "string" }, "description": "Countries within this outcode.", "example": ["England"] }, "parish": { "title": "Parish", "type": "array", "items": { "type": "string" }, "description": "Parishes (England) or communities (Wales) within this outcode.", "example": ["Wandsworth, unparished area", "Westminster, unparished area"] } }, "x-ref": "#/components/schemas/Outcode" }] } }, "x-ref": "#/components/schemas/OutcodeResponse" } } } } }, "parameters": [{ "name": "outcode", "in": "path", "description": "Specifies the outward code you wish to query.", "required": true, "example": "SW1A", "style": "simple", "explode": false, "schema": { "type": "string" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let outcode_ref01_data = Object.values(setup.data.existing.outcode)[0];
        // LOAD
        const outcode_ref01_ent = client.Outcode();
        const outcode_ref01_match_dt0 = {};
        outcode_ref01_match_dt0.id = outcode_ref01_data.id;
        const outcode_ref01_data_dt0 = (await outcode_ref01_ent.load(outcode_ref01_match_dt0)).data();
        (0, node_assert_1.default)(outcode_ref01_data_dt0.id === outcode_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/outcode/OutcodeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.PostcodesioSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['outcode01', 'outcode02', 'outcode03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'POSTCODESIO_TEST_OUTCODE_ENTID': idmap,
        'POSTCODESIO_TEST_LIVE': 'FALSE',
        'POSTCODESIO_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['POSTCODESIO_TEST_OUTCODE_ENTID'];
    const live = 'TRUE' === env.POSTCODESIO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['POSTCODESIO_TEST_OUTCODE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.PostcodesioSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.POSTCODESIO_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=OutcodeEntity.test.js.map