var breakValue = 5;
var workValue = 20;
var workInterval = 0;
var breakInterval = 0;
var breakValueTemp = 0;
var workValueTemp = 0;
var timeMins = 0;
var timeSecs = 0;
var timeForProgCircle = 0;


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
    $(".progressbar-text").text(String(workValue)+":00");
  }
  
  
  
  //start button
   $("#start").on("click", function() {
     //setting progress bar back to 0 and starting counter
     
     progressCircle.animate(0, {
      duration: 1000
     }, function() {
      startWorkInterval ();
     });
 });
  
  
  //work counter 
  function startWorkInterval () {
    
    //resetting the work time and converting mins to secs
    workValueTemp = workValue*60;
    
    //starting progressCircle animation
    timeForProgCircle = workValueTemp*200;
    
    progressCircle.animate(1, {
      duration: timeForProgCircle
  });

    
    //calling funtion to start counting right away
    startWork(workValueTemp); 
    workInterval = setInterval(function() {
     if(workValueTemp == 0) {
       clearInterval(workInterval);
       
       //setting progress circle to 0 and starting break counter
       
       progressCircle.animate(0, {
        duration: 1000
       }, function() {
          startBreakInterval();
       });
      
     }
     startWork(workValueTemp);
   }, 200);
  }
  
  //converting mins to mins and secs
  function convertTime(value) {
    console.log(value);
    timeMins = Math.floor(value/60);
    timeSecs = (value - timeMins*60);
    if(timeSecs<10) {
      timeSecs = "0" + String(timeSecs);
    }
  }
  
  
  function startWork(value) {
      convertTime(value);
      //changing progress circle text and decreasing seconds
    $(".progressbar-text").text(timeMins + ":" + timeSecs);
    workValueTemp--;
    
  }
  

  
  function startBreakInterval () {
    
    //resetting the break time 
    breakValueTemp = breakValue*60;
    //starting progressCircle animation
    var timeForProgCircle = breakValueTemp*200;
    progressCircle.animate(1, {
      duration: timeForProgCircle
    });
    
    //calling funtion to start counting right away
    startBreak(breakValueTemp) ;
    breakInterval = setInterval(function() {
     if(breakValueTemp == 0) {
       clearInterval(breakInterval);
       //setting progress circle to 0 and starting break counter
       
       progressCircle.animate(0, {
        duration: 1000
       }, function() {
          startWorkInterval();
       });
       
     }
     startBreak(breakValueTemp);
   }, 200);
  }
    
  function startBreak(value) {
    convertTime(value);
    //changing text and decreasing seconds
    $(".progressbar-text").text(timeMins + ":" + timeSecs);
    breakValueTemp--;
    
  }  
  
    
});
