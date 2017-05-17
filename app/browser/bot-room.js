import React from 'react'
import { Link } from 'react-router'
import aframe from 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import { Entity, Scene } from 'aframe-react';
import { connect } from 'react-redux';
import Bot from '../bot/bot';
import axios from 'axios';
import Promise from 'bluebird'
import Assets from './assets';
import { toLobby } from '../util';

class BotRoomComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.interviewer = null
    this.onClick = this.onClick.bind(this)
    this.onPause = this.onPause.bind(this)
  }

  componentDidMount() {

    let general = axios.get('api/general')
      .then((res) => res.data)
    let intro = axios.get('api/intro')
      .then((res) => res.data)
    let technical = axios.get('api/technical')
      .then((res) => res.data)

    Promise.all([general, intro, technical])
      .spread((general, intro, technical) => {
        let username = this.props.self.handle || ''
        this.interviewer = new Bot(username, document)
        this.interviewer.setup({
          general: general,
          intro: intro,
          technical: technical,
        })
    })
  }

  componentWillUnmount() {
    if (this.interviewer) {
      this.interviewer.end();
    }
  }

  onClick() {
    this.interviewer.next(this.interviewer.getNextType())
  }

  onPause() {
    this.interviewer.pause();
  }

  render() {
    return (
      <Scene>
        <Assets />

        {/* Cups */}
        <Entity obj-model="obj: #cup-obj; mtl: #cup-mtl" position="1.13 0.85 -0.24" scale="0.08 0.08 0.08" rotation="0 90 0" />
        <Entity obj-model="obj: #cup-obj; mtl: #cup-mtl" position="0.4 0.85 0.2" scale="0.05 0.05 0.05" rotation="0 -90 0" />

        {/* Resume */}
        <a-box color="black" depth="0.76" height="0.12" width="0.53" position="1.45 0.7 0.15"></a-box>
        <a-box color="white" depth="0.35" height="0.13" width="0.5" position="1.45 0.7 -0.03"></a-box>
        <a-box color="white" depth="0.35" height="0.13" width="0.5" position="1.45 0.7 0.335"></a-box>
        <a-box color="black" depth="0.32" height="0.12" width="0.32" position="0.43 0.7 -0.03" rotation="0 15 0"></a-box>
        <a-box color="white" depth="0.3" height="0.13" width="0.3" position="0.43 0.7 -0.03" rotation="0 15 0"></a-box>

        {/* Planes */}
        <a-box color="#66CCFF" repeat="14 14" position="-1.45 0 -7" rotation="0 0 0" height="10" width="14" scale="0.8 1 1" />
        <a-box color="#66CCFF" repeat="14 14" position="-1.7 0.12 7" rotation="0 180 0" height="10" width="14" scale="0.8 1 1" />
        <a-box color="#66CCFF" repeat="14 14" position="4 0 0" rotation="0 -90 0" height="10" width="14" />
        <a-box color="#66CCFF" repeat="14 14" position="-7 0 -0.35" rotation="0 90 0" height="10" width="14" scale="1 1 1" />
        <a-plane src="#floor" repeat="14 14" position="-1.3 5 0.2" rotation="90 0 0" height="10" width="14" scale="0.9 1.4 0.9" />
        <a-plane src="#floor" rotation="-90 0 0" position="-1.5 0 0" height="14" width="14" scale="0.85 1 0.8" />

        {/* Single Objects */}
        <Entity obj-model="obj: #couch-obj; mtl: #couch-mtl" position="-3 0.14 -6" scale="1 1 1" />
        <Entity obj-model="obj: #table-obj; mtl: #table-mtl" position="2 0.97 -0.66" scale="0.0018 0.0015 0.0025" />
        <Entity obj-model="obj: #tv-obj; mtl: #tv-mtl" rotation="0 90 0" position="3.4 1.55 0.35" scale="0.8 0.4 1.2" />
        <Entity obj-model="obj: #paintings-obj; mtl: #paintings-mtl" rotation="0 180 0" position="-2 2.7 6.45" scale="0.5 0.4 0.8" />
        <Entity obj-model="obj: #door-obj" rotation="270 0 0" position="1.5 0 -6.4" scale="0.015 0.015 0.015" />

        <Entity obj-model="obj: #socket-obj" rotation="0 -90 0" position="2.075 0.89 -0.75" scale="0.004 0.002 0.002" events={{ click: this.onClick }} />
        <Entity obj-model="obj: #socket-obj" rotation="0 -90 0" position="2.075 0.89 1" scale="0.004 0.002 0.002" events={{ click: this.onPause }} />

        {/* Desks */}
        <Entity obj-model="obj: #desk-obj; mtl: #desk-mtl" position="-5.8 0 -3" scale="1.5 1.6 1.5" />
        <Entity obj-model="obj: #desk-obj; mtl: #desk-mtl" position="-5.8 0 -1.9" scale="1.5 1.6 1.5" />
        <Entity obj-model="obj: #desk-obj; mtl: #desk-mtl" rotation="0 90 0" position="-5.9 0 1.65" scale="1.5 1.6 1.5" />

        {/* Chairs */}
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 90 .0" position="1 -0.12 -0.177" scale="1.75 1.5 1.4" />

        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 -90 0" position="0.7 -0.12 0.37" scale="1.75 1.5 1.8" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 0 0" position="1.37 -0.12 0.08" scale="1.75 1.5 2" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 180 0" position="0.95 -0.19 0.33" scale="1.75 1.5 2" />

        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 0 0" position="-5.27 -0.12 -2.55" scale="1.75 1.5 2" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 180 0" position="-5.68 -0.12 -2.34" scale="1.75 1.5 2" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 -90 0" position="-6.2 -0.12 1.9" scale="1.75 1.5 2" />

        {/* Computers */}
        <Entity obj-model="obj: #desktop-computer-obj; mtl: #desktop-computer-mtl" rotation="0 90 0" position="-5.6 1.17 -2" scale="0.4 0.3 0.4" />
        <Entity obj-model="obj: #desktop-computer-obj; mtl: #desktop-computer-mtl" rotation="0 -90 0" position="-5.6 1.17 -2.75" scale="0.4 0.3 0.4" />
        <Entity obj-model="obj: #desktop-computer-obj; mtl: #desktop-computer-mtl" rotation="0 180 0" position="-5.8 1.17 1.66" scale="0.4 0.3 0.4" />

        {/* Light */}
        <Entity primitive="a-light" type="point" intensity="1.4" color="white" position="-1.3 7.7 0" />

        <Entity
          primitive="a-plane"
          src="#exit"
          width="1.5"
          height=".5"
          position={{ x: 2.2, y: 3.7, z: -6.49 }}
          rotation={{ x: 0, y: 0, z: 0 }}
          events={{ click: toLobby }}>
          <a-animation begin="mouseenter" end="mouseleave" fill="forwards" repeat="0"
            direction="normal" attribute="scale" from="1 1 1"
            to="1.2 1.2 1.2" dur="1000"></a-animation>
          <a-animation begin="mouseleave" end="mouseenter" repeat="0" fill="forwards"
            direction="normal" attribute="scale"
            to="1 1 1" dur="1000"></a-animation>
        </Entity>

        <Entity text={{ value: 'start', align: 'center', color: '#17A102' }} position={{ x: 2.040, y: 1.02, z: -.75 }} scale="3 3 3" rotation="0 -90 0" /> 
        <Entity text={{ value: 'pause', align: 'center', color: '#AD2B02' }} position={{ x: 2.040, y: 1.02, z: .99 }} scale="3 3 3" rotation="0 -90 0" /> 
        
        <a-entity camera mouse-cursor look-controls rotation="0 -90 0" position="-0.03 1.00 0">
          <a-cursor color="black" />
        </a-entity>
        <a-entity obj-model="obj: #person-obj; mtl: #person-mtl" position="2.040 -0.02 -0.02" rotation="0 90 0" scale=".5 .5 .5" >
          <a-box rotation="0 0 45" scale="0.1 0.1 0.1" position="-0.11 2.6 -0.48"/>
          <a-box rotation="0 0 45" scale="0.1 0.1 0.1" position="-0.52 2.6 -0.47"/>
          <a-cone id="boxbot" rotation="0 90 90" scale=".02 .2 .12" radius-bottom="2" radius-top="0.9" position="-0.33 2.2 -0.43" color="white">
            <a-animation attribute="scale" from="0.02 0.2 0.12" to="0.07 0.2 0.12" dur="250" repeat="indefinite" begin="talking" end="notTalking" />
            <a-animation attribute="scale" from="0.07 0.2 0.12" to="0.02 0.2 0.12" dur="300" begin="notTalking" />
          </a-cone>
        </a-entity>
      </Scene>
    )}
}


import { getAllQuestions } from '../reducers/bot';

export default connect(({ bot, self }) => ({ bot, self }), ({ getAllQuestions }))(BotRoomComponent);


