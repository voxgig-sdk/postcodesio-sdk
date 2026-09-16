

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0}],"id":{"field":"id","name":"id"},"name":"outcode","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"SW1A","kind":"param","name":"id","orig":"outcode","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /outcodes/{outcode}","json":"{\"operationId\":\"FindOutcode\",\"parameters\":[{\"description\":\"Specifies the outward code you wish to query.\",\"example\":\"SW1A\",\"explode\":false,\"in\":\"path\",\"name\":\"outcode\",\"required\":true,\"schema\":{\"type\":\"string\"},\"style\":\"simple\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"result\":{\"description\":\"Comprehensive geographical and administrative data for the specified outcode, including location coordinates, administrative boundaries, and related postal information\",\"oneOf\":[{\"properties\":{\"admin_county\":{\"description\":\"Administrative counties within this outcode.\",\"example\":[],\"items\":{\"type\":\"string\"},\"title\":\"Administrative County\",\"type\":\"array\"},\"admin_district\":{\"description\":\"District/unitary authorities within this outcode.\",\"example\":[\"Westminster\",\"Wandsworth\"],\"items\":{\"type\":\"string\"},\"title\":\"District\",\"type\":\"array\"},\"admin_ward\":{\"description\":\"Administrative/electoral wards within this outcode.\",\"example\":[\"Nine Elms\",\"St. James's\"],\"items\":{\"type\":\"string\"},\"title\":\"Ward\",\"type\":\"array\"},\"country\":{\"description\":\"Countries within this outcode.\",\"example\":[\"England\"],\"items\":{\"type\":\"string\"},\"title\":\"Country\",\"type\":\"array\"},\"eastings\":{\"description\":\"Ordnance Survey eastings coordinate (1m resolution). Returns 0 if location unavailable.\",\"example\":529740,\"format\":\"int32\",\"nullable\":true,\"title\":\"Eastings\",\"type\":\"number\"},\"latitude\":{\"description\":\"WGS84 latitude coordinate. May be null if location unavailable.\",\"example\":51.50464,\"format\":\"double\",\"nullable\":true,\"title\":\"Latitude\",\"type\":\"number\"},\"longitude\":{\"description\":\"WGS84 longitude coordinate. May be null if location unavailable.\",\"example\":-0.132066,\"format\":\"double\",\"nullable\":true,\"title\":\"Longitude\",\"type\":\"number\"},\"northings\":{\"description\":\"Ordnance Survey northings coordinate (1m resolution). Returns 0 if location unavailable.\",\"example\":180066,\"format\":\"int32\",\"nullable\":true,\"title\":\"Northings\",\"type\":\"number\"},\"outcode\":{\"description\":\"First part of the postcode before the space (e.g., \\\"SW1A\\\" in \\\"SW1A 1AA\\\"). Usually 2-4 characters.\",\"example\":\"SW1A\",\"title\":\"Outcode\",\"type\":\"string\"},\"parish\":{\"description\":\"Parishes (England) or communities (Wales) within this outcode.\",\"example\":[\"Wandsworth, unparished area\",\"Westminster, unparished area\"],\"items\":{\"type\":\"string\"},\"title\":\"Parish\",\"type\":\"array\"}},\"required\":[\"outcode\",\"eastings\",\"northings\",\"admin_county\",\"admin_district\",\"admin_ward\",\"longitude\",\"latitude\",\"country\",\"parish\"]}]},\"status\":{\"enum\":[200],\"format\":\"int32\",\"type\":\"integer\"}},\"required\":[\"status\",\"result\"],\"title\":\"Outcode Response\",\"type\":\"object\"}}},\"description\":\"Success\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/outcodes/{outcode}","rename":{"param":{"outcode":"id"}},"segments":[{"lit":"outcodes"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body.result`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"outcode","name__orig":"outcode","Name":"Outcode","name_":"outcode","name-":"outcode","NAME":"OUTCODE","index$":1}, {"active":true,"entity":"outcode","key$":"BasicOutcodeFlow","kind":"basic","name":"BasicOutcodeFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"outcode_ref01","srcdatavar":"outcode_ref01_data","suffix":"_dt0"},"match":{"id":"outcode01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-outcode_ref01"}}],"index$":0}]}, 'Outcode')
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
  
