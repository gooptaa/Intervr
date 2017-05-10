import React from 'react'
import { Link } from 'react-router'
import aframe from 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router'

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  goToPeerRoom(){
    browserHistory.push('/peer-room');
  }

  render() {
    return (
        <Scene>

          <a-assets>
            <img id="peerRoomTexture" src="images/peer-room.png"/>
            <img id="skyTexture" src="images/office.jpg"/>
          </a-assets>

        <Entity
            primitive="a-box"
            src="#peerRoomTexture"
            width="1"
            height=".5"
            position={{x: 0, y: 0, z: -2}}
            events={{click: this.goToPeerRoom}}>
        <a-animation begin="mouseenter" end="mouseleave" fill="forwards" repeat="0"
         direction="normal" attribute="scale" from="1 1 1"
         to="1.5 1.5 1.5" dur="1000"></a-animation>
         <a-animation begin="mouseleave" end="mouseenter" repeat="0" fill="forwards"
          direction="normal" attribute="scale"
          to="1 1 1" dur="1000"></a-animation>
          <Entity text={{value: 'Peer Room', align: 'center'}} position={{x: 0, y: .125, z: 1}}/>
        </Entity>

          <Entity primitive="a-sky" src="#skyTexture" rotation="0 -130 0" />
          <a-entity camera mouse-cursor look-controls>
            <a-cursor color="black"/>
          </a-entity>
        </Scene>
      )
  }
}

export default connect(null, null)(HomeComponent);