// find topbar element

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
});



function changeContentTo(html) {
    console.log(html);
    $.get(html, function(data) {
        $(".main").html(data);
    });

    let p = document.getElementById("path");
    let pathname = html.replace(".html", "").replace("home", "");
    p.innerText = `visitor@clefalto ~/${pathname} $`;
    document.title = `${html.replace(".html", "")} -- clefalto`;

}

changeContentTo("home.html");