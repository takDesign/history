/* global describe, expect, test */

import enzyme from 'enzyme';
import React from 'react';

import Coordinate from '../components/fieldCoordinate';

describe('Edit Album - Field Co-ordinate (React Component)', () => {
  const { shallow } = enzyme;

  const eventValue = value => ({ target: { value } });
  const reuseTest = (params) => {
    const {
      input,
      outPair,
      outLat,
      outLon,
    } = params;
    const wrapper = shallow(<Coordinate />);
    wrapper.find('#geo').simulate('change', eventValue(input));

    let actual;
    let expected;

    if (outPair) {
      actual = wrapper.find('#geoPreview').text();
      expected = outPair;

      expect(actual).toEqual(expected);
    }

    if (outLat) {
      actual = wrapper.find('#geo_lat').text();
      expected = outLat;

      expect(actual).toEqual(expected);
    }

    if (outLon) {
      actual = wrapper.find('#geo_lon').text();
      expected = outLon;

      expect(actual).toEqual(expected);
    }
  };

  /* eslint-disable object-curly-newline */
  test('* Invalid value', () => reuseTest({ input: 'invalid', outPair: '', outLat: '', outLon: '' }));
  test('* Missing latitude', () => reuseTest({ input: ', 1', outPair: '', outLat: '', outLon: '' }));
  test('* Missing longitude', () => reuseTest({ input: '0,', outPair: '', outLat: '', outLon: '' }));
  test('* Valid co-ordinate', () => reuseTest({ input: '0, 1', outPair: '0, 1', outLat: '0', outLon: '1' }));
  test('* Vancouver co-ordinate', () => reuseTest({ input: '49.25, -123.1', outPair: '49.25, -123.1', outLat: '49.25', outLon: '-123.1' }));
  test('* Lima co-ordinate', () => reuseTest({ input: '-12.043, -77.028', outPair: '-12.043, -77.028', outLat: '-12.043', outLon: '-77.028' }));
  test('* Tokyo co-ordinate', () => reuseTest({ input: '35.683, 139.683', outPair: '35.683, 139.683', outLat: '35.683', outLon: '139.683' }));
  test('* Sydney co-ordinate', () => reuseTest({ input: '-33.865, 151.209', outPair: '-33.865, 151.209', outLat: '-33.865', outLon: '151.209' }));
  test('* Libreville co-ordinate', () => reuseTest({ input: '0.42, 9.46', outPair: '0.42, 9.46', outLat: '0.42', outLon: '9.46' }));
  /* eslint-enable object-curly-newline */
});
