const nav = document.querySelector("nav");

let currentY = 0;
let targetY = 0;

window.addEventListener("scroll", () => {
    if (window.innerWidth > 1000) {
        targetY = window.scrollY;
    }
});

function animateNav() {
    if (window.innerWidth > 1000) {
        currentY += (targetY - currentY) * 0.02;
        nav.style.transform = `translateY(${currentY}px)`;
    } else {
        nav.style.transform = "none";
    }

    requestAnimationFrame(animateNav);
}

animateNav();





const buildScreen = document.querySelector("#build-screen");
const buildButton = document.querySelector("#build-button");

document.body.classList.add("build-locked");

buildButton.addEventListener("click", () => {
    buildScreen.classList.add("building");

    setTimeout(() => {
        buildScreen.classList.add("finished");

        document.body.classList.remove("build-locked");
    }, 3600);
});