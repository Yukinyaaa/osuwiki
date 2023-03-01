function $(name) {
  let nodes = document.querySelectorAll(name);
  return nodes.length == 1 ? nodes[0] : nodes;
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
});
