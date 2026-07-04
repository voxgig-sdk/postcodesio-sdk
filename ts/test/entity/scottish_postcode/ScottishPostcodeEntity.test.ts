
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { PostcodesioSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


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
      if (maybeSkipControl(t, 'entityOp', 'scottish_postcode.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set POSTCODESIO_TEST_SCOTTISH_POSTCODE_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let scottish_postcode_ref01_data = Object.values(setup.data.existing.scottish_postcode)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const scottish_postcode_ref01_ent = client.ScottishPostcode()


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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['POSTCODESIO_TEST_SCOTTISH_POSTCODE_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'POSTCODESIO_TEST_SCOTTISH_POSTCODE_ENTID': idmap,
    'POSTCODESIO_TEST_LIVE': 'FALSE',
    'POSTCODESIO_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POSTCODESIO_TEST_SCOTTISH_POSTCODE_ENTID']

  const live = 'TRUE' === env.POSTCODESIO_TEST_LIVE

  if (live) {
    client = new PostcodesioSDK(merge([
      {
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
