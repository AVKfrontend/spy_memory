const up_button = document.querySelector(".up");
const upBtnActiveClass = "up--active";
const faqButtons = document.getElementsByClassName("faq__btn");
const faqActiveClass = "faq__btn--active";

window.addEventListener("DOMContentLoaded", startCheck, { once: true });
window.addEventListener("scrollend", checkPosition);
if (up_button) {
  up_button.addEventListener("click", scrollUp);
}
if (faqButtons.length > 0) {
  const faqButtonsArray = Array.from(faqButtons);
  for (const but of faqButtonsArray) {
    but.addEventListener("click", (e: Event) => faqHendler(e));
  }
}

// console.log(target instanceof Element);
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
function startCheck() {
  checkPosition();
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
