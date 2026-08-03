// ===============================
// Hermosa Bites - Main JavaScript
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // LOGIN & SIGNUP MODALS
    // ===============================

    const loginModal = document.getElementById("loginModal");
    const signupModal = document.getElementById("signupModal");

    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");

    const closeBtns = document.querySelectorAll(".close");

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            loginModal.style.display = "block";
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener("click", () => {
            signupModal.style.display = "block";
        });
    }

    closeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (loginModal) loginModal.style.display = "none";
            if (signupModal) signupModal.style.display = "none";
        });
    });

    window.addEventListener("click", (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = "none";
        }

        if (e.target === signupModal) {
            signupModal.style.display = "none";
        }
    });

    // ===============================
    // LIVE SEARCH
    // ===============================

    const search = document.querySelector(".search-input");

    if (search) {

        search.addEventListener("keyup", function () {

            let value = this.value.toLowerCase();

            const items = document.querySelectorAll(".menu-item, .product-card, .category");

            items.forEach(item => {

                if (item.innerText.toLowerCase().includes(value)) {

                    item.style.display = "";

                } else {

                    item.style.display = "none";

                }

            });

        });

    }

    // ===============================
    // ADD TO CART
    // ===============================

    const cartButtons = document.querySelectorAll(".add-cart");

    cartButtons.forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".product-card");

            const cakeName = card.querySelector("h3").innerText;

            const price = card.querySelector(".price").innerText;

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            cart.push({
                cake: cakeName,
                price: price
            });

            localStorage.setItem("cart", JSON.stringify(cart));

            showToast(cakeName + " added to cart!");

        });

    });

    // ===============================
    // ORDER FORM
    // ===============================

    const orderForm = document.getElementById("cakeOrderForm");

    if (orderForm) {

        orderForm.addEventListener("submit", function (e) {

            e.preventDefault();

            showToast("🎉 Your order has been placed!");

            orderForm.reset();

        });

    }

    // ===============================
    // SCROLL TO TOP
    // ===============================

    const topBtn = document.createElement("button");

    topBtn.innerHTML = "↑";

    topBtn.id = "topBtn";

    document.body.appendChild(topBtn);

    topBtn.style.cssText = `
        position:fixed;
        right:20px;
        bottom:20px;
        width:50px;
        height:50px;
        border:none;
        border-radius:50%;
        background:#ff6b6b;
        color:white;
        font-size:22px;
        cursor:pointer;
        display:none;
        z-index:9999;
        box-shadow:0 10px 20px rgba(0,0,0,.2);
        transition:.3s;
    `;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 250) {

            topBtn.style.display = "block";

        } else {

            topBtn.style.display = "none";

        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

});

// ===============================
// TOAST MESSAGE
// ===============================

function showToast(message) {

    const toast = document.createElement("div");

    toast.innerHTML = message;

    toast.style.cssText = `
        position:fixed;
        top:20px;
        right:20px;
        background:#2d2d2d;
        color:white;
        padding:15px 20px;
        border-radius:10px;
        font-size:15px;
        z-index:10000;
        opacity:0;
        transition:.4s;
        box-shadow:0 10px 20px rgba(0,0,0,.2);
    `;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.style.opacity = "1";

    }, 100);

    setTimeout(() => {

        toast.style.opacity = "0";

        setTimeout(() => {

            toast.remove();

        }, 400);

    }, 2500);

}