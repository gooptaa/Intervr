import React from 'react'
import { Link } from 'react-router'
import aframe from 'aframe';
import 'aframe-animation-component';
import 'babel-polyfill';
import { Entity, Scene } from 'aframe-react';
import { connect } from 'react-redux';
import Assets from './assets';
import { toPeerRoom, toBotRoom } from '../util';
import Sound from 'react-sound';

class ElevComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      peerPress: false,
      botPress: false,
      elevatorMove: false
    }
  }

  componentDidMount(){
    this.peerButton.addEventListener('click', evt => {
      if(this.state.elevatorMove) return;
      this.setState({peerPress: true, elevatorMove: true});
      setTimeout(() => {
        toPeerRoom();
      }, 5000);
    });

    this.botButton.addEventListener('click', evt => {
      if(this.state.elevatorMove) return;
      this.setState({botPress: true, elevatorMove: true});
      setTimeout(() => {
        toBotRoom();
      }, 5000);
    });
  }

  render() {
    return (
      <Scene>
        <Assets />

        {/* Planes */}
        <a-box src="#elevatorWall" position="-1.5 0 -5" rotation="0 0 0" height="10" width="6" scale="1 1 1" />
        <a-box color="grey" position="-1.5 0 2" rotation="0 180 0" height="10" width="6" scale="1 1 1" />
        <a-box src="#elevatorWall" position="2 0 -1.5" rotation="0 -90 0" height="10" width="6" />
        <a-box src="#elevatorWall" position="-5 0 -1.5" rotation="0 90 0" height="10" width="6" />
        <a-plane src="#floor" repeat="14 14" position="-1.3 5 0.2" rotation="90 0 0" height="10" width="6" scale="1.2 1.4 1" />
        <a-plane src="#floor" color="black" rotation="-90 0 0" position="-1.5 0 0" height="10" width="10" scale="1 1 1" />

        <Entity primitive="a-light" type="point" intensity=".6" color="white" position="0 4.95 -3" />
        <Entity primitive="a-light" type="point" intensity=".6" color="white" position="0 4.95 0" />
        <Entity primitive="a-light" type="point" intensity=".6" color="white" position="-3 4.95 -3" />
        <Entity primitive="a-light" type="point" intensity=".6" color="white" position="-3 4.95 0" />

        <a-cylinder 
          ref={(peerButton) => this.peerButton = peerButton}
          color={this.state.peerPress ? 'orange' : 'black'} 
          radius=".075" 
          height=".005" 
          position="0 2.5 1.5" 
          rotation="90 0 0" >
            <Entity 
            text={{ value: 'Peer Room', align: 'center', color: 'black' }} 
            position={{ x: .45, y: -0.1, z: -.05 }} 
            rotation={{x: 90, y: 180, z: 0}}
            scale={{x: 3, y: 3, z: 3}} />
        </a-cylinder>
        <a-cylinder 
          ref={(botButton) => this.botButton = botButton}
          color={this.state.botPress ? 'orange' : 'black'} 
          radius=".075" 
          height=".005" 
          position="0 2 1.5" 
          rotation="90 0 0" >
            <Entity 
            text={{ value: 'Bot Room', align: 'center', color: 'black' }} 
            position={{ x: .42, y: -0.1, z: -.05 }} 
            rotation={{x: 90, y: 180, z: 0}}
            scale={{x: 3, y: 3, z: 3}} />
        </a-cylinder>


        <Entity obj-model="obj: #elevator-door" rotation="0 180 0" position="-1.6 0 1.4" scale=".05 .05 .02" />
        <Entity obj-model="obj: #elevator-handle" rotation="0 0 0" position="-1.6 1.7 -4.3" scale=".03 .03 .02" />

        <a-entity camera mouse-cursor look-controls rotation="0 180 0" position="-1.50 3.00 -1">
          <a-cursor color="black" />
        </a-entity>

        <Sound
          url="/music/elevator-music.mp3"
          playStatus={Sound.status.PLAYING}
          volume={50}
        />

        <Sound
          url="/music/elevator-move.mp3"
          playStatus={this.state.elevatorMove ? Sound.status.PLAYING : Sound.status.STOPPED}
          volume={75}
        />
        
      </Scene>
    )}
}



export default connect(null, null)(ElevComponent);
