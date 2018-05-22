import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import AppRoot from './components/AppRoot';
import configureStore from './store';
import { actionTest } from './actions';

const store = configureStore({});

function render(Component) {
  ReactDOM.hydrate(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('react-root')
  );
}

render(AppRoot);

if (module.hot) {
  module.hot.accept('./components/AppRoot.js', () => {
    const NewAppRoot = require('./components/AppRoot.js').default;
    render(NewAppRoot);
  });
}
