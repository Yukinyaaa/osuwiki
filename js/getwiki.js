document.addEventListener("DOMContentLoaded", () => {
  let id = setInterval(() => {
    if(marked) {
      clearInterval(id);
      main();
    }
  }, 200);
  function main() {
    let path = location.pathname.match(/^\/osuwiki\/(.*)/)[1];
    if(path === "" || path.match(/^wiki\/.+/)) {
      if(path === "") path = "wiki/top_page/";
      if(!path.match(/\/$/)) path += "/";
      let renderer = new marked.Renderer();
      renderer.heading = function(text, level) {
        if(text.split("\n")?.at(0) === "#info") {
          let keys = text.split("\n").slice(1).map(value => {
            return value.split(": ");
          });
          let div = document.createElement("div");
          div.classList.add("title");
          let title = document.createElement("span");
          let date = document.createElement("span");
          date.classList.add("date");
          for(let key of keys) {
            switch(key[0]) {
              case "title":
                $("title").innerText = key[1] + " | osu wiki";
                title.innerText = key[1];
                break;
              case "keywords":
                break;
              case "last_updated":
                let last = new Date(key[1]);
                date.innerText = `${last.getFullYear()}年${last.getMonth().toString().padStart(2, "0")}月${last.getDate().toString().padStart(2, "0")}日`;
                break;
            }
          }
          div.append(date, title);
          return div.outerHTML;
        } else {
          return `<h${level}>${text}</h${level}>`;
        }
      }
      renderer.link = function(href, title, text) {
        if(!href.match(/^\//)) {
          return `<a href="${href}" target="_blank" rel="noopener"${title ? ` title="${title}"` : ""}>${text ?? href}</a>`;
        } else {
          return `<a href="/osuwiki${href}"${title ? ` title="${title}"` : ""}>${text ?? href}</a>`;
        }
      }
      let req_start = Date.now();
      fetch(`/osuwiki/${path}index.md`, {
        method: "get",
        headers: {
          "Cache-Control": "no-cache",
        }
      })
      .then(res => {
        console.log(res);
        if(res.ok) {
          return res.text();
        } else {
          $("main .wiki").classList.add("err404");
          $("title").innerText = "ページが見つかりませんでした | osu wiki";
        }
      })
      .then(res => {
        let req_end = Date.now();
        $("main .wiki").innerHTML = marked.marked(res, {renderer: renderer});
        let line_start = document.createElement("div");
        line_start.classList.add("line-start");
        $("main .wiki").insertBefore(line_start, $("main .wiki").firstChild);
        let parse_end = Date.now();
        $("main .header .sum-time").innerText = (parse_end - req_start) + "ms";
        $("main .header .req-time").innerText = (req_end - req_start) + "ms";
        $("main .header .parse-time").innerText = (parse_end - req_end) + "ms";
      })
      .catch(e => {
        console.log(e);
        $("main .wiki").classList.add("err404");
        $("title").innerText = "ページが見つかりませんでした | osu wiki";
      });
    } else {
      $("main .wiki").classList.add("err404");
      $("title").innerText = "ページが見つかりませんでした | osu wiki";
    }
  }
});
