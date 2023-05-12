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

//---------------------------offers slider--------------------------//
