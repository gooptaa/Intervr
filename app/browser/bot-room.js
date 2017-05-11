import React from 'react'
import { Link } from 'react-router'
import aframe from 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router'

class BotRoomComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Scene>

          <a-assets>
            <img id="skyTexture" src="images/bot-room.jpg"/>
          </a-assets>

          <Entity primitive="a-sky" src="#skyTexture" rotation="0 -130 0" />

          <a-entity camera mouse-cursor look-controls rotation="0 -40 0">
            <a-cursor color="black"/>
          </a-entity>
        </Scene>
      )
  }
}

export default connect(null, null)(BotRoomComponent);