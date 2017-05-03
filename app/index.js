import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.jsx';
import '../public/stylesheets/index.scss'

ReactDOM.render(
  <Provider store={store}>
    <div>This is where the stuff and the things go!</div>
    {/* rest of your app goes here! */}
  </Provider>,
  document.getElementById('app')
);

