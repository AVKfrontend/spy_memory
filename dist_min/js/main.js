var up_button=document.querySelector(".up"),upBtnActiveClass="up--active",faqButtons=document.getElementsByClassName("faq__btn"),faqActiveClass="faq__btn--active";if(window.addEventListener("DOMContentLoaded",startCheck,{once:!0}),window.addEventListener("scrollend",checkPosition),up_button&&up_button.addEventListener("click",scrollUp),faqButtons.length>0)for(var faqButtonsArray=Array.from(faqButtons),_i=0,faqButtonsArray_1=faqButtonsArray;_i<faqButtonsArray_1.length;_i++){var but=faqButtonsArray_1[_i];but.addEventListener("click",function(t){return faqHendler(t)})}function faqHendler(t){var e=t.target;if(e instanceof Element){var n=e.closest("button");(null==n?void 0:n.classList.contains(faqActiveClass))?closeFaq(n):changeFaq(n)}}function closeFaq(t){null==t||t.classList.remove(faqActiveClass)}function changeFaq(t){for(var e=0,n=Array.from(faqButtons);e<n.length;e++){closeFaq(n[e])}null==t||t.classList.add(faqActiveClass)}function startCheck(){checkPosition(),mobileMenuInit()}function checkPosition(){window.scrollY>window.innerHeight?activateUpButton():deactivateUpButton()}function activateUpButton(){null==up_button||up_button.classList.add(upBtnActiveClass)}function deactivateUpButton(){null==up_button||up_button.classList.remove(upBtnActiveClass)}function scrollUp(){window.scrollTo({top:0,behavior:"smooth"})}var bodyElement=document.querySelector("body");function mobileMenuInit(){window.addEventListener("resize",mobileResizeHendler),window.innerWidth<960&&mobileMenuStart()}function mobileResizeHendler(){window.innerWidth<960&&mobileMenuStart()}function mobileMenuStart(){setTimeout(function(){window.removeEventListener("resize",mobileResizeHendler)},0);var t=document.getElementById("mobile_button");null==t||t.addEventListener("click",mobileMenuToggle);var e=document.querySelectorAll(".menu__item a");e&&e.forEach(function(t){t.addEventListener("click",function(){null==bodyElement||bodyElement.classList.remove("mobile-menu")})})}function mobileMenuToggle(){null==bodyElement||bodyElement.classList.toggle("mobile-menu")}