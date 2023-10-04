 var game = false,
     latest = [],
     fullStory = [],
     clickcount = 0;
 
 function updateTimer() {
  document.getElementById("timer").innerHTML = document.getElementById("timesel").value;
}

function textUpdate() {
  if (!game) {
    startGame();
  }
  latest.push(document.getElementById("textbox").value);
}

function startGame() {
  game = true;
  document.getElementById("timesel").disabled = true;
  document.getElementById("done").disabled = true;
  var timeleft = document.getElementById("timesel").value;
  var countdown = setInterval(function() {
    document.getElementById("timer").innerHTML = timeleft;
    if(timeleft < (document.getElementById("timesel").value/3)) {
      document.body.style.background="#ffa"
    }
    if(timeleft < (document.getElementById("timesel").value/5)) {
      document.body.style.background="#faa"
    }
    if (timeleft === 0) {
       clearInterval(countdown);
       endGame()
    }
    timeleft-=1;
  }, 1000);
}

function endGame() {
  document.getElementById("textbox").blur();
  document.getElementById("timesel").disabled = false;
  document.getElementById("done").disabled = false;
  document.getElementById("previous").innerHTML = latest[latest.length-1];
  document.getElementById("textbox").value = "";
  updateTimer();
  fullStory.push(latest);
  latest = [];
  game = false;
  document.body.style.background="#fff"
}

function done() {
  document.getElementById("timesel").style.display = "none";
  document.getElementById("timer").style.display = "none";
  document.getElementById("previous").style.display = "none";
  document.getElementById("textbox").style.display = "none";
  document.getElementById("done").innerHTML = "Start presentation";
  if(clickcount===1){
    document.getElementById("done").style.display = "none";
    present();
  }
  clickcount++;
}

function present() {
  var section = 0,
      iteration = 0,
      para;
  var presentation = setInterval(function() {
    if (iteration === fullStory[section].length) {
      section++;
      iteration=0;
    }
    if (section === fullStory.length) {
      clearInterval(presentation);
    }
    if(iteration === 0) {
      para = document.createElement("p");
      document.body.appendChild(para);
    }
    para.innerHTML = fullStory[section][iteration];
    iteration++;
  },50)
}
