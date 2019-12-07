const vh = v => (v / 100) * Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const vw = v => (v / 100) * Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const rem = num => num * parseFloat(getComputedStyle(document.documentElement).fontSize);
const map = (num, in_min, in_max, out_min, out_max) => (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
const anim = (val, min, max, minR, maxR) => map((val < max) ? val : max, min, max, minR, maxR);
const animate = () => {
    nav.style.width = anim(window.scrollY, 0, vw(25), 300, rem(4)) + "px";
    nav.style.setProperty("--nav-opacity", anim(window.scrollY, 0, vw(12.5), 1, 0));
    burger.style.opacity = 1 - anim(window.scrollY, 0, vw(12.5), 1, 0) + "";
    burger.style.pointerEvents = (burger.style.opacity < 1) ? "none" : "auto";
    scroller.style.transform = "translate( -" + window.scrollY + "px ,0)";
};

let scroller;
let scroll;
let nav;
let burger;
let topButton;

function load() {
    topButton = document.getElementById("top");
    burger = document.getElementById("burger");
    nav = document.getElementById("nav");
    nav.style.setProperty("--nav-opacity", "1");
    scroller = document.getElementById("scroller");
    scroll = document.createElement("div");
    scroll.style.height = scroller.offsetWidth - vw(100) + vh(100) + "px";
    scroll.id = "scroll";
    document.body.appendChild(scroll);
}

function scrolled() {
    if (burger.classList.contains("active")) {
        burger.classList.remove("active");
    }

    if (window.scrollY > vw(50)) {
        if (!topButton.classList.contains("active"))
            topButton.classList.add("active");
    } else {
        if (topButton.classList.contains("active"))
            topButton.classList.remove("active");
    }

    nav.style.transition = "none";
    animate();
}

function resized() {
    scroller = document.getElementById("scroller");
    scroll.style.height = scroller.offsetWidth - vw(100) + vh(100) + "px";
}

function burgerToggle() {
    if (!burger.classList.contains("active")) {
        nav.style.transition = "all .2s ease-in";
        burger.classList.add("active");
        nav.style.width = 300 + "px";
        nav.style.setProperty("--nav-opacity", "1");
        burger.style.opacity = "1";
    } else if (burger.classList.contains("active")) {
        burger.classList.remove("active");
        nav.style.transition = "all .2s ease-in";
        animate();
    }

}

function scrollToTop() {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}