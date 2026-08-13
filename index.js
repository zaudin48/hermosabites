document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // LOGIN / SIGNUP MODALS
    // ==============================

    const loginModal = document.getElementById("loginModal");
    const signupModal = document.getElementById("signupModal");

    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");

    // Open Login
    if (loginBtn && loginModal) {
        loginBtn.addEventListener("click", () => {
            loginModal.style.display = "block";
        });
    }

    // Open Signup
    if (signupBtn && signupModal) {
        signupBtn.addEventListener("click", () => {
            signupModal.style.display = "block";
        });
    }

    // Close buttons
    document.querySelectorAll(".close").forEach(button => {

        button.addEventListener("click", () => {

            if (loginModal) {
                loginModal.style.display = "none";
            }

            if (signupModal) {
                signupModal.style.display = "none";
            }

        });

    });

    // Close when clicking outside
    window.addEventListener("click", event => {

        if (event.target === loginModal) {
            loginModal.style.display = "none";
        }

        if (event.target === signupModal) {
            signupModal.style.display = "none";
        }

    });


    // ==============================
    // LIVE SEARCH
    // ==============================

    const searchInput = document.querySelector(".search-input");

    const searchableItems = document.querySelectorAll(
        ".product-card, .menu-item, .category"
    );

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            const searchValue =
                searchInput.value.trim().toLowerCase();

            searchableItems.forEach(item => {

                const text =
                    item.textContent.toLowerCase();

                if (text.includes(searchValue)) {

                    item.style.display = "";

                } else {

                    item.style.display = "none";

                }

            });

        });

    }


    // ==============================
    // ADD TO CART
    // ==============================

    const cartButtons =
        document.querySelectorAll(".add-cart");

    cartButtons.forEach(button => {

        button.addEventListener("click", () => {

            const card =
                button.closest(".product-card");

            if (!card) return;

            const cakeName =
                card.querySelector("h3")?.textContent.trim()
                || "Cake";

            const price =
                card.querySelector(".price")?.textContent.trim()
                || "";

            let cart =
                JSON.parse(localStorage.getItem("cart"))
                || [];

            cart.push({
                cake: cakeName,
                price: price,
                quantity: 1
            });

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            showToast(
                `🍰 ${cakeName} added to cart!`
            );

        });

    });


    // ==============================
    // ORDER FORM
    // ==============================

    const orderForm =
        document.getElementById("cakeOrderForm");

    if (orderForm) {

        orderForm.addEventListener("submit", event => {

            event.preventDefault();

            if (!orderForm.checkValidity()) {

                orderForm.reportValidity();

                return;

            }

            const orderData =
                Object.fromEntries(
                    new FormData(orderForm).entries()
                );

            localStorage.setItem(
                "lastOrder",
                JSON.stringify(orderData)
            );

            showToast(
                "🎉 Order details saved successfully!"
            );

            orderForm.reset();

        });

    }


    // ==============================
    // CONTACT FORM
    // ==============================

    const contactForm =
        document.querySelector(".contact-section form");

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            if (!contactForm.checkValidity()) {

                contactForm.reportValidity();

                return;

            }

            showToast(
                "📩 Message sent successfully!"
            );

            contactForm.reset();

        });

    }


    // ==============================
    // CAKE CUSTOMIZATION
    // ==============================

    const customizationForm =
        document.getElementById(
            "cake-customization-form"
        );

    if (customizationForm) {

        customizationForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                if (!customizationForm.checkValidity()) {

                    customizationForm.reportValidity();

                    return;

                }

                const customCake =
                    Object.fromEntries(
                        new FormData(
                            customizationForm
                        ).entries()
                    );

                localStorage.setItem(
                    "customCake",
                    JSON.stringify(customCake)
                );

                showToast(
                    "🎂 Custom cake added!"
                );

            }
        );

    }


    // ==============================
    // SCROLL TO TOP
    // ==============================

    const topButton =
        document.createElement("button");

    topButton.id = "topBtn";

    topButton.type = "button";

    topButton.innerHTML = "↑";

    topButton.setAttribute(
        "aria-label",
        "Scroll to top"
    );

    Object.assign(
        topButton.style,
        {
            position: "fixed",
            right: "20px",
            bottom: "20px",
            width: "46px",
            height: "46px",
            border: "none",
            borderRadius: "50%",
            background: "#ff6b6b",
            color: "#fff",
            fontSize: "20px",
            cursor: "pointer",
            display: "none",
            zIndex: "4000",
            boxShadow:
                "0 10px 25px rgba(0,0,0,.18)"
        }
    );

    document.body.appendChild(topButton);


    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            topButton.style.display = "block";

        } else {

            topButton.style.display = "none";

        }

    });


    topButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});


// ==============================
// TOAST NOTIFICATION
// ==============================

function showToast(message) {

    const oldToast =
        document.querySelector(".toast-message");

    if (oldToast) {
        oldToast.remove();
    }


    const toast =
        document.createElement("div");

    toast.className =
        "toast-message";

    toast.textContent =
        message;


    Object.assign(
        toast.style,
        {
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: "6000",
            padding: "13px 18px",
            borderRadius: "12px",
            background: "#2d2d2d",
            color: "#fff",
            boxShadow:
                "0 12px 30px rgba(0,0,0,.2)",
            opacity: "0",
            transform: "translateY(-8px)",
            transition: ".25s"
        }
    );


    document.body.appendChild(toast);


    requestAnimationFrame(() => {

        toast.style.opacity = "1";

        toast.style.transform =
            "translateY(0)";

    });


    setTimeout(() => {

        toast.style.opacity = "0";

        toast.style.transform =
            "translateY(-8px)";


        setTimeout(() => {

            toast.remove();

        }, 250);

    }, 2400);

}