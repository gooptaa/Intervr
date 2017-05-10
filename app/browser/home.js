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
    //browserHistory.push('/peer-room');
  }

  render() {
    return (
        <Scene>

          <a-assets>
            <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg"/>
            <img id="skyTexture" src="images/office.jpg"/>
          </a-assets>

        <Entity
            primitive="a-box"
            src="#groundTexture"
            width="1"
            height=".5"
            position={{x: 0, y: 0, z: -2}}
            events={{click: this.goToPeerRoom}}>
          <Entity text={{value: 'Peer Room', align: 'center'}} position={{x: 0, y: .5, z: 0}}/>
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