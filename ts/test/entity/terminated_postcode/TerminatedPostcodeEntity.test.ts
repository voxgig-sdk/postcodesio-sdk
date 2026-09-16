

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


describe('TerminatedPostcodeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POSTCODESIO_TEST_LIVE=TRUE.
  afterEach(liveDelay('POSTCODESIO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PostcodesioSDK.test()
    const ent = testsdk.TerminatedPostcode()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POSTCODESIO_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'terminated_postcode.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"result","req":true,"short":"Data for a given postcode","type":"`$ARRAY`","index$":1},{"active":true,"format":"int32","name":"status","req":true,"type":"`$INTEGER`","index$":2}],"id":{"field":"id","name":"id"},"name":"terminated_postcode","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"postcode","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /terminated_postcodes/{postcode}","json":"{\"operationId\":\"LookupTerminatedPostcode\",\"parameters\":[{\"description\":\"Postcode to query\",\"explode\":false,\"in\":\"path\",\"name\":\"postcode\",\"required\":true,\"schema\":{\"type\":\"string\"},\"style\":\"simple\"}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"result\":{\"description\":\"Data for a given postcode\",\"items\":{\"properties\":{\"latitude\":{\"description\":\"WGS84 latitude coordinate of the postcode location.\",\"example\":53.53513,\"format\":\"double\",\"maximum\":90,\"minimum\":-90,\"title\":\"Latitude\",\"type\":\"number\"},\"longitude\":{\"description\":\"WGS84 longitude coordinate of the postcode location.\",\"example\":-2.496903,\"format\":\"double\",\"maximum\":180,\"minimum\":-180,\"title\":\"Longitude\",\"type\":\"number\"},\"month_terminated\":{\"description\":\"Month when the postcode was terminated (1-12, where 1=January, 12=December).\",\"enum\":[1,2,3,4,5,6,7,8,9,10,11,12],\"example\":1,\"format\":\"int32\",\"maximum\":12,\"minimum\":1,\"title\":\"Termination month\",\"type\":\"integer\"},\"postcode\":{\"description\":\"UK postal code format that has been terminated. Follows the standard format of 2-4 character outward code, a space, then 3-character inward code.\",\"example\":\"SW1A 2AA\",\"pattern\":\"^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2}$\",\"title\":\"Postcode\",\"type\":\"string\"},\"year_terminated\":{\"description\":\"The year when the postcode was terminated (YYYY format).\",\"example\":2019,\"format\":\"int32\",\"minimum\":1900,\"title\":\"Termination year\",\"type\":\"integer\"}},\"required\":[\"postcode\",\"year_terminated\",\"month_terminated\",\"longitude\",\"latitude\"],\"type\":\"object\"},\"type\":\"array\"},\"status\":{\"enum\":[200],\"format\":\"int32\",\"type\":\"integer\"}},\"required\":[\"status\",\"result\"],\"title\":\"Terminated Postcode Response\",\"type\":\"object\"}}},\"description\":\"Success\"},\"404\":{\"description\":\"Postcode not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/terminated_postcodes/{postcode}","rename":{"param":{"postcode":"id"}},"segments":[{"lit":"terminated_postcodes"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"terminated_postcode","name__orig":"terminated_postcode","Name":"TerminatedPostcode","name_":"terminated_postcode","name-":"terminated-postcode","NAME":"TERMINATED_POSTCODE","index$":5}, {"active":true,"entity":"terminated_postcode","key$":"BasicTerminatedPostcodeFlow","kind":"basic","name":"BasicTerminatedPostcodeFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"terminated_postcode_ref01","srcdatavar":"terminated_postcode_ref01_data","suffix":"_dt0"},"match":{"id":"terminated_postcode01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-terminated_postcode_ref01"}}],"index$":0}]}, 'TerminatedPostcode')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let terminated_postcode_ref01_data = Object.values(setup.data.existing.terminated_postcode)[0] as any

    // LOAD
    const terminated_postcode_ref01_ent = client.TerminatedPostcode()
    const terminated_postcode_ref01_match_dt0: any = {}
    terminated_postcode_ref01_match_dt0.id = terminated_postcode_ref01_data.id
    const terminated_postcode_ref01_data_dt0 = (await terminated_postcode_ref01_ent.load(terminated_postcode_ref01_match_dt0)).data()
    assert(terminated_postcode_ref01_data_dt0.id === terminated_postcode_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/terminated_postcode/TerminatedPostcodeTestData.json')

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
    ['terminated_postcode01','terminated_postcode02','terminated_postcode03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POSTCODESIO_TEST_TERMINATED_POSTCODE_ENTID': idmap,
    'POSTCODESIO_TEST_LIVE': 'FALSE',
    'POSTCODESIO_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POSTCODESIO_TEST_TERMINATED_POSTCODE_ENTID']

  const live = 'TRUE' === env.POSTCODESIO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POSTCODESIO_TEST_TERMINATED_POSTCODE_ENTID']
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
  
