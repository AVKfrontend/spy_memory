var up_button = document.querySelector(".up");
var upBtnActiveClass = "up--active";
var faqButtons = document.getElementsByClassName("faq__btn");
var faqActiveClass = "faq__btn--active";
window.addEventListener("DOMContentLoaded", startCheck, { once: true });
window.addEventListener("scrollend", checkPosition);
if (up_button) {
    up_button.addEventListener("click", scrollUp);
}
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
function startCheck() {
    checkPosition();
    mobileMenuInit();
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
                bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.classList.remove("mobile-menu");
            });
        });
    }
}
function mobileMenuToggle() {
    bodyElement === null || bodyElement === void 0 ? void 0 : bodyElement.classList.toggle("mobile-menu");
}
