import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import store from './store';
import '../public/stylesheets/index.scss';
import {Router, browserHistory, Route, Redirect} from 'react-router';
import {generateWebRTC} from './webrtc/client';
import {setWebRTC} from './reducers/webrtc';
import {updateRoom} from './reducers/self';
import Room from './browser/room';
import Home from './browser/home';
import BotRoom from './browser/bot-room';
import Launch from './browser/launch';

const RoutesComponent = ({onRoomEnter, onPeerRoomEnter}) => (
  <Router history={browserHistory}>
    <Route path="/" component={Launch} />
    <Route path="/lobby" component={Home} />
    {/*<Redirect path="/peer-room" to={`/peer-room/${store.getState().self.room}`} />
    <Route path="/peer-room/:roomName" component={Room} onEnter={onRoomEnter}/>*/}
    <Route path="/peer-room" component={Room} onEnter={onPeerRoomEnter} />
    <Route path="/bot-room" component={BotRoom} />
  </Router>
)

const mapProps = null;
const mapDispatch = (dispatch, ownProps) => ({
  onRoomEnter: (nextRouterState) => {
    dispatch(setWebRTC(generateWebRTC(nextRouterState.params.roomName)));
  },
  onPeerRoomEnter: (nextRouterState) => {
    var room = window.location.hash.substring(1);
    if (!room) {
      window.location.hash = store.getState().self.room;
    } else {
      dispatch(updateRoom(room));
      dispatch(setWebRTC(generateWebRTC(room)));
    }
  }
});

const Routes = connect(mapProps, mapDispatch)(RoutesComponent);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);
