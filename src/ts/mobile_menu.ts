//--------mobile menu hendler-------//
const bodyElement = document.querySelector("body");
const mobileMenuClass = "mobile-menu";
(function mobileMenuInit() {
  if (window.innerWidth < 960) mobileMenuStart();
  else window.addEventListener("resize", mobileResizeHendler);
})();
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
