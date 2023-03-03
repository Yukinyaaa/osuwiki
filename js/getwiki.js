document.addEventListener("DOMContentLoaded", () => {
  let id = setInterval(() => {
    if(marked) {
      clearInterval(id);
      main();
    }
  }, 200);
  function main() {
    let svgs = {
      home: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M543.8 287.6c17 0 32-14 32-32.1c1-9-3-17-11-24L512 185V64c0-17.7-14.3-32-32-32H448c-17.7 0-32 14.3-32 32v36.7L309.5 7c-6-5-14-7-21-7s-15 1-22 8L10 231.5c-7 7-10 15-10 24c0 18 14 32.1 32 32.1h32v69.7c-.1 .9-.1 1.8-.1 2.8V472c0 22.1 17.9 40 40 40h16c1.2 0 2.4-.1 3.6-.2c1.5 .1 3 .2 4.5 .2H160h24c22.1 0 40-17.9 40-40V448 384c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v64 24c0 22.1 17.9 40 40 40h24 32.5c1.4 0 2.8 0 4.2-.1c1.1 .1 2.2 .1 3.3 .1h16c22.1 0 40-17.9 40-40V455.8c.3-2.6 .5-5.3 .5-8.1l-.7-160.2h32z"/></svg>',
      folder: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/></svg>',
    }
    let debug = location.hostname !== "yukinyaaa.github.io";
    let path = location.pathname.slice(8).match(/^\/?(.*)\/?$/)[1].split("/");
    if(path[0] == "" || path[0] == "wiki" || path[0] == "debug") {
      if(path[0] == "") path = ["wiki", "top_page"];
      if(path[0] == "debug") {
        path = [...decodeURIComponent(location.hash.slice(1)).match(/^\/?(.*)\/?$/)[1].split("/")];
      }
      // $("main .header .dir");
      let renderer = new marked.Renderer();
      renderer.heading = function(text, level) {
        if(text.split("\n")[0] === "#info") {
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
              case "updated":
                let last = new Date(key[1]);
                date.innerText = `${last.getFullYear()}年${(last.getMonth()+1).toString().padStart(2, "0")}月${last.getDate().toString().padStart(2, "0")}日`;
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
          return `<a href="/osuwiki${debug ? "/debug#" + encodeURIComponent(href) : href}"${title ? ` title="${title}"` : ""}>${text ?? href}</a>`;
        }
      }
      renderer.image = function(href, title, text) {
        return `<img src="/osuwiki/${path.join("/")}${href}"${title ? ` title="${title}"` : ""}${text ? ` alt="${text}"` : ""}>`;
      }
      let req_start = Date.now();
      fetch(`/osuwiki/${path.join("/")}/index.md`, {
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
        let strong = $("main .wiki strong");
        document.addEventListener("scroll", () => {
          for(let i = 0; i < strong.length; i++) {
            let pos = strong[i].getBoundingClientRect().top + window.scrollY;
            if(window.scrollY > pos - window.innerHeight) {
              strong[i].classList.add("highlighted");
            }
          }
        });
        document.dispatchEvent(new Event("scroll"));
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
