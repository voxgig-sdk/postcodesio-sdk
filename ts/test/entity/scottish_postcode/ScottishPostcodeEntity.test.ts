

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


describe('ScottishPostcodeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POSTCODESIO_TEST_LIVE=TRUE.
  afterEach(liveDelay('POSTCODESIO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PostcodesioSDK.test()
    const ent = testsdk.ScottishPostcode()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POSTCODESIO_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'scottish_postcode.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0},"result":{"a":true,"h":"Result","n":"result","r":true,"sh":"Data for a given postcode","t":"`$ARRAY`","key$":"result","index$":1},"status":{"a":true,"fo":"int32","h":"Status","n":"status","r":true,"t":"`$INTEGER`","key$":"status","index$":2}},"id":{"field":"id","name":"id"},"name":"scottish_postcode","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /scotland/postcodes/{postcode}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"postcode","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/scotland/postcodes/{postcode}","q":{"exist":["id"]},"r":{"param":{"postcode":"id"}},"s":[{"lit":"scotland"},{"lit":"postcodes"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"scottish_postcode","name__orig":"scottish_postcode","Name":"ScottishPostcode","name_":"scottish_postcode","name-":"scottish-postcode","NAME":"SCOTTISH_POSTCODE","index$":4}, {"active":true,"entity":"scottish_postcode","key$":"BasicScottishPostcodeFlow","kind":"basic","name":"BasicScottishPostcodeFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"scottish_postcode_ref01","srcdatavar":"scottish_postcode_ref01_data","suffix":"_dt0"},"m":{"id":"scottish_postcode01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-scottish_postcode_ref01"}}],"index$":0}]}, 'ScottishPostcode', {"GET /scotland/postcodes/{postcode}":{"protocol":"http","operationId":"getScottishPostcode","responses":{"200":{"description":"Success","content":{"application/json":{"schema":{"title":"Scottish Postcodes Response","type":"object","required":["status","result"],"properties":{"status":{"type":"integer","format":"int32","enum":[200],"key$":"status"},"result":{"type":"array","items":{"required":["postcode","scottish_parliamentary_constituency","codes"],"properties":{"postcode":{"type":"string","title":"Postcode","description":"The Royal Mail postcode associated with this location (e.g., IV2 7JB)","example":"IV2 7JB","pattern":"^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$"},"scottish_parliamentary_constituency":{"type":"string","title":"Scottish Parliamentary Constituency","description":"The name of the 2014 Scottish Parliamentary Constituency for this location","example":"Inverness and Nairn"},"codes":{"type":"object","title":"Location Codes","description":"Official identification codes associated with this postcode location","properties":{"scottish_parliamentary_constituency":{"type":"string","title":"Scottish Parliamentary Constituency Code","description":"The 9-character GSS/ONS code identifying the 2014 Scottish Parliamentary Constituency (format: S#######)","example":"S16000125","pattern":"^S[0-9]{8}$"}}}},"x-ref":"#/components/schemas/ScottishPostcodes"},"description":"Data for a given postcode","key$":"result"}},"x-ref":"#/components/schemas/ScottishPostcodeResponse","index$":0}}}},"404":{"description":"Postcode not found"}},"parameters":[{"name":"postcode","in":"path","description":"Specifies the postcode you wish to query","required":true,"style":"simple","explode":false,"schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let scottish_postcode_ref01_data = Object.values(setup.data.existing.scottish_postcode)[0] as any

    // LOAD
    const scottish_postcode_ref01_ent = client.ScottishPostcode()
    const scottish_postcode_ref01_match_dt0: any = {}
    scottish_postcode_ref01_match_dt0.id = scottish_postcode_ref01_data.id
    const scottish_postcode_ref01_data_dt0 = (await scottish_postcode_ref01_ent.load(scottish_postcode_ref01_match_dt0)).data()
    assert(scottish_postcode_ref01_data_dt0.id === scottish_postcode_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/scottish_postcode/ScottishPostcodeTestData.json')

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
    ['scottish_postcode01','scottish_postcode02','scottish_postcode03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POSTCODESIO_TEST_SCOTTISH_POSTCODE_ENTID': idmap,
    'POSTCODESIO_TEST_LIVE': 'FALSE',
    'POSTCODESIO_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POSTCODESIO_TEST_SCOTTISH_POSTCODE_ENTID']

  const live = 'TRUE' === env.POSTCODESIO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POSTCODESIO_TEST_SCOTTISH_POSTCODE_ENTID']
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
  
