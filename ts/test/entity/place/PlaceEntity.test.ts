

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { PostcodesioSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('PlaceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POSTCODESIO_TEST_LIVE=TRUE.
  afterEach(liveDelay('POSTCODESIO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PostcodesioSDK.test()
    const ent = testsdk.Place()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POSTCODESIO_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'place.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"code","req":true,"short":"Unique identifier for the place record (persistent except for Section of Named/Numbered Roads)","type":"`$STRING`","index$":0},{"active":true,"name":"country","req":true,"short":"Country within Great Britain (England, Scotland, or Wales)","type":"`$STRING`","index$":1},{"active":true,"name":"county_unitary","req":true,"short":"County, Unitary Authority or Greater London Authority that contains this place","type":"`$STRING`","index$":2},{"active":true,"name":"county_unitary_type","req":true,"short":"Type of administrative unit (e.g., County, UnitaryAuthority)","type":"`$STRING`","index$":3},{"active":true,"name":"district_borough","req":true,"short":"District, Metropolitan District or London Borough containing this place","type":"`$STRING`","index$":4},{"active":true,"name":"district_borough_type","req":false,"short":"Type of district/borough administrative unit","type":"`$STRING`","index$":5},{"active":true,"name":"eastings","req":true,"short":"Ordnance Survey grid reference Easting (1m resolution, not available for Channel Islands/Isle of Man)","type":"`$INTEGER`","index$":6},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":7},{"active":true,"format":"double","name":"latitude","req":true,"short":"WGS84 latitude coordinate","type":"`$NUMBER`","index$":8},{"active":true,"name":"local_type","req":true,"short":"Ordnance Survey classification (City, Town, Village, Hamlet, etc.)","type":"`$STRING`","index$":9},{"active":true,"format":"double","name":"longitude","req":true,"short":"WGS84 longitude coordinate","type":"`$NUMBER`","index$":10},{"active":true,"name":"max_eastings","req":true,"short":"Eastern edge of the place's bounding box (Minimum Bounding Rectangle)","type":"`$INTEGER`","index$":11},{"active":true,"name":"max_northings","req":true,"short":"Northern edge of the place's bounding box (Minimum Bounding Rectangle)","type":"`$INTEGER`","index$":12},{"active":true,"name":"min_eastings","req":true,"short":"Western edge of the place's bounding box (Minimum Bounding Rectangle)","type":"`$INTEGER`","index$":13},{"active":true,"name":"min_northings","req":true,"short":"Southern edge of the place's bounding box (Minimum Bounding Rectangle)","type":"`$INTEGER`","index$":14},{"active":true,"name":"name_1","req":true,"short":"Official name of the place (preserves original format, e.g., \"The Pennines\" not \"Pennines, The\")","type":"`$STRING`","index$":15},{"active":true,"name":"name_1_lang","req":true,"short":"Language code for name_1 (cym=Welsh, eng=English, gla=Scottish Gaelic)","type":"`$STRING`","index$":16},{"active":true,"name":"name_2","req":true,"short":"Alternative name in a different language","type":"`$STRING`","index$":17},{"active":true,"name":"name_2_lang","req":true,"short":"Language code for name_2 (cym=Welsh, eng=English, gla=Scottish Gaelic)","type":"`$STRING`","index$":18},{"active":true,"name":"northings","req":true,"short":"Ordnance Survey grid reference Northing (1m resolution, not available for Channel Islands/Isle of Man)","type":"`$INTEGER`","index$":19},{"active":true,"name":"outcode","req":true,"short":"Postcode district (first part of the postcode)","type":"`$STRING`","index$":20},{"active":true,"name":"region","req":true,"short":"European Region (formerly Government Office Region) containing this place","type":"`$STRING`","index$":21}],"id":{"field":"id","name":"id"},"name":"place","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /places","json":"{\"operationId\":\"Place Query\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"result\":{\"description\":\"Data for a given place\",\"items\":{\"description\":\"A geographical location with detailed information including names, coordinates, and administrative boundaries\",\"properties\":{\"code\":{\"description\":\"Unique identifier for the place record (persistent except for Section of Named/Numbered Roads)\",\"example\":\"osgb4000000074559833\",\"title\":\"Code\",\"type\":\"string\"},\"country\":{\"description\":\"Country within Great Britain (England, Scotland, or Wales)\",\"example\":\"Wales\",\"title\":\"Country\",\"type\":\"string\"},\"county_unitary\":{\"description\":\"County, Unitary Authority or Greater London Authority that contains this place\",\"example\":\"Powys - Powys\",\"nullable\":true,\"title\":\"Administrative Area\",\"type\":\"string\"},\"county_unitary_type\":{\"description\":\"Type of administrative unit (e.g., County, UnitaryAuthority)\",\"example\":\"UnitaryAuthority\",\"nullable\":true,\"title\":\"Administrative Area Type\",\"type\":\"string\"},\"district_borough\":{\"description\":\"District, Metropolitan District or London Borough containing this place\",\"example\":\"null\",\"nullable\":true,\"title\":\"District or Borough\",\"type\":\"string\"},\"district_borough_type\":{\"description\":\"Type of district/borough administrative unit\",\"example\":\"null\",\"nullable\":true,\"title\":\"Borough Type\",\"type\":\"string\"},\"eastings\":{\"description\":\"Ordnance Survey grid reference Easting (1m resolution, not available for Channel Islands/Isle of Man)\",\"example\":\"322335\",\"title\":\"Eastings\",\"type\":\"integer\"},\"latitude\":{\"description\":\"WGS84 latitude coordinate\",\"example\":\"52.6606391732959\",\"format\":\"double\",\"title\":\"Latitude\",\"type\":\"number\"},\"local_type\":{\"description\":\"Ordnance Survey classification (City, Town, Village, Hamlet, etc.)\",\"example\":\"Hamlet\",\"title\":\"Local Type\",\"type\":\"string\"},\"longitude\":{\"description\":\"WGS84 longitude coordinate\",\"example\":\"-3.14971194307843\",\"format\":\"double\",\"title\":\"Longitude\",\"type\":\"number\"},\"max_eastings\":{\"description\":\"Eastern edge of the place's bounding box (Minimum Bounding Rectangle)\",\"example\":\"323592\",\"title\":\"Maximum Eastings\",\"type\":\"integer\"},\"max_northings\":{\"description\":\"Northern edge of the place's bounding box (Minimum Bounding Rectangle)\",\"example\":\"308740\",\"title\":\"Maximum Northings\",\"type\":\"integer\"},\"min_eastings\":{\"description\":\"Western edge of the place's bounding box (Minimum Bounding Rectangle)\",\"example\":\"321623\",\"title\":\"Minimum Eastings\",\"type\":\"integer\"},\"min_northings\":{\"description\":\"Southern edge of the place's bounding box (Minimum Bounding Rectangle)\",\"example\":\"306458\",\"title\":\"Minimum Northings\",\"type\":\"integer\"},\"name_1\":{\"description\":\"Official name of the place (preserves original format, e.g., \\\"The Pennines\\\" not \\\"Pennines, The\\\")\",\"example\":\"Y Trallwng\",\"title\":\"Primary Name\",\"type\":\"string\"},\"name_1_lang\":{\"description\":\"Language code for name_1 (cym=Welsh, eng=English, gla=Scottish Gaelic)\",\"example\":\"cym\",\"nullable\":true,\"title\":\"Primary Name Language\",\"type\":\"string\"},\"name_2\":{\"description\":\"Alternative name in a different language\",\"example\":\"Welshpool\",\"nullable\":true,\"title\":\"Secondary Name\",\"type\":\"string\"},\"name_2_lang\":{\"description\":\"Language code for name_2 (cym=Welsh, eng=English, gla=Scottish Gaelic)\",\"example\":\"eng\",\"nullable\":true,\"title\":\"Secondary Name Language\",\"type\":\"string\"},\"northings\":{\"description\":\"Ordnance Survey grid reference Northing (1m resolution, not available for Channel Islands/Isle of Man)\",\"example\":\"307611\",\"title\":\"Northings\",\"type\":\"integer\"},\"outcode\":{\"description\":\"Postcode district (first part of the postcode)\",\"example\":\"BH24\",\"title\":\"Outcode\",\"type\":\"string\"},\"region\":{\"description\":\"European Region (formerly Government Office Region) containing this place\",\"example\":\"Wales\",\"title\":\"Region\",\"type\":\"string\"}},\"required\":[\"code\",\"name_1\",\"name_1_lang\",\"name_2\",\"name_2_lang\",\"local_type\",\"outcode\",\"county_unitary\",\"county_unitary_type\",\"district_borough\",\"region\",\"country\",\"longitude\",\"latitude\",\"eastings\",\"northings\",\"min_eastings\",\"min_northings\",\"max_eastings\",\"max_northings\"],\"title\":\"Place\",\"type\":\"object\"},\"type\":\"array\"},\"status\":{\"enum\":[200],\"format\":\"int32\",\"type\":\"integer\"}},\"required\":[\"status\",\"result\"],\"title\":\"Places Response\",\"type\":\"object\"}}},\"description\":\"Success\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/places","segments":[{"lit":"places"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.result`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"code","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /places/{code}","json":"{\"operationId\":\"FindPlace\",\"parameters\":[{\"description\":\"Specifies the place you wish to query\",\"explode\":false,\"in\":\"path\",\"name\":\"code\",\"required\":true,\"schema\":{\"type\":\"string\"},\"style\":\"simple\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"result\":{\"description\":\"Data for a given place\",\"properties\":{\"code\":{\"description\":\"Unique identifier for the place record (persistent except for Section of Named/Numbered Roads)\",\"example\":\"osgb4000000074559833\",\"title\":\"Code\",\"type\":\"string\"},\"country\":{\"description\":\"Country within Great Britain (England, Scotland, or Wales)\",\"example\":\"Wales\",\"title\":\"Country\",\"type\":\"string\"},\"county_unitary\":{\"description\":\"County, Unitary Authority or Greater London Authority that contains this place\",\"example\":\"Powys - Powys\",\"nullable\":true,\"title\":\"Administrative Area\",\"type\":\"string\"},\"county_unitary_type\":{\"description\":\"Type of administrative unit (e.g., County, UnitaryAuthority)\",\"example\":\"UnitaryAuthority\",\"nullable\":true,\"title\":\"Administrative Area Type\",\"type\":\"string\"},\"district_borough\":{\"description\":\"District, Metropolitan District or London Borough containing this place\",\"example\":\"null\",\"nullable\":true,\"title\":\"District or Borough\",\"type\":\"string\"},\"district_borough_type\":{\"description\":\"Type of district/borough administrative unit\",\"example\":\"null\",\"nullable\":true,\"title\":\"Borough Type\",\"type\":\"string\"},\"eastings\":{\"description\":\"Ordnance Survey grid reference Easting (1m resolution, not available for Channel Islands/Isle of Man)\",\"example\":\"322335\",\"title\":\"Eastings\",\"type\":\"integer\"},\"latitude\":{\"description\":\"WGS84 latitude coordinate\",\"example\":\"52.6606391732959\",\"format\":\"double\",\"title\":\"Latitude\",\"type\":\"number\"},\"local_type\":{\"description\":\"Ordnance Survey classification (City, Town, Village, Hamlet, etc.)\",\"example\":\"Hamlet\",\"title\":\"Local Type\",\"type\":\"string\"},\"longitude\":{\"description\":\"WGS84 longitude coordinate\",\"example\":\"-3.14971194307843\",\"format\":\"double\",\"title\":\"Longitude\",\"type\":\"number\"},\"max_eastings\":{\"description\":\"Eastern edge of the place's bounding box (Minimum Bounding Rectangle)\",\"example\":\"323592\",\"title\":\"Maximum Eastings\",\"type\":\"integer\"},\"max_northings\":{\"description\":\"Northern edge of the place's bounding box (Minimum Bounding Rectangle)\",\"example\":\"308740\",\"title\":\"Maximum Northings\",\"type\":\"integer\"},\"min_eastings\":{\"description\":\"Western edge of the place's bounding box (Minimum Bounding Rectangle)\",\"example\":\"321623\",\"title\":\"Minimum Eastings\",\"type\":\"integer\"},\"min_northings\":{\"description\":\"Southern edge of the place's bounding box (Minimum Bounding Rectangle)\",\"example\":\"306458\",\"title\":\"Minimum Northings\",\"type\":\"integer\"},\"name_1\":{\"description\":\"Official name of the place (preserves original format, e.g., \\\"The Pennines\\\" not \\\"Pennines, The\\\")\",\"example\":\"Y Trallwng\",\"title\":\"Primary Name\",\"type\":\"string\"},\"name_1_lang\":{\"description\":\"Language code for name_1 (cym=Welsh, eng=English, gla=Scottish Gaelic)\",\"example\":\"cym\",\"nullable\":true,\"title\":\"Primary Name Language\",\"type\":\"string\"},\"name_2\":{\"description\":\"Alternative name in a different language\",\"example\":\"Welshpool\",\"nullable\":true,\"title\":\"Secondary Name\",\"type\":\"string\"},\"name_2_lang\":{\"description\":\"Language code for name_2 (cym=Welsh, eng=English, gla=Scottish Gaelic)\",\"example\":\"eng\",\"nullable\":true,\"title\":\"Secondary Name Language\",\"type\":\"string\"},\"northings\":{\"description\":\"Ordnance Survey grid reference Northing (1m resolution, not available for Channel Islands/Isle of Man)\",\"example\":\"307611\",\"title\":\"Northings\",\"type\":\"integer\"},\"outcode\":{\"description\":\"Postcode district (first part of the postcode)\",\"example\":\"BH24\",\"title\":\"Outcode\",\"type\":\"string\"},\"region\":{\"description\":\"European Region (formerly Government Office Region) containing this place\",\"example\":\"Wales\",\"title\":\"Region\",\"type\":\"string\"}},\"required\":[\"code\",\"name_1\",\"name_1_lang\",\"name_2\",\"name_2_lang\",\"local_type\",\"outcode\",\"county_unitary\",\"county_unitary_type\",\"district_borough\",\"region\",\"country\",\"longitude\",\"latitude\",\"eastings\",\"northings\",\"min_eastings\",\"min_northings\",\"max_eastings\",\"max_northings\"],\"title\":\"Place\",\"type\":\"object\"},\"status\":{\"enum\":[200],\"format\":\"int32\",\"type\":\"integer\"}},\"required\":[\"status\",\"result\"],\"title\":\"Place Response\",\"type\":\"object\"}}},\"description\":\"Success\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/places/{code}","rename":{"param":{"code":"id"}},"segments":[{"lit":"places"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body.result`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /random/places","json":"{\"operationId\":\"randomPlace\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"result\":{\"description\":\"Data for a given place\",\"properties\":{\"code\":{\"description\":\"Unique identifier for the place record (persistent except for Section of Named/Numbered Roads)\",\"example\":\"osgb4000000074559833\",\"title\":\"Code\",\"type\":\"string\"},\"country\":{\"description\":\"Country within Great Britain (England, Scotland, or Wales)\",\"example\":\"Wales\",\"title\":\"Country\",\"type\":\"string\"},\"county_unitary\":{\"description\":\"County, Unitary Authority or Greater London Authority that contains this place\",\"example\":\"Powys - Powys\",\"nullable\":true,\"title\":\"Administrative Area\",\"type\":\"string\"},\"county_unitary_type\":{\"description\":\"Type of administrative unit (e.g., County, UnitaryAuthority)\",\"example\":\"UnitaryAuthority\",\"nullable\":true,\"title\":\"Administrative Area Type\",\"type\":\"string\"},\"district_borough\":{\"description\":\"District, Metropolitan District or London Borough containing this place\",\"example\":\"null\",\"nullable\":true,\"title\":\"District or Borough\",\"type\":\"string\"},\"district_borough_type\":{\"description\":\"Type of district/borough administrative unit\",\"example\":\"null\",\"nullable\":true,\"title\":\"Borough Type\",\"type\":\"string\"},\"eastings\":{\"description\":\"Ordnance Survey grid reference Easting (1m resolution, not available for Channel Islands/Isle of Man)\",\"example\":\"322335\",\"title\":\"Eastings\",\"type\":\"integer\"},\"latitude\":{\"description\":\"WGS84 latitude coordinate\",\"example\":\"52.6606391732959\",\"format\":\"double\",\"title\":\"Latitude\",\"type\":\"number\"},\"local_type\":{\"description\":\"Ordnance Survey classification (City, Town, Village, Hamlet, etc.)\",\"example\":\"Hamlet\",\"title\":\"Local Type\",\"type\":\"string\"},\"longitude\":{\"description\":\"WGS84 longitude coordinate\",\"example\":\"-3.14971194307843\",\"format\":\"double\",\"title\":\"Longitude\",\"type\":\"number\"},\"max_eastings\":{\"description\":\"Eastern edge of the place's bounding box (Minimum Bounding Rectangle)\",\"example\":\"323592\",\"title\":\"Maximum Eastings\",\"type\":\"integer\"},\"max_northings\":{\"description\":\"Northern edge of the place's bounding box (Minimum Bounding Rectangle)\",\"example\":\"308740\",\"title\":\"Maximum Northings\",\"type\":\"integer\"},\"min_eastings\":{\"description\":\"Western edge of the place's bounding box (Minimum Bounding Rectangle)\",\"example\":\"321623\",\"title\":\"Minimum Eastings\",\"type\":\"integer\"},\"min_northings\":{\"description\":\"Southern edge of the place's bounding box (Minimum Bounding Rectangle)\",\"example\":\"306458\",\"title\":\"Minimum Northings\",\"type\":\"integer\"},\"name_1\":{\"description\":\"Official name of the place (preserves original format, e.g., \\\"The Pennines\\\" not \\\"Pennines, The\\\")\",\"example\":\"Y Trallwng\",\"title\":\"Primary Name\",\"type\":\"string\"},\"name_1_lang\":{\"description\":\"Language code for name_1 (cym=Welsh, eng=English, gla=Scottish Gaelic)\",\"example\":\"cym\",\"nullable\":true,\"title\":\"Primary Name Language\",\"type\":\"string\"},\"name_2\":{\"description\":\"Alternative name in a different language\",\"example\":\"Welshpool\",\"nullable\":true,\"title\":\"Secondary Name\",\"type\":\"string\"},\"name_2_lang\":{\"description\":\"Language code for name_2 (cym=Welsh, eng=English, gla=Scottish Gaelic)\",\"example\":\"eng\",\"nullable\":true,\"title\":\"Secondary Name Language\",\"type\":\"string\"},\"northings\":{\"description\":\"Ordnance Survey grid reference Northing (1m resolution, not available for Channel Islands/Isle of Man)\",\"example\":\"307611\",\"title\":\"Northings\",\"type\":\"integer\"},\"outcode\":{\"description\":\"Postcode district (first part of the postcode)\",\"example\":\"BH24\",\"title\":\"Outcode\",\"type\":\"string\"},\"region\":{\"description\":\"European Region (formerly Government Office Region) containing this place\",\"example\":\"Wales\",\"title\":\"Region\",\"type\":\"string\"}},\"required\":[\"code\",\"name_1\",\"name_1_lang\",\"name_2\",\"name_2_lang\",\"local_type\",\"outcode\",\"county_unitary\",\"county_unitary_type\",\"district_borough\",\"region\",\"country\",\"longitude\",\"latitude\",\"eastings\",\"northings\",\"min_eastings\",\"min_northings\",\"max_eastings\",\"max_northings\"],\"title\":\"Place\",\"type\":\"object\"},\"status\":{\"enum\":[200],\"format\":\"int32\",\"type\":\"integer\"}},\"required\":[\"status\",\"result\"],\"title\":\"Place Response\",\"type\":\"object\"}}},\"description\":\"Successfully retrieved a random place\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/random/places","segments":[{"lit":"random"},{"lit":"places"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.result`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"place","name__orig":"place","Name":"Place","name_":"place","name-":"place","NAME":"PLACE","index$":2}, {"active":true,"entity":"place","key$":"BasicPlaceFlow","kind":"basic","name":"BasicPlaceFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"place_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"place_ref01","srcdatavar":"place_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-place_ref01"}}],"index$":1}]}, 'Place')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let place_ref01_data = Object.values(setup.data.existing.place)[0] as any

    // LIST
    const place_ref01_ent = client.Place()
    const place_ref01_match: any = {}

    const place_ref01_list = (await place_ref01_ent.list(place_ref01_match)).map((e: any) => e.data())


    // LOAD
    const place_ref01_match_dt0: any = {}
    place_ref01_match_dt0.id = place_ref01_data.id
    const place_ref01_data_dt0 = (await place_ref01_ent.load(place_ref01_match_dt0)).data()
    assert(place_ref01_data_dt0.id === place_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/place/PlaceTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = PostcodesioSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['place01','place02','place03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POSTCODESIO_TEST_PLACE_ENTID': idmap,
    'POSTCODESIO_TEST_LIVE': 'FALSE',
    'POSTCODESIO_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POSTCODESIO_TEST_PLACE_ENTID']

  const live = 'TRUE' === env.POSTCODESIO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POSTCODESIO_TEST_PLACE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new PostcodesioSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
