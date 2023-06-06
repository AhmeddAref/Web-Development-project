const container = document.querySelector("main");
const search = document.querySelector(".search label");
const expander = document.querySelector("main .menu .expander");
const current = document.querySelector(".current");
const menuItems = document.querySelectorAll("main .menu .primary .menu-item");
const mainCards = document.querySelectorAll("main .dashboard .card");
const weatherContent = document.querySelector(".side .weather .content");
const date = document.querySelector("main .side .date");
const time = document.querySelector("main .side .time");

// Main Menu
menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    current.innerText = item.querySelector(".desc").textContent;
    menuItems.forEach((item) => item.classList.remove("active"));
    item.classList.add("active");
  });
});

// Set Date, Time
const today = new Date();
const formatZero = (value) => (value < 10 ? "0" + value : value);
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
date.innerText = `${today.getDate()} ${
  months[today.getMonth()]
}, ${today.getFullYear()}`;
time.innerText = `${today.getHours()}:${formatZero(today.getMinutes())}`;

var btn1 = document.getElementById("btn-1");
var btn2 = document.getElementById("btn-2");

var btn5 = document.getElementById("btn-5");
var section1 = document.getElementById("section1");
var section2 = document.getElementById("section2");
var section3 = document.getElementById("section3");
var section4 = document.getElementById("section4");

btn1.addEventListener("click", () => {
  section1.style.display = "block";
  section2.style.display = "none";
  section3.style.display = "none";
  section4.style.display = "none";
});

btn2.addEventListener("click", () => {
  section1.style.display = "none";
  section2.style.display = "block";
  section3.style.display = "none";
  section4.style.display = "none";
});

btn5.addEventListener("click", () => {
  section1.style.display = "none";
  section2.style.display = "none";
  section3.style.display = "none";
  section4.style.display = "block";
});

// var checkList = document.getElementById("list1");
// checkList.getElementsByClassName("anchor")[0].onclick = function (evt) {
//   if (checkList.classList.contains("visible"))
//     checkList.classList.remove("visible");
//   else checkList.classList.add("visible");
// };

var trigger = document.getElementById("trigger");

if (trigger.innerText !== "") {
  btn1.click();
}
