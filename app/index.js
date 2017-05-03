import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import '../public/stylesheets/index.scss';
import {Room} from './browser/room';

ReactDOM.render(
  <Provider store={store}>
   <Router history={browserHistory}>
    <Route path="/" component={Room} />
   </Router>
  </Provider>,
  document.getElementById('app')
);

