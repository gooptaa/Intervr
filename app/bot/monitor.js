// this function could be prettier. also need to expand to include other functionalities
let talkCount = 0
let waitCount = 0
export function monitor(avg, threshold = 10){
  if (avg > 100){
    if (talkCount > threshold) {console.log("Done talking?")}
    talkCount++}
  else {
    console.log(avg)
    talkCount = 0
  }
}
