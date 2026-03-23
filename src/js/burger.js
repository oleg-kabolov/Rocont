const burgerBtn = document.querySelector(".burger-menu__burger-btn");
const burgerMenu = document.querySelector(".burger-menu");
const burgerCloseBtn = document.querySelector(
  ".burger-menu__burger-menu-close-btn",
);
const burgerNavigation = document.querySelector(".burger-menu nav");

burgerBtn.addEventListener("click", (e) => {
  show();
  console.log("click");
});
burgerCloseBtn.addEventListener("click", (e) => {
  hide();
});

function show() {
  burgerNavigation.style.visibility = "visible";
  burgerNavigation.style.opacity = "1";
  burgerNavigation.style.display = "block";
  burgerCloseBtn.style.display = "block";

  disableScroll();
}
function hide() {
  burgerNavigation.style.visibility = "hidden";
  burgerNavigation.style.opacity = "0";
  burgerNavigation.style.transition = "visibility 0.2s, opacity 0.5s linear";
  burgerCloseBtn.style.display = "none";
  enableScroll();
}

function disableScroll() {
  document.body.classList.add("remove-scrolling");
}

function enableScroll() {
  document.body.classList.remove("remove-scrolling");
}
