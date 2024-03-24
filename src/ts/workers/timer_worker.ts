let secnd: number = new Date().getSeconds();
let startTime: Date;
let timerLengthMS: number;
onmessage = (e) => {
  const data: { startTime: Date; saleLengthMS: number } = e.data;
  startTime = data.startTime;
  timerLengthMS = data.saleLengthMS;
  timeCount();
};
function timeCount() {
  sendTimerParsedTime();
  setInterval(() => {
    const currSecnd: number = new Date().getSeconds();
    if (currSecnd !== secnd) {
      secnd = currSecnd;
      sendTimerParsedTime();
    }
  }, 100);
}
function sendTimerParsedTime() {
  const timerParsedTime = timerParseOutW();
  if (timerParsedTime) {
    postMessage(timerParsedTime);
  }
}
function timerParseOutW() {
  const timerTime = getTimerTimeW();
  if (timerTime > -1) {
    const hours = formatW(+timerTime / 3600000);
    const minuts = formatW((+timerTime % 3600000) / 60000);
    const seconds = formatW((+timerTime % 60000) / 1000);
    return { hours, minuts, seconds };
  }
}
function getTimerTimeW() {
  const nowMS = Date.now();
  return timerLengthMS - (nowMS - startTime.getTime());
}
function formatW(num: number) {
  let str: string = Math.floor(num).toString();
  if (str.length === 1) str = "0" + str;
  return str;
}
