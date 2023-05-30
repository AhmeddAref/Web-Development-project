"use strict";
var util = {
  mobileMenu() {
    var nav = document.getElementById("nav");
    nav.classList.toggle("nav-visible");
  },
  windowResize() {
    if (window.innerWidth > 800) {
      var nav = document.getElementById("nav");
      nav.classList.remove("nav-visible");
    }
  },
  scrollEvent() {
    var scrollPosition = document.documentElement.scrollTop;

    util.scrollMenuIds.forEach(function (link) {
      var container = document.querySelector(link.getAttribute("href")),
        containerOffset = container.offsetTop,
        containerHeight = container.offsetHeight,
        containerBottom = containerOffset + containerHeight;

      if (
        scrollPosition < containerBottom - 20 &&
        scrollPosition >= containerOffset - 20
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  },
};

util.scrollMenuIds = Array.from(document.querySelectorAll("a.nav-link[href]"));

document.getElementById("menu").addEventListener("click", util.mobileMenu);
window.addEventListener("resize", util.windowResize);
document.addEventListener("scroll", util.scrollEvent);

document.addEventListener("DOMContentLoaded", function (event) {
  util.scrollMenuIds = document.querySelectorAll("a.nav-link[href]");
  document.getElementById("menu").addEventListener("click", util.mobileMenu);
  window.addEventListener("resize", util.windowResize);
  document.addEventListener("scroll", util.scrollEvent);
});

/*-----------------Slideshow----------------*/
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 4000);
}

var docWidth = document.documentElement.offsetWidth;
[].forEach.call(document.querySelectorAll("*"), function (el) {
  if (el.offsetWidth > docWidth) {
    console.log(el);
  }
});

//---------------------------add to cart--------------------------//
var cartbtn = document.getElementsByClassName("add-to-cart-button");
for (var i = 0; i < cartbtn.length; i++) {
  var btn = cartbtn[i];

  btn.addEventListener("click", (event) => {
    var clickedBtn = event.target;
    var item = clickedBtn.parentElement;

    var title = item.getElementsByClassName("product-name")[0].innerText;
    var price = item.getElementsByClassName("discount-price")[0].innerText;
    var description = item.getElementsByClassName("product-description")[0]
      .innerText;

    var imgsrc = item.getElementsByClassName("product-image")[0].src;

    const data = {
      image: imgsrc,
      title: title,
      description: description,
      price: price,
      quantity: 1,
    };

    fetch("/save-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // Handle the response from the server if needed
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error:", error);
      });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("not").innerText === "You are not an Admin") {
    document.getElementById("not-popup").style.display = "block";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var okbtn = document.getElementsByClassName("not-popup__button");

  document.addEventListener("click", function () {
    document.getElementById("not-popup").style.display = "none";
  });
});
