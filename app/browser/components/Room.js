import React from 'react'
import { Link } from 'react-router'
import aframe from 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import { Entity, Scene } from 'aframe-react';
require('aframe-fence-component')
import {Office} from './office';

export class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: 'red' };
  }

  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  render() {
    return (
      <Scene physics="debug: true">
        <a-assets>
          {/* Textures */}
          <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg" />
          <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg" />
          <img id="brick" src="https://ucarecdn.com/9ea05677-13be-42d3-b7a0-6c365b105dab/" />
          <img id="wood" src="https://ucarecdn.com/6d4846b5-72fa-4014-9676-58188c287274/" />
          <img id="ceiling" src="https://ucarecdn.com/3be112de-62f6-4199-a12f-a0219c78d2eb/" />
          <img id="chantilly" src="https://ucarecdn.com/954adc21-3056-476c-ab04-082153e9c6dd/" />
          <a-asset-item id="person-obj" src="objects/person.obj" />
          <a-asset-item id="person-mtl" src="objects/person.mtl" />

          {/* Other Objects */}
          <a-asset-item id="flower-obj" src="objects/flower.obj" />
          <a-asset-item id="flower-mtl" src="objects/flower.mtl" />
          <a-asset-item id="couch-obj" src="objects/couch.obj" />
          <a-asset-item id="couch-mtl" src="objects/couch.mtl" />
          <a-asset-item id="table-obj" src="objects/table.obj" />
          <a-asset-item id="table-mtl" src="objects/table.mtl" />
          <a-asset-item id="desk-obj" src="objects/desk.obj" />
          <a-asset-item id="desk-mtl" src="objects/desk.mtl" />
          <a-asset-item id="desktop-computer-obj" src="objects/desktop-computer.obj" />
          <a-asset-item id="desktop-computer-mtl" src="objects/desktop-computer.mtl" />
          <a-asset-item id="office-chair-obj" src="objects/office-chair.obj" />
          <a-asset-item id="office-chair-mtl" src="objects/office-chair.mtl" />
        </a-assets>

        {/* Planes */}
        <a-box src="#chantilly" repeat="14 14" position="0 0 -7" rotation="0 0 0" height="14" width="14" />
        <a-box src="#chantilly" repeat="14 14" position="0 0 7" rotation="0 180 0" height="14" width="14" />
        <a-box src="#chantilly" repeat="14 14" position="7 0 0" rotation="0 -90 0" height="14" width="14" />
        <a-box src="#chantilly" repeat="14 14" position="-7 0 0" rotation="0 90 0" height="14" width="14" />
        <a-plane src="#ceiling" repeat="14 14" position="0 7 0" rotation="90 0 0" height="14" width="14" />
        <a-plane src="#wood" rotation="-90 0 0" height="14" width="14" />

        {/* Single Objects */}
        <Entity obj-model="obj: #couch-obj; mtl: #couch-mtl" position="-3 0.14 -6" scale="1 1 1" />
        <Entity obj-model="obj: #table-obj; mtl: #table-mtl" position="1.8 0.9 0.17" scale="0.002 0.001 0.002" />
        <Entity obj-model="obj: #flower-obj; mtl: #flower-mtl" position="1.1 .7 1.17" scale="0.01 0.01 0.01" />

        {/* Desks */}
        <Entity obj-model="obj: #desk-obj; mtl: #desk-mtl" position="-5.8 0 -3" scale="1.5 1.6 1.5" />
        <Entity obj-model="obj: #desk-obj; mtl: #desk-mtl" position="-5.8 0 -1.9" scale="1.5 1.6 1.5" />
        <Entity obj-model="obj: #desk-obj; mtl: #desk-mtl" rotation="0 90 0" position="-4 0 -2.35" scale="1.5 1.6 1.5" />

        {/* Chairs */}
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 90 .0" position="0.6 -0.12 .7" scale="1.75 1.5 2" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 -90 0" position="0.7 -0.12 1.2" scale="1.75 1.5 2" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 0 0" position="0.9 -0.12 0.8" scale="1.75 1.5 2" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 0 0" position="-5.27 -0.12 -2.55" scale="1.75 1.5 2" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 180 0" position="-5.68 -0.12 -2.34" scale="1.75 1.5 2" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 -90 0" position="-4.5 -0.12 -2.16" scale="1.75 1.5 2" />

        {/* Computers */}
        <Entity obj-model="obj: #desktop-computer-obj; mtl: #desktop-computer-mtl" rotation="0 90 0" position="-5.6 1.17 -2" scale="0.4 0.3 0.4" />
        <Entity obj-model="obj: #desktop-computer-obj; mtl: #desktop-computer-mtl" rotation="0 -90 0" position="-5.6 1.17 -2.75" scale="0.4 0.3 0.4" />
        <Entity obj-model="obj: #desktop-computer-obj; mtl: #desktop-computer-mtl" rotation="0 180 0" position="-4.14 1.17 -2.5" scale="0.4 0.3 0.4" />

        <Entity primitive="a-light" type="ambient" intensity="1" color="white" />
        <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048" />
        <Entity particle-system={{ preset: 'snow', particleCount: 2000 }} />
        <Entity text={{ value: 'Welcome to InterVR', align: 'center' }} position={{ x: 0, y: 2, z: -1 }} />

        <Entity id="box"
          geometry={{ primitive: 'box' }}
          material={{ color: this.state.color, opacity: 0.6 }}
          animation__rotate={{ property: 'rotation', dur: 2000, loop: true, to: '360 360 360' }}
          animation__scale={{ property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1' }}
          position={{ x: 0, y: 1, z: -3 }}
          events={{ click: this.changeColor.bind(this) }}>
          <Entity animation__scale={{ property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2' }}
            geometry={{ primitive: 'box', depth: 0.2, height: 0.2, width: 0.2 }}
            material={{ color: '#24CAFF' }} />
        </Entity>

        <a-entity position="0 0 0">
          <a-camera fence="width: 10; depth: 10">
            <Entity primitive="a-cursor" animation__click={{ property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150 }} />
            <a-entity obj-model="obj: #person-obj; mtl: #person-mtl" position="0 -1.6 .5" />
          </a-camera>
        </a-entity>
      </Scene>
    );
  }
}

