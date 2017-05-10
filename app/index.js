import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import store from './store';
import '../public/stylesheets/index.scss';
import Room from './browser/room';
import Home from './browser/home';
import {Router, browserHistory, Route} from 'react-router';
import {generateWebRTC} from './webrtc/client';
import {randomToken} from './util';
import {setWebRTC} from './reducers/webrtc';

const RoutesComponent = ({onRoomEnter}) => (
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
    <Route path="/peer-room" component={Room} onEnter={onRoomEnter}/>
  </Router>
)

const mapProps = null;
const mapDispatch = (dispatch, ownProps) => ({
  onRoomEnter: (nextRouterState) => {
    var room = window.location.hash.substring(1);
    if (!room) {
      room = window.location.hash = randomToken();
    }
    dispatch(setWebRTC(generateWebRTC(room)));
  }
});

const Routes = connect(mapProps, mapDispatch)(RoutesComponent);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);
