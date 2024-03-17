window.addEventListener("DOMContentLoaded", startScripts, { once: true });
function startScripts() {
    var promoButton = document.querySelector(".order__promo-btn");
    checkPromoInput();
    promoButton === null || promoButton === void 0 ? void 0 : promoButton.addEventListener("click", promoInputVisibilityHendler);
}
function checkPromoInput() {
    var promoInput = document.getElementById("promocode");
    var promoBlock = document.querySelector(".order__promo");
    if (promoInput instanceof HTMLInputElement) {
        var value = promoInput.value;
        if (value !== "")
            promoBlock === null || promoBlock === void 0 ? void 0 : promoBlock.classList.add("order__promo--active");
    }
}
function promoInputVisibilityHendler() {
    var promoInput = document.getElementById("promocode");
    var promoBlock = document.querySelector(".order__promo");
    if (promoInput instanceof HTMLInputElement) {
        var value = promoInput.value;
        console.log(promoInput === null || promoInput === void 0 ? void 0 : promoInput.value);
        if (value === "")
            promoBlock === null || promoBlock === void 0 ? void 0 : promoBlock.classList.toggle("order__promo--active");
    }
}
