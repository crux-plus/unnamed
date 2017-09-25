// A declarative, efficient, and flexible JavaScript library for building user interfaces.
import ReactDOM from 'react-dom';
import React from 'react';

// Predictable state container for JavaScript apps.
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Declarative routing for React.
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

// A collection of HTML element and attribute style-normalizations
import 'normalize.css/normalize.css';
import 'semantic-ui-css/semantic.css';
import 'styles/entry.css';

// Renders the first child <Route> or <Redirect> that matches the location.
import IndexSwitch from 'routers/IndexSwitch';
import routers from 'reducers/routers/routers';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    routing: routerReducer,
    ...routers,
  }),
  composeWithDevTools(
    // other store enhancers if any
    applyMiddleware(),
  ),
);

// Mount the component to the DOM.
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={IndexSwitch} />
    </Router>
  </Provider>,
  document.querySelector('main'),
);
