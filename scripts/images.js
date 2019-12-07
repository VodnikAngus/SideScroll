var imagesDiv;
var plavaSmrtovnica;
var plaveSmrtovnice = [];
var images = [];
var index = 0;
var timer;

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(() => changeRight(), 2500);
}

function changeImage(i) {
  images[index].style.opacity = "0";
  index = i;
  images[index].style.opacity = "1";
  console.log(index);
}

function changeLeft() {
  changeImage((index + 1) % images.length);
  resetTimer();
}

function changeRight() {
  changeImage(index == 0 ? images.length - 1 : index - 1);
  resetTimer();
}

function imageLoad() {
  imagesDiv = document.getElementById("images");
  plavaSmrtovnica = document.getElementById("plavaSmrtovnica");
  for (let i = 0; i < 5; i++) {
    var image = document.createElement("img");
    image.src = "https://picsum.photos/300/200?random=" + i;
    image.alt = "img " + i;
    image.style.opacity = i == 0 ? "1" : "0";
    images.push(image);
    imagesDiv.appendChild(images[i]);

    var smrtovncia = document.createElement("div");
    smrtovncia.onclick = function() {
      changeImage(i);
      resetTimer();
    };
    plavaSmrtovnica.appendChild(smrtovncia);
  }

  resetTimer();
}
