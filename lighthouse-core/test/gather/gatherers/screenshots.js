/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

/* eslint-env mocha */

const ScreenshotsGather = require('../../../gather/computed/screenshots');
const assert = require('assert');
const pwaTrace = require('../../fixtures/traces/progressive-app.json');

let screenshotsGather = new ScreenshotsGather();

describe('Screenshot gatherer', () => {
  it('returns an artifact for a real trace', () => {
    // Currently this test must rely on knowing the phase hook for the gatherer.
    // A little unfortunate, but we need a "run scheduler with this gatherer, this mocked driver,
    // and this trace" test class to do that right
    return screenshotsGather.request(pwaTrace).then(screenshots => {
      assert.ok(Array.isArray(screenshots));
      assert.equal(screenshots.length, 7);

      const firstScreenshot = screenshots[0];
      assert.ok(firstScreenshot.datauri.startsWith('data:image/jpg;base64,'));
      assert.ok(firstScreenshot.datauri.length > 42);
    });
  });
});
