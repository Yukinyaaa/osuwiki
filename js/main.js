function $(name) {
  let nodes = document.querySelectorAll(name);
  return nodes.length == 1 ? nodes[0] : nodes;
}
if(localStorage.getItem("darkmode") == "true") {
  let id = setInterval(() => {
    if(document.body) {
      document.body.classList.add("dark");
      clearInterval(id);
    }
  }, 10);
}
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
  document.addEventListener("scroll", () => {
    if(window.scrollY <= 70) {
      document.body.classList.remove("scroll");
    } else {
      document.body.classList.add("scroll");
    }
  });
  document.dispatchEvent(new Event("scroll"));
  
  $("nav .hamburger").addEventListener("click", () => {
    document.body.classList.toggle("menu-show");
  });
  
  $(".page-top").addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  
  $("main .header .sum-time").addEventListener("click", () => {
    $("main .header .detail").classList.toggle("detail-show");
  });
  
  $("nav .dark-switcher").addEventListener("click", () => {
    if(localStorage.getItem("darkmode") != "false") {
      document.body.classList.remove("dark");
      localStorage.setItem("darkmode", "false");
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("darkmode", "true");
    }
  });
});
