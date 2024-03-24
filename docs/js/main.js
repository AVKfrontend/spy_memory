window.addEventListener("DOMContentLoaded", startCheck, { once: true });
function startCheck() {
    mobileMenuInit();
    timerInit();
    checkPosition();
}
var SALE_LENGTH_IN_HOURSE = 24;
var saleLengthMS = SALE_LENGTH_IN_HOURSE * 1000 * Math.pow(60, 2);
var timerCounts = document.getElementsByClassName("timer__count");
var timers = Array.from(timerCounts);
function timerInit() {
    if (timers.length) {
        var haveDateString = localStorage.getItem("startTime");
        if (haveDateString && haveDateString.length > 0) {
            var startTime_1 = new Date(JSON.parse(haveDateString));
            var timerTime = getTimerTime(startTime_1);
            if (timerTime > -1) {
                startTimeCounting(startTime_1);
            }
            else if (timerTime < -saleLengthMS)
                timerStart();
        }
        else
            timerStart();
    }
    else
        console.log("Error in timer");
}
function startTimeCounting(startTime) {
    var timerWorker = new Worker("./js/workers/timer_worker.js");
    timerWorker.postMessage({ startTime: startTime, saleLengthMS: saleLengthMS });
    timerWorker.onmessage = function (e) {
        var _a = e.data, hours = _a.hours, minuts = _a.minuts, seconds = _a.seconds;
        timers.forEach(function (el) { return setTime(el, hours, minuts, seconds); });
    };
    window.addEventListener("beforeunload", function () { return timerWorker.terminate(); });
}
function getTimerTime(time) {
    var nowMS = Date.now();
    return saleLengthMS - (nowMS - time.getTime());
}
function setTime(timer, hourse, minuts, seconds) {
    var h = timer.querySelector(".timer__hours");
    if ((h === null || h === void 0 ? void 0 : h.innerHTML) && h.innerHTML !== hourse) {
        h.innerHTML = hourse;
    }
    var m = timer.querySelector(".timer__minutes");
    if ((m === null || m === void 0 ? void 0 : m.innerHTML) && m.innerHTML !== minuts) {
        m.innerHTML = minuts;
    }
    var s = timer.querySelector(".timer__seconds");
    if (s instanceof HTMLSpanElement) {
        s.innerHTML = seconds;
    }
}
function timerStart() {
    var startTime = new Date();
    startTimeCounting(startTime);
    try {
        localStorage.setItem("startTime", JSON.stringify(startTime));
    }
    catch (e) {
        if (e.name == "QUOTA_EXCEEDED_ERR")
            console.log("QUOTA_EXCEEDED_ERR:  localStorage overloaded");
        else
            throw e;
    }
}
var faqButtons = document.getElementsByClassName("faq__btn");
var faqActiveClass = "faq__btn--active";
if (faqButtons.length > 0) {
    var faqButtonsArray = Array.from(faqButtons);
    for (var _i = 0, faqButtonsArray_1 = faqButtonsArray; _i < faqButtonsArray_1.length; _i++) {
        var but = faqButtonsArray_1[_i];
        but.addEventListener("click", function (e) { return faqHendler(e); });
    }
}
function faqHendler(e) {
    var target = e.target;
    if (target instanceof Element) {
        var clickedButton = target.closest("button");
        var faqButtonActive = clickedButton === null || clickedButton === void 0 ? void 0 : clickedButton.classList.contains(faqActiveClass);
        if (faqButtonActive)
            closeFaq(clickedButton);
        else
            changeFaq(clickedButton);
    }
}
function closeFaq(clickedButton) {
    clickedButton === null || clickedButton === void 0 ? void 0 : clickedButton.classList.remove(faqActiveClass);
}
function changeFaq(clickedButton) {
    for (var _i = 0, _a = Array.from(faqButtons); _i < _a.length; _i++) {
        var faq = _a[_i];
        closeFaq(faq);
    }
    clickedButton === null || clickedButton === void 0 ? void 0 : clickedButton.classList.add(faqActiveClass);
}
window.addEventListener("scrollend", checkPosition);
var up_button = document.querySelector(".up");
var upBtnActiveClass = "up--active";
if (up_button) {
    up_button.addEventListener("click", scrollUp);
}
function checkPosition() {
    var scrollVertical = window.scrollY;
    if (scrollVertical > window.innerHeight)
        activateUpButton();
    else
        deactivateUpButton();
}
function activateUpButton() {
    up_button === null || up_button === void 0 ? void 0 : up_button.classList.add(upBtnActiveClass);
}
function deactivateUpButton() {
    up_button === null || up_button === void 0 ? void 0 : up_button.classList.remove(upBtnActiveClass);
}
function scrollUp() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
var bodyElement = document.querySelector("body");
var mobileMenuClass = "mobile-menu";
function mobileMenuInit() {
    window.addEventListener("resize", mobileResizeHendler);
    if (window.innerWidth < 960)
        mobileMenuStart();
}
function mobileResizeHendler() {
    if (window.innerWidth < 960)
        mobileMenuStart();
}
function mobileMenuStart() {
    setTimeout(function () {
        window.removeEventListener("resize", mobileResizeHendler);
    }, 0);
    var mobileButton = document.getElementById("mobile_button");
    mobileButton === null || mobileButton === void 0 ? void 0 : mobileButton.addEventListener("click", mobileMenuToggle);
    var menuItems = document.querySelectorAll(".menu__item a");
    if (menuItems) {
        menuItems.forEach(function (el) {
            el.addEventListener("click", function () {
                bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.classList.remove(mobileMenuClass);
            });
        });
    }
}
function mobileMenuToggle() {
    bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.classList.toggle(mobileMenuClass);
}
