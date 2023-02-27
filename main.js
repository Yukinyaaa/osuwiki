document.addEventListener("DOMContentLoaded", () => {
  let pagetop = document.querySelector(".page-top");
    document.addEventListener("scroll", () => {
      if(window.pageYOffset <= 70) {
        pagetop.setAttribute("hidden", "");
      } else {
        pagetop.removeAttribute("hidden");
      }
    });
    pagetop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
});
