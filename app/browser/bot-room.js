import React from 'react'
import { Link } from 'react-router'
import aframe from 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router'
import Bot from '../bot/bot';

class BotRoomComponent extends React.Component {
  constructor(props) {
    super(props);
  }

 componentDidMount() {
   this.props.getAllQuestions()
   const interviewer = new Bot();
   interviewer.setup(this.props.bot)
  }

  render() {
    return (
        <Scene>

          <a-assets>
            <img id="skyTexture" src="images/bot-room.jpg"/>
            <a-asset-item id="person-obj" src="objects/person.obj" />
            <a-asset-item id="person-mtl" src="objects/person.mtl" />
          </a-assets>

          <Entity primitive="a-sky" src="#skyTexture" rotation="0 -130 0" />
          <a-entity obj-model="obj: #person-obj; mtl: #person-mtl" position="9 -7.4 -5" rotation="0 -45 0" scale="2 2 2" />
          <Entity text={{value: 'Next', align: 'center', color: 'black' }} position={{x: 3.237, y: -0.612, z: -1}} scale="4 4 4" rotation="0 -45 0"/>
           <Entity
              primitive="a-plane"
              color="white"
              width="1"
              height=".5"
              position={{x: 4.389, y: -0.807, z: -1.332}}
              rotation="0 -45 0"
              scale=".5 .5 1"
              events={{click: console.log('clicked')}}>
          </Entity>
          <a-entity camera mouse-cursor look-controls rotation="-5 -60 0">
            <a-cursor color="black"/>
          </a-entity>
        </Scene>
      )
  }
}


import {getAllQuestions} from '../reducers/bot';

export default connect(({bot}) => ({bot}), ({getAllQuestions}))(BotRoomComponent);
