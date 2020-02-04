/* global beforeAll, describe, expect, test */
import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import Footer from '..';
import configureStore from '../../../configureStore';

describe('<Footer />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  test('should render and match the snapshot', () => {
    const renderedComponent = renderer
      .create(
        <Provider store={store}>
          <IntlProvider locale="en">
            <Footer />
          </IntlProvider>
        </Provider>,
      )
      .toJSON();

    expect(renderedComponent).toMatchSnapshot();
  });
});
