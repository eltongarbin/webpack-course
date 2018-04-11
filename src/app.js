import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import AppRoot from './components/AppRoot';

function render(Component) {
  ReactDOM.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
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
