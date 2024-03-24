var bodyElement = document.querySelector("body");
var mobileMenuClass = "mobile-menu";
(function mobileMenuInit() {
    if (window.innerWidth < 960)
        mobileMenuStart();
    else
        window.addEventListener("resize", mobileResizeHendler);
})();
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
