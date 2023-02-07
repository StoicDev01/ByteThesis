var searchElem = document.getElementById("search-input");
var posts;

function loadSearch() { 
    // call the index.json file from server by http get request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                posts = JSON.parse(xhr.responseText);
                console.log(posts);
            } else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.open('GET', "/index.json");
    xhr.send();
}

loadSearch(); // call loadsearch to load the json file

function constructPageBlock(data){
  let categories = [];
  let date = new Date(data.date);
  let formated_date = date.toLocaleDateString("en-Us", {month: "long", day: "numeric", year: "numeric"})

  data.categories.forEach(function (element) {
    categories.push(
      `<a class="accentued" href="/categories/${element}">${element}</a>`
    );
  })

  return `<div class="page-block shadow2 round">
  <div class="page-block-wrapper">

      <div class="page-block-tags">
          <span class="tags">
            ${categories.join("\n")}
          </span>
      </div>

      <div class="page-block-header">
          <h2 class="page-block-title">
              <a href="${data.permalink}">
                  ${data.title}
              </a>
          </h2>
      </div>

      <div class="page-block-excerpt">
          ${data.content}
      </div>

      <time class="page-block-date">
          ${formated_date}
      </time>
  </div>
</div>`
}

function showSearchResults() {
    var query = searchElem.value || ''; // get the value from input
    var searchString = query.replace(/[^\w\s]/gi, ''); // clear white spaces
    var target = document.getElementById('search-results'); // target the ul list to render the results
    var postsByTitle = posts.reduce((acc, curr) => { // map lunr search index to your articles
        acc[curr.title] = curr;
        return acc;
    }, {}
    );
    // build lunr index file
    var index = lunr(function () {
        this.ref('title')
        this.field('content')
        this.field('title')
        posts.forEach(function (doc) {
            this.add(doc)
        }, this)
    });
    // search in lunr index
    if (searchString && searchString != '') {
        var matches = index.search(searchString);
        var matchPosts = [];
        matches.forEach((m) => {
            matchPosts.push(postsByTitle[m.ref]);
        });
        if (matchPosts.length > 0) {
            // match found with input text and lunr index
            target.innerHTML = matchPosts.map(function (p) {
                if (p != undefined) {
                    return constructPageBlock(p);
                }
            }).join('');
        } else {
            // if no results found, then render a general message
            target.innerHTML = `<br><h2 style="text-align:center">No search results found</h2>`;
        };
    } else {
        target.innerHTML = ''
    }
};
