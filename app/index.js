import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import '../public/stylesheets/index.scss';
import {Room} from './browser/room';
import {Router, browserHistory, Route} from 'react-router';
import {generateWebRTC} from './webrtc/client';
import {randomToken} from './util';

function onRoomEnter(){
  var room = window.location.hash.substring(1);
  if (!room) {
    room = window.location.hash = randomToken();
  }
  generateWebRTC(room);
}

ReactDOM.render(
  <Provider store={store}>
   <Router history={browserHistory}>
    <Route path="/" component={Room} onEnter={onRoomEnter}/>
   </Router>
  </Provider>,
  document.getElementById('app')
);

