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
    this.state ={
      isStarted: true
    }
    this.interviewer = null
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount() {
    console.log(this.props)
    this.interviewer = new Bot();

    let general = axios.get('api/general')
      .then((res) => res.data)
    // .then((question) => console.log('general',question))
    let intro = axios.get('api/intro')
      .then((res) => res.data)
    // .then((question) => console.log('intro',question))
    let technical = axios.get('api/technical')
      .then((res) => res.data)
    // .then((question) => console.log('technical',question))

    Promise.all([general, intro, technical])
      .spread((general, intro, technical) => this.interviewer.setup({
        general: general,
        intro: intro,
        technical: technical,
      }))
  }

  componentWillUnmount() {
    if (this.interviewer) {
      this.interviewer.end();
    }
  }

  onClick(evt) {
    console.log(evt)
    this.interviewer.next(this.interviewer.getNextType())
    this.setState({isStarted: !this.state.isStarted});
  }



  render() {
    return (
      <Scene>
        <Assets />

        {/* Cups */}
        <Entity obj-model="obj: #cup-obj; mtl: #cup-mtl" position="1.5 0.85 -0.34" scale="0.08 0.08 0.08" rotation="0 90 0"/>
        <Entity obj-model="obj: #cup-obj; mtl: #cup-mtl" position="1 0.85 0.6" scale="0.08 0.08 0.08" rotation="0 -90 0"/>

        {/* Resume */}
        <a-box color="navy" depth="0.74" height="0.12" width="0.4" position="1.55 0.7 0.15"></a-box>
        <a-box color="white" depth="0.35" height="0.13" width="0.37" position="1.55 0.7 -0.03"></a-box>
        <a-box color="white" depth="0.35" height="0.13" width="0.37" position="1.55 0.7 0.335"></a-box>

        {/* Planes */}
        <a-box color="#66CCFF" repeat="14 14" position="-1.45 0 -7" rotation="0 0 0" height="10" width="14" scale="0.8 1 1" />
        <a-box color="#66CCFF" repeat="14 14" position="-1.7 0.12 7" rotation="0 180 0" height="10" width="14" scale="0.8 1 1" />
        <a-box color="#66CCFF" repeat="14 14" position="4 0 0" rotation="0 -90 0" height="10" width="14" />
        <a-box color="#66CCFF" repeat="14 14" position="-7 0 -0.35" rotation="0 90 0" height="10" width="14" scale="1 1 1" />
        <a-plane src="#floor" repeat="14 14" position="-1.3 5 0.2" rotation="90 0 0" height="10" width="14" scale="0.9 1.4 0.9" />
        <a-plane src="#floor" rotation="-90 0 0" position="-1.5 0 0" height="14" width="14" scale="0.85 1 0.8" />

        {/* Single Objects */}
        <Entity obj-model="obj: #couch-obj; mtl: #couch-mtl" position="-3 0.14 -6" scale="1 1 1" />
        <Entity obj-model="obj: #table-obj; mtl: #table-mtl" position="2 0.9 -1.5" scale="0.003 0.001 0.005" />
        <Entity obj-model="obj: #flower-obj; mtl: #flower-mtl" position="1.1 .7 1.17" scale="0.01 0.01 0.01" />

        {/* Desks */}
        <Entity obj-model="obj: #desk-obj; mtl: #desk-mtl" position="-5.8 0 -3" scale="1.5 1.6 1.5" />
        <Entity obj-model="obj: #desk-obj; mtl: #desk-mtl" position="-5.8 0 -1.9" scale="1.5 1.6 1.5" />
        <Entity obj-model="obj: #desk-obj; mtl: #desk-mtl" rotation="0 90 0" position="-5.9 0 1.65" scale="1.5 1.6 1.5" />

        {/* Chairs */}
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 90 .0" position="-0.5 -0.12 1.5" scale="1.75 1.5 1.4" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 90 .0" position="-0.5 -0.12 -1.77" scale="1.75 1.5 1.4" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 90 .0" position="-0.5 -0.12 -0.177" scale="1.75 1.5 1.4" />

        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 -90 0" position="0.7 -0.12 2" scale="1.75 1.5 1.8" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 -90 0" position="0.7 -0.12 -1.3" scale="1.75 1.5 1.8" />

        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 -90 0" position="0.7 -0.12 0.37" scale="1.75 1.5 1.8" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 0 0" position="1.3 -0.12 -1.25" scale="1.75 1.5 2" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 180 0" position="-0.55 -0.19 1.6" scale="1.75 1.5 2" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 180 0" position="0.765 -0.19 1.6" scale="1.75 1.5 2" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 0 0" position="-0.17 -0.19 -1.25" scale="1.75 1.5 2" />

        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 0 0" position="-5.27 -0.12 -2.55" scale="1.75 1.5 2" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 180 0" position="-5.68 -0.12 -2.34" scale="1.75 1.5 2" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 -90 0" position="-6.2 -0.12 1.9" scale="1.75 1.5 2" />

        {/* Computers */}
        <Entity obj-model="obj: #desktop-computer-obj; mtl: #desktop-computer-mtl" rotation="0 90 0" position="-5.6 1.17 -2" scale="0.4 0.3 0.4" />
        <Entity obj-model="obj: #desktop-computer-obj; mtl: #desktop-computer-mtl" rotation="0 -90 0" position="-5.6 1.17 -2.75" scale="0.4 0.3 0.4" />
        <Entity obj-model="obj: #desktop-computer-obj; mtl: #desktop-computer-mtl" rotation="0 180 0" position="-5.8 1.17 1.66" scale="0.4 0.3 0.4" />

        <Entity obj-model="obj: #tv-obj; mtl: #tv-mtl" rotation="0 90 0" position="3.4 1.55 0" scale="0.8 0.4 1.2" />
        <Entity obj-model="obj: #paintings-obj; mtl: #paintings-mtl" rotation="0 180 0" position="-2 2.7 6.45" scale="0.5 0.4 0.8"/>

        <Entity primitive="a-light" type="point" intensity="1.4" color="white" position="-1.3 7.7 0"/>

        <Entity
          primitive="a-plane"
          src="#exit"
          width=".5"
          height=".25"
          position={{ x: 2, y: 4, z: -6.49 }}
          rotation={{ x: 0, y: 0, z: 0 }}
          events={{ click: toLobby }}>
          <a-animation begin="mouseenter" end="mouseleave" fill="forwards" repeat="0"
            direction="normal" attribute="scale" from="1 1 1"
            to="1.2 1.2 1.2" dur="1000"></a-animation>
          <a-animation begin="mouseleave" end="mouseenter" repeat="0" fill="forwards"
            direction="normal" attribute="scale"
            to="1 1 1" dur="1000"></a-animation>
        </Entity>

          <a-entity obj-model="obj: #person-obj; mtl: #person-mtl" position="2.040 -0.025 0.298" rotation="0 -90 0" scale=".5 .5 .5" />
        {this.state.isStarted ? <Entity text={{value: 'start', align: 'center', color: 'black' }} position={{x: 2.040, y: 1.02, z: .712}} scale="3 3 3" rotation="0 -90 0"/> :
        <Entity text={{value: 'pause', align: 'center', color: 'black' }} position={{x: 2.040, y: 1.02, z: .712}} scale="3 3 3" rotation="0 -90 0"/>}
           <Entity
              primitive="a-plane"
              color="red"
              width=".30"
              height=".21"
              position={{x: 2.040, y: 1.02, z: .712}}
              rotation="0 -90 0"
              scale="1 1 1"
              events={{click: this.onClick}}>
          </Entity>
          <a-entity camera mouse-cursor look-controls rotation="0 -90 0" position="-1.10 1.00 0">
            <a-cursor color="black"/>
          </a-entity>
        </Scene>
      )
  }
}


import { getAllQuestions } from '../reducers/bot';

export default connect(({ bot }) => ({ bot }), ({ getAllQuestions }))(BotRoomComponent);
