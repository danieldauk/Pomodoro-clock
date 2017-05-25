var breakValue = 5;
var workValue = 20;
var workInterval = 0;
var breakInterval = 0;
var breakValueTemp = 0;
var workValueTemp = 0;
var workTimeMins = 0;
var breakTimeMins = 0;
var workTimeSecs = 0;
var breakTimeSecs = 0;
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
    $(".progressbar-text").text(String(workValue));
  }
  
  
  
  //start button
   $("#start").on("click", function() {
   startWorkInterval();
 });
  
  
  //work counter 
  function startWorkInterval () {
    
    //resetting the break time and converting mins to secs
    workValueTemp = workValue*60;
    //calling funtion to start counting right away
    startWork(); 
    workInterval = setInterval(function() {
     if(workValueTemp == 0) {
       clearInterval(workInterval);
       startBreakInterval();
     }
     startWork();
   }, 1000);
  }
  
  //converting mins to mins and secs

  
  function startWork() {
    //converting secs to mins and secs
    workTimeMins = Math.floor(workValueTemp/60);
    workTimeSecs = (workValueTemp - workTimeMins*60);
    
    //changing progress circle text and decreasing seconds
    if(workTimeSecs<10) {
      workTimeSecs = "0" + String(workTimeSecs);
    }
    $(".progressbar-text").text(workTimeMins + ":" + workTimeSecs);
    workValueTemp--;
    
  }
  
  
  //break counter (cant clear break interval ??)
  
  function startBreakInterval () {
    
    //resetting the break time and converting mins to secs
    breakValueTemp = breakValue;
    //calling funtion to start counting right away
    startBreak() 
    breakInterval = setInterval(function() {
     if(breakValueTemp == 0) {
       clearInterval(breakInterval);
       startWorkInterval();
     }
     startBreak();
   }, 1000);
  }
    
  function startBreak() {
    
    //changing text and decreasing seconds
    $(".progressbar-text").text(breakValueTemp);
    breakValueTemp--;
    
  }  
  
    
});
