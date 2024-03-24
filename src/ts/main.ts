window.addEventListener("DOMContentLoaded", startCheck, { once: true });
function startCheck() {
  timerInit();
  checkPosition();
}

//--------timer mechanics-------//
const SALE_LENGTH_IN_HOURSE = 24;
const saleLengthMS = SALE_LENGTH_IN_HOURSE * 1000 * 60 ** 2;
const timerCounts = document.getElementsByClassName("timer__count");
const timers = Array.from(timerCounts);
function timerInit() {
  if (timers.length) {
    const haveDateString = localStorage.getItem("startTime");
    if (haveDateString && haveDateString.length > 0) {
      const startTime: Date = new Date(JSON.parse(haveDateString));
      const timerTime = getTimerTime(startTime);
      if (timerTime > -1) {
        startTimeCounting(startTime);
      } else if (timerTime < -saleLengthMS) timerStart();
    } else timerStart();
  } else console.log("Error in timer");
}
function startTimeCounting(startTime: Date) {
  const timerWorker = new Worker("./js/workers/timer_worker.js");
  timerWorker.postMessage({ startTime, saleLengthMS });
  timerWorker.onmessage = (e) => {
    const {
      hours,
      minuts,
      seconds,
    }: { hours: string; minuts: string; seconds: string } = e.data;
    timers.forEach((el) => setTime(el, hours, minuts, seconds));
  };
  window.addEventListener("beforeunload", () => timerWorker.terminate());
}
function getTimerTime(time: Date) {
  const nowMS = Date.now();
  return saleLengthMS - (nowMS - time.getTime());
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
