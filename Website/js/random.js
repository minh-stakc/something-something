

const toSeason = () => {
  document
    .getElementById("seasonInfoPointer")
    .scrollIntoView({ behavior: "smooth" });
};
var myNav = document.getElementById("navbar");

if(window.innerWidth <= 768){
  myNav.classList.add("shortNav");
}

window.onscroll = function () {
  if (window.innerWidth > 768) {
    myNav.classList.remove("shortNav");
    if (
      document.body.scrollTop >= 100 ||
      document.documentElement.scrollTop >= 100
    ) {
      moveNav();
    } else {
      originNav();
    }
  }else{
      myNav.classList.add("shortNav");
  }
};

const originNav = () => {
  myNav.classList.remove("nav-moved");
  myNav.classList.add("nav-static");
};

const moveNav = () => {
  myNav.classList.remove("nav-static");
  myNav.classList.add("nav-moved");
};

// const nav_link_items = document.getElementsByClassName(".nav-link");

// for( item of nav_link_items ){
//   item.addEventListener("onmouseenter", item => {
//     item.classList.add("nav-hover");
//     item.classList.remove("nav-leave");
//   })
//   item.addEventListener("onmouseleave", item => {
//     item.classList.add("nav-leave");
//     item.classList.remove("nav-hover");
//   })
// }