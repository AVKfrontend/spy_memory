window.addEventListener("DOMContentLoaded", startScripts, { once: true });
function startScripts() {
    var promoButton = document.querySelector(".order__promo-btn");
    checkPromoInput();
    promoButton === null || promoButton === void 0 ? void 0 : promoButton.addEventListener("click", promoInputVisibilityHendler);
}
function checkPromoInput() {
    var _a = getPromoElements(), promoInput = _a.promoInput, promoBlock = _a.promoBlock;
    if (promoInput instanceof HTMLInputElement) {
        var value = promoInput.value;
        if (value !== "")
            promoBlock === null || promoBlock === void 0 ? void 0 : promoBlock.classList.add("order__promo--active");
    }
}
function promoInputVisibilityHendler() {
    var _a = getPromoElements(), promoInput = _a.promoInput, promoBlock = _a.promoBlock;
    if (promoInput instanceof HTMLInputElement) {
        var value = promoInput.value;
        if (value === "")
            promoBlock === null || promoBlock === void 0 ? void 0 : promoBlock.classList.toggle("order__promo--active");
    }
}
function getPromoElements() {
    var promoInput = document.getElementById("promocode");
    var promoBlock = document.querySelector(".order__promo");
    return { promoInput: promoInput, promoBlock: promoBlock };
}
