import React from 'react';
import { Link } from 'react-router';
import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import { Entity, Scene } from 'aframe-react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Sound from 'react-sound';
import { toPeerRoom, toBotRoom } from '../util';

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Scene>

        <a-assets>
          <img id="peerRoomTexture" src="images/peer-room.png" />
          <img id="botRoomTexture" src="images/bot-room.png" />
          <img id="skyTexture" src="images/office.jpg" />
        </a-assets>

        <Entity
          primitive="a-plane"
          src="#peerRoomTexture"
          width="1"
          height=".5"
          position={{ x: 0, y: 0, z: -2 }}
          events={{ click: toPeerRoom }}>
          <a-animation begin="mouseenter" end="mouseleave" fill="forwards" repeat="0"
            direction="normal" attribute="scale" from="1 1 1"
            to="2.5 2.5 1.5" dur="1000"></a-animation>
          <a-animation begin="mouseleave" end="mouseenter" repeat="0" fill="forwards"
            direction="normal" attribute="scale"
            to="1 1 1" dur="1000"></a-animation>
          <Entity text={{ value: 'Peer Room', align: 'center', color: 'blue' }} position={{ x: 0, y: .1, z: 1 }} />
        </Entity>

        <Entity
          primitive="a-plane"
          src="#botRoomTexture"
          width="1"
          height=".5"
          position={{ x: 2, y: 0, z: 0 }}
          rotation={{ x: 0, y: -90, z: 0 }}
          events={{ click: toBotRoom }}>
          <a-animation begin="mouseenter" end="mouseleave" fill="forwards" repeat="0"
            direction="normal" attribute="scale" from="1 1 1"
            to="2.5 2.5 1.5" dur="1000"></a-animation>
          <a-animation begin="mouseleave" end="mouseenter" repeat="0" fill="forwards"
            direction="normal" attribute="scale"
            to="1 1 1" dur="1000"></a-animation>
          <Entity text={{ value: 'Bot Room', align: 'center', color: 'blue' }} position={{ x: 0, y: .1, z: 1 }} />
        </Entity>


        <a-entity camera mouse-cursor look-controls rotation="0 -40 0">
          <a-cursor color="black" />
        </a-entity>
        <Sound
          url="/music/lobby-music.mp3"
          playStatus={Sound.status.PLAYING}
        />
      </Scene>
    )
  }
}

export default connect(null, null)(HomeComponent);