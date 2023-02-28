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
    let renderer = new marked.Renderer();
    renderer.heading = function(text, level) {
      if(text.split("\n")?.at(0) === "#info") {
        let keys = text.split("\n").slice(1).map(value => {
          return value.split(": ");
        });
        for(let key of keys) {
          switch(key[0]) {
            case "title":
              $("title").innerText = key[1] + " | osu wiki";
              break;
            case "description":
              $("meta[name=description]").setAttribute("content", key[1]);
              break;
            case "keywords":
              $("meta[name=keywords]").setAttribute("content", key[1]);
              break;
            case "last_updated":
              
              break;
          }
        }
        return "";
      } else {
        return `<h${level}>${text}</h${level}>`;
      }
    }
    renderer.link = function(href, title, text) {
      console.log(href, title, text);
      if(!href.match(/^\//)) {
        return `<a href="${href}" target="_blank" rel="noopener"${title ? ` title="${title}"` : ""}>${text ?? href}</a>`;
      } else {
        return `<a href="/osuwiki${href}"${title ? ` title="${title}"` : ""}>${text ?? href}</a>`;
      }
    }
    let start = Date.now();
    fetch(`/osuwiki/${path}index.md`)
    .then(res => {
      console.log(res);
      if(res.ok) return res.text();
      else console.log(res.status);
    })
    .then(res => {
      $("main .wiki").innerHTML = marked.marked(res, {renderer: renderer});
      $("main .header .time").innerText = (Date.now() - start) + "ms";
    });
  }
});
