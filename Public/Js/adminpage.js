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

// Populate News
const dummyData = () => {
  mainCards.forEach((card, i) => {
    card.querySelector(".title").innerText =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    card.querySelector(".content").innerText =
      "Aliquam vitae laoreet purus. Vivamus tincidunt nibh rhoncus, varius libero dignissim, molestie odio. Aenean sit amet felis et lectus viverra elementum. In quis tortor dignissim, ultrices odio et, dignissim quam. Donec scelerisque lacinia dolor, a pulvinar enim auctor quis. Sed mollis faucibus lacus id sagittis. Nunc et fringilla ipsum, et dignissim erat. Vivamus leo lorem, iaculis tempor quam nec, malesuada ullamcorper ipsum...".slice(
        0,
        Math.round(Math.random() * -200)
      );
  });
};

// Weather Data for Athens from open-meteo.com
const weatherData = async () => {
  const weather =
    "https://api.open-meteo.com/v1/forecast?latitude=37.9792&longitude=23.7166&hourly=temperature_2m&current_weather=true";
  const res = await fetch(weather);
  const data = await res.json();

  if (data) {
    weatherContent.innerHTML = `
    ${data.current_weather.temperature}<span class='celsius'>°C</span>
    `;
  }
};

weatherData();

var btn1 = document.getElementById("btn-1");
var btn2 = document.getElementById("btn-2");
var btn3 = document.getElementById("btn-3");
var section1 = document.getElementById("section1");
var section2 = document.getElementById("section2");
var section3 = document.getElementById("section3");

btn1.addEventListener("click", () => {
  section1.style.display = "block";
  section2.style.display = "none";
  section3.style.display = "none";
});

btn2.addEventListener("click", () => {
  section1.style.display = "none";
  section2.style.display = "block";
  section3.style.display = "none";
});

btn3.addEventListener("click", () => {
  section1.style.display = "none";
  section2.style.display = "none";
  section3.style.display = "block";
});

var checkList = document.getElementById("list1");
checkList.getElementsByClassName("anchor")[0].onclick = function (evt) {
  if (checkList.classList.contains("visible"))
    checkList.classList.remove("visible");
  else checkList.classList.add("visible");
};
