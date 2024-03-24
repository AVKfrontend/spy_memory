var secnd = new Date().getSeconds();
var startTime;
var timerLengthMS;
onmessage = function (e) {
    var data = e.data;
    startTime = data.startTime;
    timerLengthMS = data.saleLengthMS;
    timeCount();
};
function timeCount() {
    sendTimerParsedTime();
    setInterval(function () {
        var currSecnd = new Date().getSeconds();
        if (currSecnd !== secnd) {
            secnd = currSecnd;
            sendTimerParsedTime();
        }
    }, 100);
}
function sendTimerParsedTime() {
    var timerParsedTime = timerParseOutW();
    if (timerParsedTime) {
        postMessage(timerParsedTime);
    }
}
function timerParseOutW() {
    var timerTime = getTimerTimeW();
    if (timerTime > -1) {
        var hours = formatW(+timerTime / 3600000);
        var minuts = formatW((+timerTime % 3600000) / 60000);
        var seconds = formatW((+timerTime % 60000) / 1000);
        return { hours: hours, minuts: minuts, seconds: seconds };
    }
}
function getTimerTimeW() {
    var nowMS = Date.now();
    return timerLengthMS - (nowMS - startTime.getTime());
}
function formatW(num) {
    var str = Math.floor(num).toString();
    if (str.length === 1)
        str = "0" + str;
    return str;
}
