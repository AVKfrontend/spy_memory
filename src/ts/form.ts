window.addEventListener("DOMContentLoaded", startScripts, { once: true });

function startScripts() {
  const promoButton = document.querySelector(".order__promo-btn");
  checkPromoInput();
  promoButton?.addEventListener("click", promoInputVisibilityHendler);
}
function checkPromoInput() {
  const promoInput = document.getElementById("promocode");
  const promoBlock = document.querySelector(".order__promo");
  if (promoInput instanceof HTMLInputElement) {
    const value = promoInput.value;
    if (value !== "") promoBlock?.classList.add("order__promo--active");
  }
}
function promoInputVisibilityHendler() {
  const promoInput = document.getElementById("promocode");
  const promoBlock = document.querySelector(".order__promo");
  if (promoInput instanceof HTMLInputElement) {
    const value = promoInput.value;
    console.log(promoInput?.value);
    if (value === "") promoBlock?.classList.toggle("order__promo--active");
  }
}
//  console.log(promoInput instanceof HTMLInputElement);
