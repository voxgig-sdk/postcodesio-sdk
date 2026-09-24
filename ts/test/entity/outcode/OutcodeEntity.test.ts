

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


describe('OutcodeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POSTCODESIO_TEST_LIVE=TRUE.
  afterEach(liveDelay('POSTCODESIO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PostcodesioSDK.test()
    const ent = testsdk.Outcode()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POSTCODESIO_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'outcode.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"outcode","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /outcodes/{outcode}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"SW1A","k":"param","n":"id","or":"outcode","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/outcodes/{outcode}","q":{"exist":["id"]},"r":{"param":{"outcode":"id"}},"s":[{"lit":"outcodes"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.result`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"outcode","name__orig":"outcode","Name":"Outcode","name_":"outcode","name-":"outcode","NAME":"OUTCODE","index$":1}, {"active":true,"entity":"outcode","key$":"BasicOutcodeFlow","kind":"basic","name":"BasicOutcodeFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"outcode_ref01","srcdatavar":"outcode_ref01_data","suffix":"_dt0"},"m":{"id":"outcode01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-outcode_ref01"}}],"index$":0}]}, 'Outcode', {"GET /outcodes/{outcode}":{"protocol":"http","operationId":"FindOutcode","responses":{"200":{"description":"Success","content":{"application/json":{"schema":{"title":"Outcode Response","type":"object","required":["status","result"],"properties":{"status":{"type":"integer","format":"int32","enum":[200]},"result":{"description":"Comprehensive geographical and administrative data for the specified outcode, including location coordinates, administrative boundaries, and related postal information","oneOf":[{"required":["outcode","eastings","northings","admin_county","admin_district","admin_ward","longitude","latitude","country","parish"],"properties":{"outcode":{"title":"Outcode","type":"string","description":"First part of the postcode before the space (e.g., \"SW1A\" in \"SW1A 1AA\"). Usually 2-4 characters.","example":"SW1A"},"eastings":{"title":"Eastings","type":"number","format":"int32","nullable":true,"description":"Ordnance Survey eastings coordinate (1m resolution). Returns 0 if location unavailable.","example":529740},"northings":{"title":"Northings","type":"number","format":"int32","nullable":true,"description":"Ordnance Survey northings coordinate (1m resolution). Returns 0 if location unavailable.","example":180066},"admin_county":{"title":"Administrative County","type":"array","items":{"type":"string"},"description":"Administrative counties within this outcode.","example":[]},"admin_district":{"title":"District","type":"array","items":{"type":"string"},"description":"District/unitary authorities within this outcode.","example":["Westminster","Wandsworth"]},"admin_ward":{"title":"Ward","type":"array","items":{"type":"string"},"description":"Administrative/electoral wards within this outcode.","example":["Nine Elms","St. James's"]},"longitude":{"title":"Longitude","type":"number","format":"double","nullable":true,"description":"WGS84 longitude coordinate. May be null if location unavailable.","example":-0.132066},"latitude":{"title":"Latitude","type":"number","format":"double","nullable":true,"description":"WGS84 latitude coordinate. May be null if location unavailable.","example":51.50464},"country":{"title":"Country","type":"array","items":{"type":"string"},"description":"Countries within this outcode.","example":["England"]},"parish":{"title":"Parish","type":"array","items":{"type":"string"},"description":"Parishes (England) or communities (Wales) within this outcode.","example":["Wandsworth, unparished area","Westminster, unparished area"]}},"x-ref":"#/components/schemas/Outcode"}]}},"x-ref":"#/components/schemas/OutcodeResponse"}}}}},"parameters":[{"name":"outcode","in":"path","description":"Specifies the outward code you wish to query.","required":true,"example":"SW1A","style":"simple","explode":false,"schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let outcode_ref01_data = Object.values(setup.data.existing.outcode)[0] as any

    // LOAD
    const outcode_ref01_ent = client.Outcode()
    const outcode_ref01_match_dt0: any = {}
    outcode_ref01_match_dt0.id = outcode_ref01_data.id
    const outcode_ref01_data_dt0 = (await outcode_ref01_ent.load(outcode_ref01_match_dt0)).data()
    assert(outcode_ref01_data_dt0.id === outcode_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/outcode/OutcodeTestData.json')

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
    ['outcode01','outcode02','outcode03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POSTCODESIO_TEST_OUTCODE_ENTID': idmap,
    'POSTCODESIO_TEST_LIVE': 'FALSE',
    'POSTCODESIO_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POSTCODESIO_TEST_OUTCODE_ENTID']

  const live = 'TRUE' === env.POSTCODESIO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POSTCODESIO_TEST_OUTCODE_ENTID']
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
  
