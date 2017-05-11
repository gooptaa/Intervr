import React from 'react'
import { Link } from 'react-router'
import aframe from 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import { Entity, Scene } from 'aframe-react';
require('aframe-fence-component')
import { connect } from 'react-redux';


class RoomComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // add listener to camera
    this.cameraNode.addEventListener('componentchanged', (evt) => {
      if (evt.detail.name === 'position') {
        this.props.webRTC.sendDirectlyToAll(null, null, { position: evt.detail.newData });
        this.props.setPositionStore(evt.detail.newData);
      } else if (evt.detail.name === 'rotation') {
        this.props.webRTC.sendDirectlyToAll(null, null, { rotation: evt.detail.newData });
        this.props.setRotationStore(evt.detail.newData);
      }
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
          <img id="floor" src="https://ucarecdn.com/b8a76bd8-e7d2-4cab-9422-c941956cf592/" />
          <img id="chantilly" src="https://ucarecdn.com/954adc21-3056-476c-ab04-082153e9c6dd/" />
          <img id="sofatext" src="https://ucarecdn.com/98e4cfe9-c590-4f91-8147-78c251920890/" />
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
          <a-asset-item id="tv-obj" src="objects/tv.obj" />
          <a-asset-item id="tv-mtl" src="objects/tv.mtl" />
          <a-asset-item id="paintings-obj" src="objects/oil-paintings-with-frame.obj" />
          <a-asset-item id="paintings-mtl" src="objects/oil-paintings-with-frame.mtl" />

        </a-assets>

        {/* Planes */}
        <a-box color="#fff" repeat="14 14" position="-1.45 0 -7" rotation="0 0 0" height="10" width="14" scale="0.8 1 1" />
        <a-box color="#fff" repeat="14 14" position="-1.7 0.12 7" rotation="0 180 0" height="10" width="14" scale="0.8 1 1" />
        <a-box color="#fff" repeat="14 14" position="4 0 0" rotation="0 -90 0" height="10" width="14" />
        <a-box color="#fff" repeat="14 14" position="-7 0 -0.35" rotation="0 90 0" height="10" width="14" scale="1 1 1" />
        <a-plane src="#floor" repeat="14 14" position="-1.3 5 0.2" rotation="90 0 0" height="10" width="14" scale="0.9 1.4 0.9"/>
        <a-plane src="#floor" rotation="-90 0 0" position="-1.5 0 0" height="14" width="14" scale="0.85 1 0.8" />

        {/* Single Objects */}
        <Entity obj-model="obj: #couch-obj; mtl: #couch-mtl" position="-3 0.14 -6" scale="1 1 1" />
        <Entity obj-model="obj: #table-obj; mtl: #table-mtl" position="2 0.9 -1.5" scale="0.003 0.001 0.005" />
        <Entity obj-model="obj: #flower-obj; mtl: #flower-mtl" position="1.1 .7 1.17" scale="0.01 0.01 0.02" />

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

        <Entity primitive="a-light" type="ambient" intensity="1" color="white" />

        <Entity>
          <a-camera
            ref={(cameraNode) => this.cameraNode = cameraNode}
            position={this.camera && this.props.camera.position} rotation={this.camera && this.props.camera.rotation}
            id="camera"
            fence="width: 10; depth: 10">
            <Entity primitive="a-cursor" animation__click={{ property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150 }} />
            <a-entity obj-model="obj: #person-obj; mtl: #person-mtl" position="0 -1.6 .5" />
          </a-camera>
        </Entity>

        {Object.keys(this.props.peer).map((key, index) => (
          <Entity obj-model="obj: #person-obj; mtl: #person-mtl"
            position={this.props.peer[key].position}
            rotation={this.props.peer[key].rotation} />
        ))}

      </Scene>
    );
  }
}

import { setRotationStore, setPositionStore } from '../reducers/camera';

export default connect(
  ({ webRTC, peer, camera }) => ({ webRTC, peer, camera }),
  ({ setRotationStore, setPositionStore }))
  (RoomComponent);

