import generateWords from 'random-words';

export function randomToken() {
 return generateWords({exactly: 2, join: '-'});
}

export function randomName() {
 return generateWords({min: 1, max: 3, join: ' '});
}
