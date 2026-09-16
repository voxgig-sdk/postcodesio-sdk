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
(0, node_test_1.describe)('NearestEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when POSTCODESIO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('POSTCODESIO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.PostcodesioSDK.test();
        const ent = testsdk.Nearest();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.POSTCODESIO_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'nearest.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "result", "req": true, "short": "Array of nearest postcodes sorted by distance", "type": "`$ARRAY`", "index$": 0 }, { "active": true, "format": "int32", "name": "status", "req": true, "type": "`$INTEGER`", "index$": 1 }], "name": "nearest", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "SW1A 2AA", "kind": "param", "name": "postcode_id", "orig": "postcode", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /postcodes/{postcode}/nearest", "json": "{\"operationId\":\"Nearest Postcode\",\"parameters\":[{\"description\":\"Valid UK postcode to use as the geographic center point for the proximity search\",\"explode\":false,\"in\":\"path\",\"name\":\"postcode\",\"required\":true,\"schema\":{\"example\":\"SW1A 2AA\",\"title\":\"Postcode\"},\"style\":\"simple\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"result\":{\"description\":\"Array of nearest postcodes sorted by distance\",\"items\":{\"oneOf\":[{\"allOf\":[{\"properties\":{\"admin_county\":{\"description\":\"The administrative county for this postcode. May be empty for areas without county-level administration.\",\"example\":\"\",\"nullable\":true,\"title\":\"County\",\"type\":\"string\"},\"admin_district\":{\"description\":\"The administrative district or unitary authority for this postcode.\",\"example\":\"Westminster\",\"nullable\":true,\"title\":\"District\",\"type\":\"string\"},\"admin_ward\":{\"description\":\"The electoral/administrative ward for this postcode.\",\"example\":\"St. James's\",\"nullable\":true,\"title\":\"Ward\",\"type\":\"string\"},\"bua\":{\"description\":\"The Built-up Area (2022) for this postcode. Built-up areas are land which has been 'irreversibly urbanised'.\",\"example\":\"Greater London\",\"nullable\":true,\"title\":\"Built-up Area\",\"type\":\"string\"},\"cancer_alliance\":{\"description\":\"The Cancer Alliance for this postcode. Cancer Alliances bring together NHS providers and commissioners to improve cancer care.\",\"example\":\"RM Partners (West London)\",\"nullable\":true,\"title\":\"Cancer Alliance\",\"type\":\"string\"},\"ccg\":{\"description\":\"NHS Clinical Commissioning Group responsible for planning healthcare services in England.\",\"example\":\"NHS North West London\",\"nullable\":true,\"title\":\"Clinical Commissioning Group\",\"type\":\"string\"},\"ced\":{\"description\":\"The county electoral division for English postcodes. Will be null for postcodes without a grid reference or in other UK regions.\",\"example\":null,\"nullable\":true,\"title\":\"County Electoral District\",\"type\":\"string\"},\"codes\":{\"description\":\"Contains the GSS (Government Statistical Service) codes for administrative areas. Note: Returns 'Pseudo codes' (e.g., L99999999 for Channel Islands, M99999999 for Isle of Man, N99999999 for Northern Ireland, S99999999 for Scotland) for areas where a statutory geography does not exist. Client logic should handle these codes as 'Not Applicable' rather than treating them as valid IDs.\",\"properties\":{\"admin_county\":{\"description\":\"Official 9-character GSS code for this administrative county.\",\"example\":\"E99999999\",\"nullable\":true,\"title\":\"County GSS Code\",\"type\":\"string\"},\"admin_district\":{\"description\":\"Official 9-character GSS code for this administrative district.\",\"example\":\"E09000033\",\"nullable\":true,\"title\":\"District GSS Code\",\"type\":\"string\"},\"admin_ward\":{\"description\":\"Official 9-character GSS code for this administrative ward.\",\"example\":\"E05013806\",\"nullable\":true,\"title\":\"Ward GSS Code\",\"type\":\"string\"},\"bua\":{\"description\":\"Built-up Area (2022) code.\",\"example\":\"E34004786\",\"nullable\":true,\"title\":\"Built-up Area Code\",\"type\":\"string\"},\"cancer_alliance\":{\"description\":\"Official 9-character GSS code for this Cancer Alliance.\",\"example\":\"E56000009\",\"nullable\":true,\"title\":\"Cancer Alliance GSS Code\",\"type\":\"string\"},\"ccg\":{\"description\":\"Official 9-character GSS code for this Clinical Commissioning Group.\",\"example\":\"E38000256\",\"nullable\":true,\"title\":\"CCG GSS Code\",\"type\":\"string\"},\"ccg_id\":{\"description\":\"Short code identifier for this Clinical Commissioning Group.\",\"example\":\"W2U3Z\",\"nullable\":true,\"title\":\"CCG ID\",\"type\":\"string\"},\"ced\":{\"description\":\"Official 9-character GSS code for this County Electoral District.\",\"example\":\"E99999999\",\"nullable\":true,\"title\":\"CED GSS Code\",\"type\":\"string\"},\"icb\":{\"description\":\"Official 9-character GSS code for this Integrated Care Board.\",\"example\":\"E54000027\",\"nullable\":true,\"title\":\"ICB GSS Code\",\"type\":\"string\"},\"lau2\":{\"description\":\"Local Administrative Unit level 2 code for this area.\",\"example\":\"E09000033\",\"nullable\":true,\"title\":\"LAU2 Code\",\"type\":\"string\"},\"lep1\":{\"description\":\"Official 9-character GSS code for the primary Local Enterprise Partnership.\",\"example\":\"E37000051\",\"nullable\":true,\"title\":\"LEP (Primary) GSS Code\",\"type\":\"string\"},\"lep2\":{\"description\":\"Official 9-character GSS code for the secondary Local Enterprise Partnership.\",\"example\":null,\"nullable\":true,\"title\":\"LEP (Secondary) GSS Code\",\"type\":\"string\"},\"lsoa\":{\"description\":\"Official 9-character GSS code for this 2021 Census LSOA.\",\"example\":\"E01004736\",\"nullable\":true,\"title\":\"LSOA GSS Code\",\"type\":\"string\"},\"lsoa11\":{\"description\":\"Official 9-character GSS code for this 2011 Census LSOA. Alias for codes.lsoa.\",\"example\":\"E01004736\",\"nullable\":true,\"title\":\"LSOA 2011 GSS Code\",\"type\":\"string\"},\"lsoa21\":{\"description\":\"Official 9-character GSS code for this 2021 Census LSOA.\",\"example\":\"E01004736\",\"nullable\":true,\"title\":\"LSOA 2021 GSS Code\",\"type\":\"string\"},\"msoa\":{\"description\":\"Official 9-character GSS code for this 2021 Census MSOA.\",\"example\":\"E02000977\",\"nullable\":true,\"title\":\"MSOA GSS Code\",\"type\":\"string\"},\"msoa11\":{\"description\":\"Official 9-character GSS code for this 2011 Census MSOA. Alias for codes.msoa.\",\"example\":\"E02000977\",\"nullable\":true,\"title\":\"MSOA 2011 GSS Code\",\"type\":\"string\"},\"msoa21\":{\"description\":\"Official 9-character GSS code for this 2021 Census MSOA.\",\"example\":\"E02000977\",\"nullable\":true,\"title\":\"MSOA 2021 GSS Code\",\"type\":\"string\"},\"national_park\":{\"description\":\"Official 9-character GSS code for this National Park.\",\"example\":null,\"nullable\":true,\"title\":\"National Park GSS Code\",\"type\":\"string\"},\"nhs_region\":{\"description\":\"Official 9-character GSS code for this NHS England Region.\",\"example\":\"E40000003\",\"nullable\":true,\"title\":\"NHS Region GSS Code\",\"type\":\"string\"},\"nuts\":{\"description\":\"Official code for this International Territorial Level area.\",\"example\":\"TLI32\",\"nullable\":true,\"title\":\"ITL Code\",\"type\":\"string\"},\"oa21\":{\"description\":\"2021 Census Output Area code.\",\"example\":\"E00004185\",\"nullable\":true,\"title\":\"Output Area 2021 Code\",\"type\":\"string\"},\"parish\":{\"description\":\"Official 9-character GSS code for this parish.\",\"example\":\"E43000236\",\"nullable\":true,\"title\":\"Parish GSS Code\",\"type\":\"string\"},\"parliamentary_constituency_2024\":{\"description\":\"Official 9-character GSS code for this Parliamentary Constituency based on July 2024 boundaries.\",\"example\":\"E14000639\",\"nullable\":true,\"title\":\"Parliamentary Constituency GSS Code (2024)\",\"type\":\"string\"},\"pfa\":{\"description\":\"Official 9-character GSS code for this Police Force Area.\",\"example\":\"E23000001\",\"nullable\":true,\"title\":\"PFA GSS Code\",\"type\":\"string\"},\"ruc11\":{\"description\":\"2011 Census Rural-Urban Classification code.\",\"example\":\"A1\",\"nullable\":true,\"title\":\"Rural-Urban Classification 2011 Code\",\"type\":\"string\"},\"ruc21\":{\"description\":\"2021 Census Rural-Urban Classification code.\",\"example\":\"A1\",\"nullable\":true,\"title\":\"Rural-Urban Classification 2021 Code\",\"type\":\"string\"},\"ttwa\":{\"description\":\"Travel to Work Area code.\",\"example\":\"E30000234\",\"nullable\":true,\"title\":\"TTWA Code\",\"type\":\"string\"}},\"title\":\"Administrative Codes\",\"type\":\"object\"},\"country\":{\"description\":\"The UK constituent country for this postcode (England, Scotland, Wales, Northern Ireland, Channel Islands, or Isle of Man).\",\"example\":\"England\",\"title\":\"Country\",\"type\":\"string\"},\"date_of_introduction\":{\"description\":\"The date the postcode was introduced in YYYYMM format.\",\"example\":\"198001\",\"nullable\":true,\"title\":\"Date of Introduction\",\"type\":\"string\"},\"eastings\":{\"description\":\"The OS grid reference easting (X-coordinate) to 1 metre resolution. Relates to the British National Grid for GB and the Irish National Grid for Northern Ireland. Will be null for Channel Islands and Isle of Man.\",\"example\":530047,\"format\":\"int32\",\"nullable\":true,\"title\":\"Eastings\",\"type\":\"integer\"},\"european_electoral_region\":{\"description\":\"The European Electoral Region for this postcode.\",\"example\":\"London\",\"nullable\":true,\"title\":\"European Electoral Region (EER)\",\"type\":\"string\"},\"icb\":{\"description\":\"The NHS Integrated Care Board responsible for healthcare planning in this area.\",\"example\":\"NHS North West London Integrated Care Board\",\"nullable\":true,\"title\":\"Integrated Care Board\",\"type\":\"string\"},\"incode\":{\"description\":\"The second part of a postcode after the space (always 3 characters). Helps identify specific streets or buildings within a postal area.\",\"example\":\"1AA\",\"title\":\"Inward Code\",\"type\":\"string\"},\"latitude\":{\"description\":\"WGS84 latitude coordinate (north-south position). May be null if geolocation unavailable.\",\"example\":51.503541,\"format\":\"double\",\"nullable\":true,\"title\":\"Latitude\",\"type\":\"number\"},\"lep1\":{\"description\":\"The primary Local Enterprise Partnership for this postcode. LEPs are partnerships between local authorities and businesses.\",\"example\":\"London\",\"nullable\":true,\"title\":\"Local Enterprise Partnership (Primary)\",\"type\":\"string\"},\"lep2\":{\"description\":\"The secondary Local Enterprise Partnership for this postcode, if it falls within overlapping LEP areas.\",\"example\":null,\"nullable\":true,\"title\":\"Local Enterprise Partnership (Secondary)\",\"type\":\"string\"},\"longitude\":{\"description\":\"WGS84 longitude coordinate (east-west position). May be null if geolocation unavailable.\",\"example\":-0.12767,\"format\":\"double\",\"nullable\":true,\"title\":\"Longitude\",\"type\":\"number\"},\"lsoa\":{\"description\":\"2021 Census LSOA code (smaller statistical area, typically 1,000-1,500 residents). Now points to 2021 data.\",\"example\":\"Westminster 018C\",\"nullable\":true,\"title\":\"Lower Layer Super Output Area\",\"type\":\"string\"},\"lsoa11\":{\"description\":\"2011 Census LSOA code. Alias for the 'lsoa' field. In Scotland this is the Data Zone, in Northern Ireland the Small Area.\",\"example\":\"Westminster 018C\",\"nullable\":true,\"title\":\"Lower Layer Super Output Area (2011)\",\"type\":\"string\"},\"lsoa21\":{\"description\":\"2021 Census LSOA code. In Scotland this is the Data Zone, in Northern Ireland the Small Area.\",\"example\":\"Westminster 018C\",\"nullable\":true,\"title\":\"Lower Layer Super Output Area (2021)\",\"type\":\"string\"},\"msoa\":{\"description\":\"2021 Census MSOA code (mid-size statistical area, typically 5,000-7,000 residents). Now points to 2021 data.\",\"example\":\"Westminster 018\",\"nullable\":true,\"title\":\"Middle Layer Super Output Area\",\"type\":\"string\"},\"msoa11\":{\"description\":\"2011 Census MSOA code. Alias for the 'msoa' field. In Scotland this is the Intermediate Zone.\",\"example\":\"Westminster 018\",\"nullable\":true,\"title\":\"Middle Layer Super Output Area (2011)\",\"type\":\"string\"},\"msoa21\":{\"description\":\"2021 Census MSOA code. In Scotland this is the Intermediate Zone.\",\"example\":\"Westminster 018\",\"nullable\":true,\"title\":\"Middle Layer Super Output Area (2021)\",\"type\":\"string\"},\"national_park\":{\"description\":\"The National Park this postcode falls within, if any.\",\"example\":null,\"nullable\":true,\"title\":\"National Park\",\"type\":\"string\"},\"nhs_ha\":{\"description\":\"The NHS health authority area for this postcode.\",\"example\":\"London\",\"nullable\":true,\"title\":\"Strategic Health Authority\",\"type\":\"string\"},\"nhs_region\":{\"description\":\"The NHS England Region for this postcode. Only applicable to English postcodes.\",\"example\":\"London\",\"nullable\":true,\"title\":\"NHS England Region\",\"type\":\"string\"},\"northings\":{\"description\":\"The OS grid reference northing (Y-coordinate) to 1 metre resolution. Relates to the British National Grid for GB and the Irish National Grid for Northern Ireland. Will be null for Channel Islands and Isle of Man.\",\"example\":179951,\"format\":\"int32\",\"nullable\":true,\"title\":\"Northings\",\"type\":\"integer\"},\"nuts\":{\"description\":\"Statistical geography code for international comparisons (formerly NUTS - Nomenclature of Units for Territorial Statistics).\\n\\nAs of January 2021, following Brexit, NUTS was replaced by ITL (International Territorial Levels) in the UK.\\nFor backward compatibility, Postcodes.io continues to provide this data under the \\\"nuts\\\" field name.\",\"example\":\"Westminster\",\"nullable\":true,\"title\":\"International Territorial Levels (ITL)\",\"type\":\"string\"},\"oa21\":{\"description\":\"2021 Census Output Area code - the smallest census geography.\",\"example\":\"E00004185\",\"nullable\":true,\"title\":\"Output Area (2021)\",\"type\":\"string\"},\"outcode\":{\"description\":\"The first part of a postcode before the space (2-4 characters). This generally identifies the postal town or district.\",\"example\":\"SW1A\",\"title\":\"Outward Code\",\"type\":\"string\"},\"parish\":{\"description\":\"The civil parish (England) or community (Wales) for this postcode.\",\"example\":\"Westminster, unparished area\",\"nullable\":true,\"title\":\"Parish/Community\",\"type\":\"string\"},\"parliamentary_constituency\":{\"description\":\"The UK Parliamentary constituency for this postcode.\",\"example\":\"Cities of London and Westminster\",\"nullable\":true,\"title\":\"Westminster Parliamentary Constituency\",\"type\":\"string\"},\"parliamentary_constituency_2024\":{\"description\":\"The UK Parliamentary constituency for this postcode based on July 2024 boundaries.\",\"example\":\"Cities of London and Westminster\",\"nullable\":true,\"title\":\"Westminster Parliamentary Constituency (2024)\",\"type\":\"string\"},\"pfa\":{\"description\":\"The police force area for this postcode.\",\"example\":\"Metropolitan Police\",\"nullable\":true,\"title\":\"Police Force Area\",\"type\":\"string\"},\"postcode\":{\"description\":\"UK postcode format: 2-4 character outward code, a space, and a 3-character inward code (e.g., SW1A 2AA). Updated monthly from Royal Mail.\",\"example\":\"SW1A 2AA\",\"title\":\"Postcode\",\"type\":\"string\"},\"primary_care_trust\":{\"description\":\"The healthcare administrative area for this postcode. Different naming conventions apply across UK regions.\",\"example\":\"Westminster\",\"nullable\":true,\"title\":\"Primary Care Trust (PCT)\",\"type\":\"string\"},\"quality\":{\"description\":\"Positional Quality Indicator (1-9). Shows the status of the assigned grid reference:\\n\\n* 1: Within the building of the matched address closest to the postcode mean\\n* 2: As for 1, except by visual inspection of Landline maps (Scotland only)\\n* 3: Approximate to within 50 metres\\n* 4: Postcode unit mean (averaged from addresses with same postcode)\\n* 5: Estimated by ONS using surrounding postcodes\\n* 6: Postcode sector mean (mainly PO Boxes)\\n* 8: Terminated postcode (last known ONS grid reference)\\n* 9: No coordinates available\\n\",\"example\":1,\"title\":\"Positional Quality Indicator\",\"type\":\"integer\"},\"region\":{\"description\":\"The regional designation for this postcode (formerly Government Office Regions or GORs).\",\"example\":\"London\",\"nullable\":true,\"title\":\"Region\",\"type\":\"string\"},\"ruc11\":{\"description\":\"The 2011 Census Rural-Urban Classification for this postcode.\",\"example\":\"Urban major conurbation\",\"nullable\":true,\"title\":\"Rural-Urban Classification (2011)\",\"type\":\"string\"},\"ruc21\":{\"description\":\"The 2021 Census Rural-Urban Classification for this postcode.\",\"example\":\"Urban major conurbation\",\"nullable\":true,\"title\":\"Rural-Urban Classification (2021)\",\"type\":\"string\"},\"ttwa\":{\"description\":\"The Travel to Work Area for this postcode. TTWAs are areas where most people both live and work.\",\"example\":\"London\",\"nullable\":true,\"title\":\"Travel to Work Area\",\"type\":\"string\"}},\"required\":[\"postcode\",\"outcode\",\"incode\",\"quality\",\"eastings\",\"northings\",\"country\",\"nhs_ha\",\"admin_county\",\"admin_district\",\"admin_ward\",\"longitude\",\"latitude\",\"parliamentary_constituency\",\"european_electoral_region\",\"primary_care_trust\",\"region\",\"parish\",\"lsoa\",\"msoa\",\"ced\",\"ccg\",\"nuts\",\"codes\"],\"type\":\"object\"},{\"properties\":{\"distance\":{\"description\":\"Distance in metres from specified postcode\",\"example\":0,\"format\":\"double\",\"title\":\"Distance from supplied geolocation\",\"type\":\"number\"}},\"required\":[\"distance\"],\"type\":\"object\"}],\"description\":\"Standard postcode object extended with a distance attribute, indicating how far the postcode is from a supplied geolocation.\",\"title\":\"Geolocated Postcode\"}]},\"type\":\"array\"},\"status\":{\"enum\":[200],\"format\":\"int32\",\"type\":\"integer\"}},\"required\":[\"status\",\"result\"],\"title\":\"Nearest Postcodes Response\",\"type\":\"object\"}}},\"description\":\"Success\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/postcodes/{postcode}/nearest", "rename": { "param": { "postcode": "postcode_id" } }, "segments": [{ "lit": "postcodes" }, { "var": "postcode_id" }, { "lit": "nearest" }], "select": { "exist": ["postcode_id"] }, "transform": { "req": "`reqdata`", "res": "`body.result`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["postcode"]] }, "key$": "nearest", "name__orig": "nearest", "Name": "Nearest", "name_": "nearest", "name-": "nearest", "NAME": "NEAREST", "index$": 0 }, { "active": true, "entity": "nearest", "key$": "BasicNearestFlow", "kind": "basic", "name": "BasicNearestFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": { "postcode_id": "postcode01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "nearest_ref01" } }], "index$": 0 }] }, 'Nearest');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let nearest_ref01_data = Object.values(setup.data.existing.nearest)[0];
        // LIST
        const nearest_ref01_ent = client.Nearest();
        const nearest_ref01_match = {};
        nearest_ref01_match['postcode_id'] = setup.idmap['postcode01'];
        const nearest_ref01_list = (await nearest_ref01_ent.list(nearest_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/nearest/NearestTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.PostcodesioSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['nearest01', 'nearest02', 'nearest03', 'postcode01', 'postcode02', 'postcode03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'POSTCODESIO_TEST_NEAREST_ENTID': idmap,
        'POSTCODESIO_TEST_LIVE': 'FALSE',
        'POSTCODESIO_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['POSTCODESIO_TEST_NEAREST_ENTID'];
    const live = 'TRUE' === env.POSTCODESIO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['POSTCODESIO_TEST_NEAREST_ENTID'];
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
//# sourceMappingURL=NearestEntity.test.js.map