document.addEventListener("DOMContentLoaded", () => {
  let pagetop = document.querySelector(".page-top");
  let top = document.querySelector("nav .top");
  document.addEventListener("scroll", () => {
    if(window.pageYOffset <= 70) {
      pagetop.setAttribute("hidden", "");
      top.setAttribute("hidden", "");
    } else {
      pagetop.removeAttribute("hidden");
      top.removeAttribute("hidden");
    }
  });
  document.dispatchEvent(new Event("scroll"));
  pagetop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  
  let nav = document.querySelector("nav");
  let hamburger = document.querySelector("nav .hamburger");
  let menu = document.querySelector("nav .menu");
  hamburger.addEventListener("click", () => {
    pagetop.classList.toggle("menu-show");
    nav.classList.toggle("menu-show");
    menu.classList.toggle("menu-show");
  });
});
