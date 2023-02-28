document.addEventListener("DOMContentLoaded", () => {
  let id = setInterval(() => {
    if(marked) {
      clearInterval(id);
      main();
    }
  }, 200);
  function main() {
    let path = location.pathname.match(/\/osuwiki\/(.*)/)[1];
    if(path === "") {
      path = "wiki/top_page/";
    }
    if(!path.match(/\/$/)) {
      path += "/";
    }
    let start = Date.now();
    fetch(`/osuwiki/${path}index.md`)
    .then(res => {
      console.log(res);
      if(res.ok) return res.text();
      else console.log(res.status);
    })
    .then(res => {
      $("main .wiki").innerHTML = marked.marked(res);
      $("main .header .time").innerText = (Date.now() - start) + "ms";
    });
  }
});
