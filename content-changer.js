// find topbar element

let currentContent = "home"; // content will be Home by default
let typing = '';

window.addEventListener('DOMContentLoaded', () => {
    var script = document.createElement('script');
    script.src = "//code.jquery.com/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(script);

    const homeButton = document.getElementById("path");
    const aboutButton = document.getElementById("about-button");
    const gamesButton = document.getElementById("games-button");
    const projectsButton = document.getElementById("projects-button");

    homeButton.addEventListener('click', () => {changeContentTo("home.html")})
    aboutButton.addEventListener('click', () => {changeContentTo("about.html")});
    gamesButton.addEventListener('click', () => {changeContentTo("games.html")});
    projectsButton.addEventListener('click', () => {changeContentTo("projects.html")});

    document.addEventListener('keydown', function(event) {
        if (event.key.length == 1) {
            typing = typing + event.key;
        }
        else if (event.key == 'Backspace' && typing.length > 0) {
            typing = typing.substring(0, typing.length - 1);
        }

        let p = document.getElementById('path');
        p.innerHTML = `visitor@clefalto ~/${currentContent} $ ${typing}<span class="blinking-text">▮</span>`;
    });

    changeContentTo("home.html");
});


function changeContentTo(html) {
    $.get(html, function(data) {
        $(".main").html(data);
    });

    let p = document.getElementById("path");
    let pathname = html.replace(".html", "").replace("home", "");
    p.innerHTML = `visitor@clefalto ~/${pathname} $ <span class="blinking-text">▮</span>`;
    currentContent = pathname;
    typing = "";

    document.title = `${html.replace(".html", "")} -- clefalto`;
}

