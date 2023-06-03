document.addEventListener("DOMContentLoaded", function () {
  var mode = document.getElementById("mode").innerText;

  if (mode === "signup") {
    document.querySelector(".signup-inactive a.btn").click();
  }
});

document.querySelectorAll(".btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelector(".form-signin").classList.toggle("form-signin-left");
    document.querySelector(".form-signup").classList.toggle("form-signup-left");
    document.querySelector(".frame").classList.toggle("frame-long");
    document
      .querySelector(".signup-inactive")
      .classList.toggle("signup-active");
    document
      .querySelector(".signin-active")
      .classList.toggle("signin-inactive");

    this.classList.remove("idle");
    this.classList.add("active");
  });
});

document.querySelectorAll(".btn_signin").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelector(".btn-animate").classList.toggle("btn-animate-grow");
    document.querySelector(".welcome").classList.toggle("welcome-left");
    document.querySelector(".cover-photo").classList.toggle("cover-photo-down");
    document.querySelector(".frame").classList.toggle("frame-short");
    document
      .querySelector(".profile-photo")
      .classList.toggle("profile-photo-down");
    document.querySelector(".btn-goback").classList.toggle("btn-goback-up");
    document.querySelector(".forgot").classList.toggle("forgot-fade");
  });
});

//Validation part:--------------------------------------------------

let userName = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let phonenumber = document.getElementById("phone");
let confirmPassword = document.getElementById("cpassword");
let alert1 = document.getElementById("alert1");
let alert2 = document.getElementById("alert2");
let alert3 = document.getElementById("alert3");
let alert4 = document.getElementById("alert4");
let alert5 = document.getElementById("alert5");
function handleInput() {
  let userNameValue = userName.value.trim();
  let emailValue = email.value.trim();
  let passwordValue = password.value.trim();
  let phonenumberValue = phonenumber.value.trim();
  let confirmPasswordValue = confirmPassword.value.trim();

  if (userNameValue === "") {
    alert1.innerHTML = "You must enter your name";
  }
  if (phonenumberValue === "") {
    alert3.innerHTML = "You must enter your phone number";
  }

  if (emailValue === "") {
    alert2.innerHTML = "You must enter an email";
  } else if (!isEmail(emailValue)) {
    alert2.innerHTML = "Email is not valid";
  }

  // Checking for password
  if (passwordValue === "") {
    alert4.innerHTML = "Password cannot be blank";
  } else if (passwordValue.length < 6 || passwordValue.length > 30) {
    alert4.innerHTML = "Password should be between 6 and 30 characters";
  }

  // Checking for confirm password
  if (confirmPasswordValue === "") {
    alert5.innerHTML = "Confirm your password ";
  } else if (confirmPasswordValue !== passwordValue) {
    alert5.innerHTML = "Password not the same";
  }
}

// To check if email is valid or not
function isEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// document.getElementById("Signup").addEventListener("click", function () {
//   document.querySelector(".nav").classList.toggle("nav-up");
//   document
//     .querySelector(".form-signup-left")
//     .classList.toggle("form-signup-down");
//   document.querySelector(".success").classList.toggle("success-left");
//   document.querySelector(".frame").classList.toggle("frame-short");
// });

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("not").innerText === "you must be logged in") {
    document.getElementById("not-popup").style.display = "block";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var okbtn = document.getElementsByClassName("not-popup__button");

  document.addEventListener("click", function () {
    document.getElementById("not").innerText = "";
    document.getElementById("not-popup").style.display = "none";
  });
});


//////////////////////////////////////////////////////////////////////////////////////////


function validateForm(event) {
  event.preventDefault(); 

  const productNameInput = document.getElementById('productName');
  const productPriceInput = document.getElementById('productPrice');
  const productName = productNameInput.value;
  const productPrice = productPriceInput.value;

  const namePattern = /^[A-Za-z\s]+$/; 
  const pricePattern = /^\d+(\.\d{1,2})?$/; 

  if (!namePattern.test(productName)) {
    alert('Please enter a valid product name (letters and spaces only).');
    productNameInput.focus();
    return;
  }

  if (!pricePattern.test(productPrice)) {
    alert('Please enter a valid product price (numeric value only).');
    productPriceInput.focus();
    return;
  }

  document.getElementById('addProductForm').submit();
}
