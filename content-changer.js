// find topbar element

let currentContent = "home"; // content will be Home by default
let typing = '';

let content_names = [
    'about',
    'games',
    'other_projects'
]

// window.addEventListener('DOMContentLoaded', () => {
    var script = document.createElement('script');
    script.src = "//code.jquery.com/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(script);

    const homeButton = document.getElementById("path");
    const aboutButton = document.getElementById("about-button");
    const gamesButton = document.getElementById("games-button");
    const projectsButton = document.getElementById("projects-button");

    homeButton.addEventListener('click', () => {changeContentTo("")})
    aboutButton.addEventListener('click', () => {changeContentTo("/about")});
    gamesButton.addEventListener('click', () => {changeContentTo("/games")});
    projectsButton.addEventListener('click', () => {changeContentTo("/other_projects")});

    document.addEventListener('keydown', function(event) {
        if (event.key.length == 1) {
            typing = typing + event.key;
        }
        else if (event.key == 'Backspace' && typing.length > 0) {
            typing = typing.substring(0, typing.length - 1);
        }
        // silly directory hopping thing
        // not actually using user input here, just matching what they've typed to the known subpages
        else if (event.key == 'Enter' && typing.length > 0) {
            // check if what they've typed matches any of the subpages
            for (let i in content_names) {
                if (typing == content_names[i]) {
                    changeContentTo(content_names[i]);
                }
            }
            if (typing == ".." || typing == "home" || typing == "index"){
                changeContentTo("");
            }
        }

        let p = document.getElementById('path');
        p.innerHTML = `portfolio@garett_hammerle ~/${currentContent} $ ${typing}<span class="blinking-text">_</span>`;
    });

    // changeContentTo("/");
// });


function changeContentTo(path) {
    // $.get("content-pages/" + html, function(data) {
    //     $(".main").html(data);
    // });

    // document.getElementById("content-title").textContent = html

    // let p = document.getElementById("path");
    // let pathname = html.replace(".html", "").replace("home", "");
    // p.innerHTML = `portfolio@garett_hammerle ~/${pathname} $ <span class="blinking-text">_</span>`;
    // currentContent = pathname;
    // typing = "";

    // document.title = `${html.replace(".html", "")} -- clefalto`;

    window.location.href = path;
}