// =========================================
// SIDEBAR ANIMATION
// =========================================


const nav = document.querySelector("nav");

let currentY = 0;
let targetY = 0;
let isAnimating = false;

function animateNav() {
    if (window.innerWidth > 1000) {
        // Interpolate position towards target
        currentY += (targetY - currentY) * 0.1;

        // Use translate3d to leverage GPU hardware acceleration
        nav.style.transform = `translate3d(0, ${currentY}px, 0)`;

        // Keep running if we haven't reached the target position yet
        if (Math.abs(targetY - currentY) > 0.05) {
            requestAnimationFrame(animateNav);
        } else {
            // Snap to exact target and stop the loop to rest the CPU
            currentY = targetY;
            nav.style.transform = `translate3d(0, ${targetY}px, 0)`;
            isAnimating = false;
        }
    } else {
        // Clear transforms on smaller screens so mobile layout works properly
        nav.style.transform = "none";
        isAnimating = false;
    }
}

// Listen for scroll events efficiently
window.addEventListener("scroll", () => {
    if (window.innerWidth > 1000) {
        targetY = window.scrollY;

        if (!isAnimating) {
            isAnimating = true;
            requestAnimationFrame(animateNav);
        }
    }
}, { passive: true });

// Handle browser window resizes
window.addEventListener("resize", () => {
    if (window.innerWidth <= 1000) {
        nav.style.transform = "none";
        currentY = 0;
        targetY = 0;
        isAnimating = false;
    }
});


// =========================================
// BUILD SCREEN ANIMATION & DOM REMOVAL
// =========================================


const buildScreen = document.querySelector("#build-screen");
const buildButton = document.querySelector("#build-button");

document.body.classList.add("build-locked");

buildButton.addEventListener("click", () => {
    buildScreen.classList.add("building");

    setTimeout(() => {
        buildScreen.classList.add("finished");
        document.body.classList.remove("build-locked");

        // Wait for the exit animation to finish before removing from DOM
        setTimeout(() => {
            if (buildScreen) {
                buildScreen.remove();
            }
        }, 1100); 

    }, 3600);
});