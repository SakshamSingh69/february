const scenes = document.querySelectorAll('.scene');
let index = 0;

function showNextScene() {
  scenes[index].classList.remove('active');
  index++;
  if (index < scenes.length) {
    scenes[index].classList.add('active');
  }
}

setInterval(() => {
  if (index < scenes.length - 1) {
    showNextScene();
  }
}, 3500);
