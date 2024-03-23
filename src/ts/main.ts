window.addEventListener("DOMContentLoaded", startCheck, { once: true });
function startCheck() {
  mobileMenuInit();
  timerInit();
  checkPosition();
}

//--------timer mechanics-------//
const saleLengthInHours = 24;
const saleLengthMS = saleLengthInHours * 1000 * 60 ** 2;
const timerCounts = document.getElementsByClassName("timer__count");
const timers = Array.from(timerCounts);
const timerChangeEvent = new CustomEvent("timerChange");
function timerInit() {
  if (timers.length) {
    const haveDateString = localStorage.getItem("startTime");
    if (haveDateString && haveDateString.length > 0) {
      const startTime: Date = new Date(JSON.parse(haveDateString));
      timerParseOut(startTime);
      const timerTime = getTimerTime(startTime);
      if (timerTime > -1) {
        startTimeCounting(startTime);
      } else if (timerTime < -saleLengthMS) timerStart();
    } else timerStart();
  } else console.log("Error in timer");
}
function startTimeCounting(startTime: Date) {
  window.addEventListener("timerChange", () => {
    timerParseOut(startTime);
  });
  let secnd: number = new Date().getSeconds();
  setInterval(() => {
    const currSecnd: number = new Date().getSeconds();
    if (currSecnd !== secnd) {
      secnd = currSecnd;
      window.dispatchEvent(timerChangeEvent);
    }
  }, 100);
}
function timerParseOut(time: Date) {
  const timerTime = getTimerTime(time);
  if (timerTime > -1) {
    const hours = format(+timerTime / 3600000);
    const minuts = format((+timerTime % 3600000) / 60000);
    const seconds = format((+timerTime % 60000) / 1000);
    timers.forEach((el) => setTime(el, hours, minuts, seconds));
  }
}
function getTimerTime(time: Date) {
  const nowMS = Date.now();
  return saleLengthMS - (nowMS - time.getTime());
}
function format(num: number) {
  let str: string = Math.floor(num).toString();
  if (str.length === 1) str = "0" + str;
  return str;
}
function setTime(
  timer: Element,
  hourse: string,
  minuts: string,
  seconds: string
) {
  const h = timer.querySelector(".timer__hours");
  if (h?.innerHTML && h.innerHTML !== hourse) {
    h.innerHTML = hourse;
  }
  const m = timer.querySelector(".timer__minutes");
  if (m?.innerHTML && m.innerHTML !== minuts) {
    m.innerHTML = minuts;
  }
  const s = timer.querySelector(".timer__seconds");
  if (s instanceof HTMLSpanElement) {
    s.innerHTML = seconds;
  }
}
function timerStart() {
  const startTime = new Date();
  timerParseOut(startTime);
  startTimeCounting(startTime);
  try {
    localStorage.setItem("startTime", JSON.stringify(startTime));
  } catch (e) {
    if (e.name == "QUOTA_EXCEEDED_ERR")
      console.log("QUOTA_EXCEEDED_ERR:  localStorage overloaded");
    else throw e;
  }
}
//--------FAQ questions hendler-------//
const faqButtons = document.getElementsByClassName("faq__btn");
const faqActiveClass = "faq__btn--active";
if (faqButtons.length > 0) {
  const faqButtonsArray = Array.from(faqButtons);
  for (const but of faqButtonsArray) {
    but.addEventListener("click", (e: Event) => faqHendler(e));
  }
}
function faqHendler(e: Event) {
  const target = e.target;
  if (target instanceof Element) {
    const clickedButton = target.closest("button");
    const faqButtonActive = clickedButton?.classList.contains(faqActiveClass);
    if (faqButtonActive) closeFaq(clickedButton);
    else changeFaq(clickedButton);
  }
}
function closeFaq(clickedButton: HTMLButtonElement | Element | null) {
  clickedButton?.classList.remove(faqActiveClass);
}
function changeFaq(clickedButton: HTMLButtonElement | null) {
  for (const faq of Array.from(faqButtons)) {
    closeFaq(faq);
  }
  clickedButton?.classList.add(faqActiveClass);
}

//--------Up button hendler-------//
window.addEventListener("scrollend", checkPosition);
const up_button = document.querySelector(".up");
const upBtnActiveClass = "up--active";
if (up_button) {
  up_button.addEventListener("click", scrollUp);
}
function checkPosition() {
  const scrollVertical = window.scrollY;
  if (scrollVertical > window.innerHeight) activateUpButton();
  else deactivateUpButton();
}
function activateUpButton() {
  up_button?.classList.add(upBtnActiveClass);
}
function deactivateUpButton() {
  up_button?.classList.remove(upBtnActiveClass);
}
function scrollUp() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

//--------mobile menu hendler-------//
const bodyElement = document.querySelector("body");
const mobileMenuClass = "mobile-menu";
function mobileMenuInit() {
  window.addEventListener("resize", mobileResizeHendler);
  if (window.innerWidth < 960) mobileMenuStart();
}
function mobileResizeHendler() {
  if (window.innerWidth < 960) mobileMenuStart();
}
function mobileMenuStart() {
  setTimeout(() => {
    window.removeEventListener("resize", mobileResizeHendler);
  }, 0);
  const mobileButton = document.getElementById("mobile_button");
  mobileButton?.addEventListener("click", mobileMenuToggle);

  const menuItems = document.querySelectorAll(".menu__item a");
  if (menuItems) {
    menuItems.forEach((el) => {
      el.addEventListener("click", () => {
        bodyElement?.classList.remove(mobileMenuClass);
      });
    });
  }
}
function mobileMenuToggle() {
  bodyElement?.classList.toggle(mobileMenuClass);
}
