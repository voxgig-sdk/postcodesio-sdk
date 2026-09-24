

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"code":{"a":true,"h":"Code","n":"code","r":true,"sh":"Unique identifier for the place record (persistent except for Section of Named/Numbered Roads)","t":"`$STRING`","key$":"code","index$":0},"country":{"a":true,"h":"Country","n":"country","r":true,"sh":"Country within Great Britain (England, Scotland, or Wales)","t":"`$STRING`","key$":"country","index$":1},"county_unitary":{"a":true,"h":"County Unitary","n":"county_unitary","r":true,"sh":"County, Unitary Authority or Greater London Authority that contains this place","t":"`$STRING`","key$":"county_unitary","index$":2},"county_unitary_type":{"a":true,"h":"County Unitary Type","n":"county_unitary_type","r":true,"sh":"Type of administrative unit (e.g., County, UnitaryAuthority)","t":"`$STRING`","key$":"county_unitary_type","index$":3},"district_borough":{"a":true,"h":"District Borough","n":"district_borough","r":true,"sh":"District, Metropolitan District or London Borough containing this place","t":"`$STRING`","key$":"district_borough","index$":4},"district_borough_type":{"a":true,"h":"District Borough Type","n":"district_borough_type","r":false,"sh":"Type of district/borough administrative unit","t":"`$STRING`","key$":"district_borough_type","index$":5},"eastings":{"a":true,"h":"Eastings","n":"eastings","r":true,"sh":"Ordnance Survey grid reference Easting (1m resolution, not available for Channel Islands/Isle of Man)","t":"`$INTEGER`","key$":"eastings","index$":6},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":7},"latitude":{"a":true,"fo":"double","h":"Latitude","n":"latitude","r":true,"sh":"WGS84 latitude coordinate","t":"`$NUMBER`","key$":"latitude","index$":8},"local_type":{"a":true,"h":"Local Type","n":"local_type","r":true,"sh":"Ordnance Survey classification (City, Town, Village, Hamlet, etc.)","t":"`$STRING`","key$":"local_type","index$":9},"longitude":{"a":true,"fo":"double","h":"Longitude","n":"longitude","r":true,"sh":"WGS84 longitude coordinate","t":"`$NUMBER`","key$":"longitude","index$":10},"max_eastings":{"a":true,"h":"Max Eastings","n":"max_eastings","r":true,"sh":"Eastern edge of the place's bounding box (Minimum Bounding Rectangle)","t":"`$INTEGER`","key$":"max_eastings","index$":11},"max_northings":{"a":true,"h":"Max Northings","n":"max_northings","r":true,"sh":"Northern edge of the place's bounding box (Minimum Bounding Rectangle)","t":"`$INTEGER`","key$":"max_northings","index$":12},"min_eastings":{"a":true,"h":"Min Eastings","n":"min_eastings","r":true,"sh":"Western edge of the place's bounding box (Minimum Bounding Rectangle)","t":"`$INTEGER`","key$":"min_eastings","index$":13},"min_northings":{"a":true,"h":"Min Northings","n":"min_northings","r":true,"sh":"Southern edge of the place's bounding box (Minimum Bounding Rectangle)","t":"`$INTEGER`","key$":"min_northings","index$":14},"name_1":{"a":true,"h":"Name 1","n":"name_1","r":true,"sh":"Official name of the place (preserves original format, e.g., \"The Pennines\" not \"Pennines, The\")","t":"`$STRING`","key$":"name_1","index$":15},"name_1_lang":{"a":true,"h":"Name 1 Lang","n":"name_1_lang","r":true,"sh":"Language code for name_1 (cym=Welsh, eng=English, gla=Scottish Gaelic)","t":"`$STRING`","key$":"name_1_lang","index$":16},"name_2":{"a":true,"h":"Name 2","n":"name_2","r":true,"sh":"Alternative name in a different language","t":"`$STRING`","key$":"name_2","index$":17},"name_2_lang":{"a":true,"h":"Name 2 Lang","n":"name_2_lang","r":true,"sh":"Language code for name_2 (cym=Welsh, eng=English, gla=Scottish Gaelic)","t":"`$STRING`","key$":"name_2_lang","index$":18},"northings":{"a":true,"h":"Northings","n":"northings","r":true,"sh":"Ordnance Survey grid reference Northing (1m resolution, not available for Channel Islands/Isle of Man)","t":"`$INTEGER`","key$":"northings","index$":19},"outcode":{"a":true,"h":"Outcode","n":"outcode","r":true,"sh":"Postcode district (first part of the postcode)","t":"`$STRING`","key$":"outcode","index$":20},"region":{"a":true,"h":"Region","n":"region","r":true,"sh":"European Region (formerly Government Office Region) containing this place","t":"`$STRING`","key$":"region","index$":21}},"id":{"field":"id","name":"id"},"name":"place","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /places","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/places","q":{},"r":{},"s":[{"lit":"places"}],"t":{"req":"`reqdata`","res":"`body.result`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /places/{code}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"code","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/places/{code}","q":{"exist":["id"]},"r":{"param":{"code":"id"}},"s":[{"lit":"places"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.result`"},"index$":0},{"a":true,"co":{"id":"GET /random/places","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/random/places","q":{},"r":{},"s":[{"lit":"random"},{"lit":"places"}],"t":{"req":"`reqdata`","res":"`body.result`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"place","name__orig":"place","Name":"Place","name_":"place","name-":"place","NAME":"PLACE","index$":2}, {"active":true,"entity":"place","key$":"BasicPlaceFlow","kind":"basic","name":"BasicPlaceFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"place_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"place_ref01","srcdatavar":"place_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-place_ref01"}}],"index$":1}]}, 'Place', {"GET /places":{"protocol":"http","operationId":"Place Query","responses":{"200":{"description":"Success","content":{"application/json":{"schema":{"title":"Places Response","type":"object","required":["status","result"],"properties":{"status":{"enum":[200],"format":"int32","key$":"status","type":"integer"},"result":{"description":"Data for a given place","items":{"description":"A geographical location with detailed information including names, coordinates, and administrative boundaries","properties":{"code":{"description":"Unique identifier for the place record (persistent except for Section of Named/Numbered Roads)","example":"osgb4000000074559833","title":"Code","type":"string","key$":"code"},"country":{"description":"Country within Great Britain (England, Scotland, or Wales)","example":"Wales","title":"Country","type":"string","key$":"country"},"county_unitary":{"description":"County, Unitary Authority or Greater London Authority that contains this place","example":"Powys - Powys","nullable":true,"title":"Administrative Area","type":"string","key$":"county_unitary"},"county_unitary_type":{"description":"Type of administrative unit (e.g., County, UnitaryAuthority)","example":"UnitaryAuthority","nullable":true,"title":"Administrative Area Type","type":"string","key$":"county_unitary_type"},"district_borough":{"description":"District, Metropolitan District or London Borough containing this place","example":"null","nullable":true,"title":"District or Borough","type":"string","key$":"district_borough"},"district_borough_type":{"description":"Type of district/borough administrative unit","example":"null","nullable":true,"title":"Borough Type","type":"string","key$":"district_borough_type"},"eastings":{"description":"Ordnance Survey grid reference Easting (1m resolution, not available for Channel Islands/Isle of Man)","example":"322335","title":"Eastings","type":"integer","key$":"eastings"},"latitude":{"description":"WGS84 latitude coordinate","example":"52.6606391732959","format":"double","title":"Latitude","type":"number","key$":"latitude"},"local_type":{"description":"Ordnance Survey classification (City, Town, Village, Hamlet, etc.)","example":"Hamlet","title":"Local Type","type":"string","key$":"local_type"},"longitude":{"description":"WGS84 longitude coordinate","example":"-3.14971194307843","format":"double","title":"Longitude","type":"number","key$":"longitude"},"max_eastings":{"description":"Eastern edge of the place's bounding box (Minimum Bounding Rectangle)","example":"323592","title":"Maximum Eastings","type":"integer","key$":"max_eastings"},"max_northings":{"description":"Northern edge of the place's bounding box (Minimum Bounding Rectangle)","example":"308740","title":"Maximum Northings","type":"integer","key$":"max_northings"},"min_eastings":{"description":"Western edge of the place's bounding box (Minimum Bounding Rectangle)","example":"321623","title":"Minimum Eastings","type":"integer","key$":"min_eastings"},"min_northings":{"description":"Southern edge of the place's bounding box (Minimum Bounding Rectangle)","example":"306458","title":"Minimum Northings","type":"integer","key$":"min_northings"},"name_1":{"description":"Official name of the place (preserves original format, e.g., \"The Pennines\" not \"Pennines, The\")","example":"Y Trallwng","title":"Primary Name","type":"string","key$":"name_1"},"name_1_lang":{"description":"Language code for name_1 (cym=Welsh, eng=English, gla=Scottish Gaelic)","example":"cym","nullable":true,"title":"Primary Name Language","type":"string","key$":"name_1_lang"},"name_2":{"description":"Alternative name in a different language","example":"Welshpool","nullable":true,"title":"Secondary Name","type":"string","key$":"name_2"},"name_2_lang":{"description":"Language code for name_2 (cym=Welsh, eng=English, gla=Scottish Gaelic)","example":"eng","nullable":true,"title":"Secondary Name Language","type":"string","key$":"name_2_lang"},"northings":{"description":"Ordnance Survey grid reference Northing (1m resolution, not available for Channel Islands/Isle of Man)","example":"307611","title":"Northings","type":"integer","key$":"northings"},"outcode":{"description":"Postcode district (first part of the postcode)","example":"BH24","title":"Outcode","type":"string","key$":"outcode"},"region":{"description":"European Region (formerly Government Office Region) containing this place","example":"Wales","title":"Region","type":"string","key$":"region"}},"required":["code","name_1","name_1_lang","name_2","name_2_lang","local_type","outcode","county_unitary","county_unitary_type","district_borough","region","country","longitude","latitude","eastings","northings","min_eastings","min_northings","max_eastings","max_northings"],"title":"Place","type":"object","x-ref":"#/components/schemas/Place","index$":0},"key$":"result","type":"array"}},"x-ref":"#/components/schemas/PlacesResponse"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /places/{code}":{"protocol":"http","operationId":"FindPlace","responses":{"200":{"description":"Success","content":{"application/json":{"schema":{"title":"Place Response","type":"object","required":["status","result"],"properties":{"status":{"enum":[200],"format":"int32","key$":"status","type":"integer"},"result":{"description":"Data for a given place","key$":"result","properties":{"code":{"description":"Unique identifier for the place record (persistent except for Section of Named/Numbered Roads)","example":"osgb4000000074559833","title":"Code","type":"string","key$":"code"},"country":{"description":"Country within Great Britain (England, Scotland, or Wales)","example":"Wales","title":"Country","type":"string","key$":"country"},"county_unitary":{"description":"County, Unitary Authority or Greater London Authority that contains this place","example":"Powys - Powys","nullable":true,"title":"Administrative Area","type":"string","key$":"county_unitary"},"county_unitary_type":{"description":"Type of administrative unit (e.g., County, UnitaryAuthority)","example":"UnitaryAuthority","nullable":true,"title":"Administrative Area Type","type":"string","key$":"county_unitary_type"},"district_borough":{"description":"District, Metropolitan District or London Borough containing this place","example":"null","nullable":true,"title":"District or Borough","type":"string","key$":"district_borough"},"district_borough_type":{"description":"Type of district/borough administrative unit","example":"null","nullable":true,"title":"Borough Type","type":"string","key$":"district_borough_type"},"eastings":{"description":"Ordnance Survey grid reference Easting (1m resolution, not available for Channel Islands/Isle of Man)","example":"322335","title":"Eastings","type":"integer","key$":"eastings"},"latitude":{"description":"WGS84 latitude coordinate","example":"52.6606391732959","format":"double","title":"Latitude","type":"number","key$":"latitude"},"local_type":{"description":"Ordnance Survey classification (City, Town, Village, Hamlet, etc.)","example":"Hamlet","title":"Local Type","type":"string","key$":"local_type"},"longitude":{"description":"WGS84 longitude coordinate","example":"-3.14971194307843","format":"double","title":"Longitude","type":"number","key$":"longitude"},"max_eastings":{"description":"Eastern edge of the place's bounding box (Minimum Bounding Rectangle)","example":"323592","title":"Maximum Eastings","type":"integer","key$":"max_eastings"},"max_northings":{"description":"Northern edge of the place's bounding box (Minimum Bounding Rectangle)","example":"308740","title":"Maximum Northings","type":"integer","key$":"max_northings"},"min_eastings":{"description":"Western edge of the place's bounding box (Minimum Bounding Rectangle)","example":"321623","title":"Minimum Eastings","type":"integer","key$":"min_eastings"},"min_northings":{"description":"Southern edge of the place's bounding box (Minimum Bounding Rectangle)","example":"306458","title":"Minimum Northings","type":"integer","key$":"min_northings"},"name_1":{"description":"Official name of the place (preserves original format, e.g., \"The Pennines\" not \"Pennines, The\")","example":"Y Trallwng","title":"Primary Name","type":"string","key$":"name_1"},"name_1_lang":{"description":"Language code for name_1 (cym=Welsh, eng=English, gla=Scottish Gaelic)","example":"cym","nullable":true,"title":"Primary Name Language","type":"string","key$":"name_1_lang"},"name_2":{"description":"Alternative name in a different language","example":"Welshpool","nullable":true,"title":"Secondary Name","type":"string","key$":"name_2"},"name_2_lang":{"description":"Language code for name_2 (cym=Welsh, eng=English, gla=Scottish Gaelic)","example":"eng","nullable":true,"title":"Secondary Name Language","type":"string","key$":"name_2_lang"},"northings":{"description":"Ordnance Survey grid reference Northing (1m resolution, not available for Channel Islands/Isle of Man)","example":"307611","title":"Northings","type":"integer","key$":"northings"},"outcode":{"description":"Postcode district (first part of the postcode)","example":"BH24","title":"Outcode","type":"string","key$":"outcode"},"region":{"description":"European Region (formerly Government Office Region) containing this place","example":"Wales","title":"Region","type":"string","key$":"region"}},"required":["code","name_1","name_1_lang","name_2","name_2_lang","local_type","outcode","county_unitary","county_unitary_type","district_borough","region","country","longitude","latitude","eastings","northings","min_eastings","min_northings","max_eastings","max_northings"],"title":"Place","type":"object","x-ref":"#/components/schemas/Place","index$":0}},"x-ref":"#/components/schemas/PlaceResponse"}}}}},"parameters":[{"name":"code","in":"path","description":"Specifies the place you wish to query","required":true,"style":"simple","explode":false,"schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"},"GET /random/places":{"protocol":"http","operationId":"randomPlace","responses":{"200":{"description":"Successfully retrieved a random place","content":{"application/json":{"schema":{"title":"Place Response","type":"object","required":["status","result"],"properties":{"status":{"enum":[200],"format":"int32","key$":"status","type":"integer"},"result":{"description":"Data for a given place","key$":"result","properties":{"code":{"description":"Unique identifier for the place record (persistent except for Section of Named/Numbered Roads)","example":"osgb4000000074559833","title":"Code","type":"string","key$":"code"},"country":{"description":"Country within Great Britain (England, Scotland, or Wales)","example":"Wales","title":"Country","type":"string","key$":"country"},"county_unitary":{"description":"County, Unitary Authority or Greater London Authority that contains this place","example":"Powys - Powys","nullable":true,"title":"Administrative Area","type":"string","key$":"county_unitary"},"county_unitary_type":{"description":"Type of administrative unit (e.g., County, UnitaryAuthority)","example":"UnitaryAuthority","nullable":true,"title":"Administrative Area Type","type":"string","key$":"county_unitary_type"},"district_borough":{"description":"District, Metropolitan District or London Borough containing this place","example":"null","nullable":true,"title":"District or Borough","type":"string","key$":"district_borough"},"district_borough_type":{"description":"Type of district/borough administrative unit","example":"null","nullable":true,"title":"Borough Type","type":"string","key$":"district_borough_type"},"eastings":{"description":"Ordnance Survey grid reference Easting (1m resolution, not available for Channel Islands/Isle of Man)","example":"322335","title":"Eastings","type":"integer","key$":"eastings"},"latitude":{"description":"WGS84 latitude coordinate","example":"52.6606391732959","format":"double","title":"Latitude","type":"number","key$":"latitude"},"local_type":{"description":"Ordnance Survey classification (City, Town, Village, Hamlet, etc.)","example":"Hamlet","title":"Local Type","type":"string","key$":"local_type"},"longitude":{"description":"WGS84 longitude coordinate","example":"-3.14971194307843","format":"double","title":"Longitude","type":"number","key$":"longitude"},"max_eastings":{"description":"Eastern edge of the place's bounding box (Minimum Bounding Rectangle)","example":"323592","title":"Maximum Eastings","type":"integer","key$":"max_eastings"},"max_northings":{"description":"Northern edge of the place's bounding box (Minimum Bounding Rectangle)","example":"308740","title":"Maximum Northings","type":"integer","key$":"max_northings"},"min_eastings":{"description":"Western edge of the place's bounding box (Minimum Bounding Rectangle)","example":"321623","title":"Minimum Eastings","type":"integer","key$":"min_eastings"},"min_northings":{"description":"Southern edge of the place's bounding box (Minimum Bounding Rectangle)","example":"306458","title":"Minimum Northings","type":"integer","key$":"min_northings"},"name_1":{"description":"Official name of the place (preserves original format, e.g., \"The Pennines\" not \"Pennines, The\")","example":"Y Trallwng","title":"Primary Name","type":"string","key$":"name_1"},"name_1_lang":{"description":"Language code for name_1 (cym=Welsh, eng=English, gla=Scottish Gaelic)","example":"cym","nullable":true,"title":"Primary Name Language","type":"string","key$":"name_1_lang"},"name_2":{"description":"Alternative name in a different language","example":"Welshpool","nullable":true,"title":"Secondary Name","type":"string","key$":"name_2"},"name_2_lang":{"description":"Language code for name_2 (cym=Welsh, eng=English, gla=Scottish Gaelic)","example":"eng","nullable":true,"title":"Secondary Name Language","type":"string","key$":"name_2_lang"},"northings":{"description":"Ordnance Survey grid reference Northing (1m resolution, not available for Channel Islands/Isle of Man)","example":"307611","title":"Northings","type":"integer","key$":"northings"},"outcode":{"description":"Postcode district (first part of the postcode)","example":"BH24","title":"Outcode","type":"string","key$":"outcode"},"region":{"description":"European Region (formerly Government Office Region) containing this place","example":"Wales","title":"Region","type":"string","key$":"region"}},"required":["code","name_1","name_1_lang","name_2","name_2_lang","local_type","outcode","county_unitary","county_unitary_type","district_borough","region","country","longitude","latitude","eastings","northings","min_eastings","min_northings","max_eastings","max_northings"],"title":"Place","type":"object","x-ref":"#/components/schemas/Place","index$":0}},"x-ref":"#/components/schemas/PlaceResponse"}}}}},"parameters":[],"securitySource":"unspecified"}})
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
  
