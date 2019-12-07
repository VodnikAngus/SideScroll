const map = (num, in_min, in_max, out_min, out_max) => (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
const random = (min, max) => Math.round(map(Math.random(), 0, 1, min, max)/10)*10;

let imagesDiv;
let brick;
let plavaSmrtovnica;
const plaveSmrtovnice = [];
const images = [];
let index;
let timer;

function setImagesDivSize(pxW, pxH) {
  imagesDiv.style.width = pxW + "px";
  imagesDiv.style.height = pxH + "px";
  brick.style.width = pxW + "px";
  brick.style.height = pxH + "px";
}

function respectMax() {
  console.log(brick.offsetWidth + " " + brick.offsetHeight);
  console.log(imagesDiv.offsetWidth + " " + imagesDiv.offsetHeight);
  if (typeof images[index] !== 'undefined' && typeof brick !== 'undefined')
    if (images[index].offsetWidth  < brick.offsetWidth || images[index].offsetHeight < brick.offsetHeight) {
      imagesDiv.style.transform = "translate(" + (brick.offsetWidth - images[index].offsetWidth)/2 + "px, " + (brick.offsetHeight - images[index].offsetHeight)/2 + "px)";
      console.log("translate(" + (brick.offsetWidth - images[index].offsetWidth)/2 + "px, " + (brick.offsetHeight - images[index].offsetHeight)/2 + "px)");
    } else {
      imagesDiv.style.transform = null;
    }
}

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(() => changeRight(), 5000);
}

function changeImage(i) {
  images[index].style.opacity = "0";
  images[index].style.transform = "translateX(50%)";
  plaveSmrtovnice[index].style.background = "none";
  index = i;
  images[index].style.opacity = "1";
  images[index].style.transform = "translateX(0%)";
  plaveSmrtovnice[index].style.background = null;
  images[index === 0 ? images.length - 1 : index - 1].style.transform = "translateX(-50%)";
  setImagesDivSize(images[index].naturalWidth, images[index].naturalHeight);
  respectMax();
}

function reset() {
  for (let i = 1; i < images.length; i++) {
    images[i].style.transform = "translateX(50%)";
    images[i].style.opacity = "0";
    plaveSmrtovnice[i].style.background = "none";
  }

  images[0].style.opacity = "1";
  plaveSmrtovnice[0].style.background = null;
  respectMax();
}

function changeLeft() {
  changeImage((index + 1) % images.length);
  resetTimer();
}

function changeRight() {
  changeImage(index === 0 ? images.length - 1 : index - 1);
  resetTimer();
}

function imageLoad() {
  imagesDiv = document.getElementById("images");
  plavaSmrtovnica = document.getElementById("plavaSmrtovnica");
  brick = document.getElementById("brick");
  brick.classList.add('brick');
  //document.getElementById("view").appendChild(brick);
  const loading = document.createElement("span");
  loading.innerHTML = "loading";
  imagesDiv.appendChild(loading);

  setImagesDivSize( 300, 300 );
  for (let i = 0; i < 5; i++) {
    const image = document.createElement("img");
    image.src = "https://picsum.photos/" + random(800, 1000) + "/"+ random(700, 1000) +"?random=" + i;
    image.alt = "img " + i;
    image.style.opacity = i === 0 ? "1" : "0";
    if (i === 0) {
      image.onload = function () {
        setImagesDivSize(image.naturalWidth, image.naturalHeight);
      }
    }
    images.push(image);
    imagesDiv.appendChild(images[i]);

    const smrtovnica = document.createElement("div");
    smrtovnica.onclick = function() {
      changeImage(i);
      resetTimer();
    };

    plaveSmrtovnice.push(smrtovnica);
    plavaSmrtovnica.appendChild(smrtovnica);
  }

  imagesDiv.removeChild(loading);
  reset();
  index = 0;
  resetTimer();
}

document.addEventListener("keydown", (event) => {

  if (event.key !== undefined) {
    if (event.key === "ArrowLeft") {
      changeLeft();
      console.log("wow");
    }
    if (event.key === "ArrowRight")
      changeRight();
    return;
  }
  // noinspection JSDeprecatedSymbols
  if (event.keyCode !== undefined) {
    // noinspection JSDeprecatedSymbols
    if (event.keyCode === 37)
      changeLeft();
    // noinspection JSDeprecatedSymbols
    if (event.keyCode === 39)
      changeRight();
    return;
  }

}, true);