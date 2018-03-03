/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import PathConfig from 'lib/_utils/PathConfig'

describe('utils/PathConfig', () => {
  it('should create PathConfig file', () => {
    expect(format(PathConfig())).toMatchSnapshot();
  });
});
