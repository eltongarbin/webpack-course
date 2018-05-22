import { createStore, compose, applyMiddleware } from 'redux';
import { fetchArticle } from './reducers';
import thunk from 'redux-thunk';

const composeEnhancers =
  typeof window == 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export default (initialState) => {
  const store = createStore(fetchArticle, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers').fetchArticle);
    });
  }

  return store;
};
