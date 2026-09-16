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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ScottishPostcodeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when POSTCODESIO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('POSTCODESIO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.PostcodesioSDK.test();
        const ent = testsdk.ScottishPostcode();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.POSTCODESIO_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'scottish_postcode.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "result", "req": true, "short": "Data for a given postcode", "type": "`$ARRAY`", "index$": 1 }, { "active": true, "format": "int32", "name": "status", "req": true, "type": "`$INTEGER`", "index$": 2 }], "id": { "field": "id", "name": "id" }, "name": "scottish_postcode", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "postcode", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /scotland/postcodes/{postcode}", "json": "{\"operationId\":\"getScottishPostcode\",\"parameters\":[{\"description\":\"Specifies the postcode you wish to query\",\"explode\":false,\"in\":\"path\",\"name\":\"postcode\",\"required\":true,\"schema\":{\"type\":\"string\"},\"style\":\"simple\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"result\":{\"description\":\"Data for a given postcode\",\"items\":{\"properties\":{\"codes\":{\"description\":\"Official identification codes associated with this postcode location\",\"properties\":{\"scottish_parliamentary_constituency\":{\"description\":\"The 9-character GSS/ONS code identifying the 2014 Scottish Parliamentary Constituency (format: S#######)\",\"example\":\"S16000125\",\"pattern\":\"^S[0-9]{8}$\",\"title\":\"Scottish Parliamentary Constituency Code\",\"type\":\"string\"}},\"title\":\"Location Codes\",\"type\":\"object\"},\"postcode\":{\"description\":\"The Royal Mail postcode associated with this location (e.g., IV2 7JB)\",\"example\":\"IV2 7JB\",\"pattern\":\"^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$\",\"title\":\"Postcode\",\"type\":\"string\"},\"scottish_parliamentary_constituency\":{\"description\":\"The name of the 2014 Scottish Parliamentary Constituency for this location\",\"example\":\"Inverness and Nairn\",\"title\":\"Scottish Parliamentary Constituency\",\"type\":\"string\"}},\"required\":[\"postcode\",\"scottish_parliamentary_constituency\",\"codes\"]},\"type\":\"array\"},\"status\":{\"enum\":[200],\"format\":\"int32\",\"type\":\"integer\"}},\"required\":[\"status\",\"result\"],\"title\":\"Scottish Postcodes Response\",\"type\":\"object\"}}},\"description\":\"Success\"},\"404\":{\"description\":\"Postcode not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/scotland/postcodes/{postcode}", "rename": { "param": { "postcode": "id" } }, "segments": [{ "lit": "scotland" }, { "lit": "postcodes" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "scottish_postcode", "name__orig": "scottish_postcode", "Name": "ScottishPostcode", "name_": "scottish_postcode", "name-": "scottish-postcode", "NAME": "SCOTTISH_POSTCODE", "index$": 4 }, { "active": true, "entity": "scottish_postcode", "key$": "BasicScottishPostcodeFlow", "kind": "basic", "name": "BasicScottishPostcodeFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "scottish_postcode_ref01", "srcdatavar": "scottish_postcode_ref01_data", "suffix": "_dt0" }, "match": { "id": "scottish_postcode01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-scottish_postcode_ref01" } }], "index$": 0 }] }, 'ScottishPostcode');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let scottish_postcode_ref01_data = Object.values(setup.data.existing.scottish_postcode)[0];
        // LOAD
        const scottish_postcode_ref01_ent = client.ScottishPostcode();
        const scottish_postcode_ref01_match_dt0 = {};
        scottish_postcode_ref01_match_dt0.id = scottish_postcode_ref01_data.id;
        const scottish_postcode_ref01_data_dt0 = (await scottish_postcode_ref01_ent.load(scottish_postcode_ref01_match_dt0)).data();
        (0, node_assert_1.default)(scottish_postcode_ref01_data_dt0.id === scottish_postcode_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/scottish_postcode/ScottishPostcodeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.PostcodesioSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['scottish_postcode01', 'scottish_postcode02', 'scottish_postcode03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'POSTCODESIO_TEST_SCOTTISH_POSTCODE_ENTID': idmap,
        'POSTCODESIO_TEST_LIVE': 'FALSE',
        'POSTCODESIO_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['POSTCODESIO_TEST_SCOTTISH_POSTCODE_ENTID'];
    const live = 'TRUE' === env.POSTCODESIO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['POSTCODESIO_TEST_SCOTTISH_POSTCODE_ENTID'];
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
//# sourceMappingURL=ScottishPostcodeEntity.test.js.map