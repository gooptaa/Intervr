import React from 'react'
import aframe from 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import { Entity, Scene } from 'aframe-react';
require('aframe-fence-component')

export default () => (
  <a-assets>
  {/* Textures */}
  <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg" />
  <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg" />
  <img id="brick" src="https://ucarecdn.com/9ea05677-13be-42d3-b7a0-6c365b105dab/" />
  <img id="exit" src="https://ucarecdn.com/16957305-3e65-412d-83f7-87e3a5d54fa9/" />
  <img id="elevatorWall" src="images/elevator-wall.jpg" />
  <img id="elevatorFloor" src="images/elevator-floor.jpg" />

  <img id="floor" src="https://ucarecdn.com/df577b67-1d2b-49d8-885c-13ca40216737/" />
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
  <a-asset-item id="cup-obj" src="objects/cup.obj" />
  <a-asset-item id="cup-mtl" src="objects/cup.mtl" />
  <a-asset-item id="paintings-obj" src="objects/oil-paintings-with-frame.obj" />
  <a-asset-item id="paintings-mtl" src="objects/oil-paintings-with-frame.mtl" />

  <a-asset-item id="door-obj" src="objects/door.obj" />
  <a-asset-item id="elevator-handle" src="objects/elevator-handle.obj" />
  <a-asset-item id="elevator-door" src="objects/elevator-door.obj" />

</a-assets>
)
