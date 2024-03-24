function startCheck(){mobileMenuInit(),timerInit(),checkPosition()}window.addEventListener("DOMContentLoaded",startCheck,{once:!0});var SALE_LENGTH_IN_HOURSE=24,saleLengthMS=1e3*SALE_LENGTH_IN_HOURSE*Math.pow(60,2),timerCounts=document.getElementsByClassName("timer__count"),timers=Array.from(timerCounts);function timerInit(){if(timers.length){var e=localStorage.getItem("startTime");if(e&&e.length>0){var t=new Date(JSON.parse(e)),n=getTimerTime(t);n>-1?startTimeCounting(t):n<-saleLengthMS&&timerStart()}else timerStart()}else console.log("Error in timer")}function startTimeCounting(e){var t=new Worker("./js/workers/timer_worker.js");t.postMessage({startTime:e,saleLengthMS:saleLengthMS}),t.onmessage=function(e){var t=e.data,n=t.hours,o=t.minuts,i=t.seconds;timers.forEach(function(e){return setTime(e,n,o,i)})},window.addEventListener("beforeunload",function(){return t.terminate()})}function getTimerTime(e){var t=Date.now();return saleLengthMS-(t-e.getTime())}function setTime(e,t,n,o){var i=e.querySelector(".timer__hours");(null==i?void 0:i.innerHTML)&&i.innerHTML!==t&&(i.innerHTML=t);var r=e.querySelector(".timer__minutes");(null==r?void 0:r.innerHTML)&&r.innerHTML!==n&&(r.innerHTML=n);var a=e.querySelector(".timer__seconds");a instanceof HTMLSpanElement&&(a.innerHTML=o)}function timerStart(){var e=new Date;startTimeCounting(e);try{localStorage.setItem("startTime",JSON.stringify(e))}catch(e){if("QUOTA_EXCEEDED_ERR"!=e.name)throw e;console.log("QUOTA_EXCEEDED_ERR:  localStorage overloaded")}}var faqButtons=document.getElementsByClassName("faq__btn"),faqActiveClass="faq__btn--active";if(faqButtons.length>0)for(var faqButtonsArray=Array.from(faqButtons),_i=0,faqButtonsArray_1=faqButtonsArray;_i<faqButtonsArray_1.length;_i++){var but=faqButtonsArray_1[_i];but.addEventListener("click",function(e){return faqHendler(e)})}function faqHendler(e){var t=e.target;if(t instanceof Element){var n=t.closest("button");(null==n?void 0:n.classList.contains(faqActiveClass))?closeFaq(n):changeFaq(n)}}function closeFaq(e){null==e||e.classList.remove(faqActiveClass)}function changeFaq(e){for(var t=0,n=Array.from(faqButtons);t<n.length;t++){closeFaq(n[t])}null==e||e.classList.add(faqActiveClass)}window.addEventListener("scrollend",checkPosition);var up_button=document.querySelector(".up"),upBtnActiveClass="up--active";function checkPosition(){window.scrollY>window.innerHeight?activateUpButton():deactivateUpButton()}function activateUpButton(){null==up_button||up_button.classList.add(upBtnActiveClass)}function deactivateUpButton(){null==up_button||up_button.classList.remove(upBtnActiveClass)}function scrollUp(){window.scrollTo({top:0,behavior:"smooth"})}up_button&&up_button.addEventListener("click",scrollUp);var bodyElement=document.querySelector("body"),mobileMenuClass="mobile-menu";function mobileMenuInit(){window.addEventListener("resize",mobileResizeHendler),window.innerWidth<960&&mobileMenuStart()}function mobileResizeHendler(){window.innerWidth<960&&mobileMenuStart()}function mobileMenuStart(){setTimeout(function(){window.removeEventListener("resize",mobileResizeHendler)},0);var e=document.getElementById("mobile_button");null==e||e.addEventListener("click",mobileMenuToggle);var t=document.querySelectorAll(".menu__item a");t&&t.forEach(function(e){e.addEventListener("click",function(){null==bodyElement||bodyElement.classList.remove(mobileMenuClass)})})}function mobileMenuToggle(){null==bodyElement||bodyElement.classList.toggle(mobileMenuClass)}