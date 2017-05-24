var breakValue = 5;
var workValue = 20;

$(function() {
  
  
  //initializing progress Circle
    var progressCircle = new ProgressBar.Circle('#clock', {
      strokeWidth: 5,
      fill: "rgba(0,0,0,0.1)",
      text: {
        value: "20:00"
      }
  });
  progressCircle.animate(1, {
      duration: 1000
  });

  //initializing slider Break
  $("#break").roundSlider({
      sliderType: "min-range",
      value: 5,
      circleShape: "half-top",
      min: 1,
      max: 30,
      radius: 80,
      handleSize: "34,10",
      change: setBreak
  });

  //initializing slider Work
  $("#work").roundSlider({
      sliderType: "min-range",
      value: 20,
      circleShape: "half-top",
      min: 1,
      max: 60,
      radius: 80,
      change: setWork,
      handleSize: "34,10"
      
  });

//getting values from sliders
  function setBreak () {
    breakValue = $("#break").roundSlider("getValue");
  }

  function setWork() {
    workValue = $("#work").roundSlider("getValue");
    console.log(workValue);
    $(".progressbar-text").text(String(workValue));
  }
  
  //work counter 
  function startWorkInterval () {
    var workInterval = setInterval(function() {
     if(workValue == 0) {
       startBreakInterval();
       clearInterval(workInterval);
       
     }
     startWork(workValue);
   }, 1000);
    
  }
  
  function startWork(valueTime) {
    workValue--;
    $(".progressbar-text").text(valueTime);
  }
  
 $("#start").on("click", function() {
   startWorkInterval();
 });
  
  //break counter (cant clear break interval ??)
  
  function startBreakInterval () {
    var breakInterval = setInterval(function() {
     if(breakValue == 0) {
       console.log("im here");
       startWorkInterval();
       clearInterval(breakInterval);
       
     }
     startBreak(breakValue);
   }, 1000);
  }
    
  function startBreak(valueTime) {
    breakValue--;
    $(".progressbar-text").text(valueTime);
  }  
  
    
});
