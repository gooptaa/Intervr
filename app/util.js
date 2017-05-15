import generateWords from 'random-words';

export function randomToken() {
 return generateWords({exactly: 2, join: '-'});
}

export function randomName() {
 return generateWords({min: 1, max: 3, join: ' '});
}

import { browserHistory } from 'react-router';

export function toLobby() {
  browserHistory.push('/lobby');
}

export function toPeerRoom(){
  browserHistory.push('/peer-room');
}

export function toBotRoom(){
  browserHistory.push('/bot-room');
}
