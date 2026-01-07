const drums = document.querySelectorAll(".drum-pad");
const display = document.getElementById("display");

drums.forEach(function (drum){
  drum.addEventListener("click",()=>{
    playSound(drum);
  });
});

document.addEventListener("keydown",function(event){
  switch(event.key){
    case 'q':
      playSound(drums[0]);
      break;
    case 'w':
      playSound(drums[1]);
      break;
    case 'e':
      playSound(drums[2]);
      break;
    case 'a':
      playSound(drums[3]);
      break;
    case 's':
      playSound(drums[4]);
      break;
    case 'd':
      playSound(drums[5]);
      break;
    case 'z':
      playSound(drums[6]);
      break;
    case 'x':
      playSound(drums[7]);
      break;
    case 'c':
      playSound(drums[8]);
      break;
  }
})


function playSound(drum){
  const sound = drum.children[1];
  sound.currentTime = 0;
  sound.play();
  drum.classList.add("clicked");
  let displayString = drum.getAttribute("id").split("-").join(" ");
  display.innerText = displayString;
  setTimeout(()=>{drum.classList.remove("clicked");
  },100);
}