// Get the modals
var loginModal = document.getElementById("loginModal");
var signupModal = document.getElementById("signupModal");

// Get the buttons that open the modals
var loginBtn = document.getElementById("loginBtn");
var signupBtn = document.getElementById("signupBtn");

// Get the <span> elements that close the modals
var closeButtons = document.getElementsByClassName("close");

// When the user clicks the login button, open the login modal
loginBtn.onclick = function() {
    loginModal.style.display = "block";
}

// When the user clicks the sign-up button, open the sign-up modal
signupBtn.onclick = function() {
    signupModal.style.display = "block";
}

// Close modal when clicking the "x"
for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function() {
        loginModal.style.display = "none";
        signupModal.style.display = "none";
    }
}

// When the user clicks anywhere outside the modal, close it
window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
    if (event.target == signupModal) {
        signupModal.style.display = "none";
    }
}
document.getElementById('cake-customization-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the selected options
    const size = document.getElementById('cake-size').value;
    const flavor = document.getElementById('cake-flavor').value;
    const decoration = document.getElementById('cake-decoration').value;
    const message = document.getElementById('personal-message').value;

    // Update selected cake image based on the flavor selected (example logic)
    let cakeImage = 'default-cake.jpg'; // Default image path

    if (flavor === 'chocolate') {
        cakeImage = 'chocolate-cake.jpg'; // Change this path to your actual image
    } else if (flavor === 'vanilla') {
        cakeImage = 'vanilla-cake.jpg'; // Change this path to your actual image
    } else if (flavor === 'red-velvet') {
        cakeImage = 'red-velvet-cake.jpg'; // Change this path to your actual image
    } else if (flavor === 'carrot') {
        cakeImage = 'carrot-cake.jpg'; // Change this path to your actual image
    }

    document.getElementById('selected-cake-image').src = cakeImage;

    // Display confirmation or add to cart logic
    alert(`You have selected:\nSize: ${size}\nFlavor: ${flavor}\nDecoration: ${decoration}\nMessage: ${message}`);
});

