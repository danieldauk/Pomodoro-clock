var breakValue = 5;
var workValue = 20;
var workInterval = 0;
var breakInterval = 0;
var breakValueTemp = 0;
var workValueTemp = 0;
var timeMins = 0;
var timeSecs = 0;
var timeForProgCircle = 0;
var startReset = 0;
var alarmOnOff = 1;


$(function() {
  
  
  //initializing progress Circle
    var progressCircle = new ProgressBar.Circle('#clock', {
      strokeWidth: 7,
      fill: "rgba(0,0,0,0.1)",
      from: { color: '#FFBC67' },
      to: { color: '#DA727E' },
      step: function(state, progressCircle, attachment) {
        progressCircle.path.setAttribute('stroke', state.color);
    },
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

     if(startReset == 0) {
       startReset = 1;
       
       //changing icon to reset
       $("#start").html("<i class='fa fa-undo' aria-hidden='true'></i> Reset");

       //setting progress bar back to 0 and starting counter
       progressCircle.animate(0, {
        duration: 500
       }, function() {
        startWorkInterval ();
       });
     } else {
       //if start was already pressed
       startReset = 0;
       
       //changing icon to reset
       $("#start").html("<i class='fa fa-play' aria-hidden='true'></i> Play");
       
       clearInterval(workInterval);
       clearInterval(breakInterval);
       progressCircle.animate(0, {
        duration: 500
       });
        $(".progressbar-text").text(String(workValue)+":00");
     }
     
     
 });
  
  
  //work counter 
  function startWorkInterval () {
   
    //resetting the work time and converting mins to secs
    workValueTemp = workValue*60;
    
    //starting progressCircle animation
    timeForProgCircle = workValueTemp*1000;
    
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
        duration: 500
       }, function() {
          startBreakInterval();
       });
      
      //playing audio
       if(alarmOnOff == 0) {
         alarm.play();
       }
       

     }
     startWork(workValueTemp);
   }, 1000);
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
    var timeForProgCircle = breakValueTemp*1000;
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
        duration: 500
       }, function() {
          startWorkInterval();
       });
       
       //playing audio
       if(alarmOnOff == 0) {
         alarm.play();
       }
       
     }
     startBreak(breakValueTemp);
   }, 1000);
  }
    
  function startBreak(value) {
    convertTime(value);
    //changing text and decreasing seconds
    $(".progressbar-text").text(timeMins + ":" + timeSecs);
    breakValueTemp--;
    
  }  
  
  
  
  /*---------------style -----------------*/
  $("#start").on("mousedown",function() {
    $("#start").addClass("pressed");
    $("#start").html();
  });
  $("#start").on("mouseup mouseleave",function() {
    $("#start").removeClass("pressed");
  });
  
  //changing slider radius if viewport is less than 400px
  if($(window).innerWidth() < 400) {
       $("#break").roundSlider("option", { "radius": 60 });
       $("#work").roundSlider("option", { "radius": 60 });
   };
  
 $(window).resize(function() {
    if($(window).innerWidth() < 400) {
       $("#break").roundSlider("option", { "radius": 60 });
       $("#work").roundSlider("option", { "radius": 60 });
    } else {
       $("#break").roundSlider("option", { "radius": 80 });
       $("#work").roundSlider("option", { "radius": 80 });
    } 
}); 
  
  
// creating audio and switching alarm
  var alarm;
  $(".alarm").on("click", function() {
    alarm = new Audio();
    alarm.play();
    alarm = new Audio('audio/bell2.mp3');
    $("#alarmBtn1").toggleClass("rotate2");
    $("#alarmBtn2").toggleClass("rotate1");
    
  if(alarmOnOff == 0) {
    alarmOnOff = 1;
  } else {
    alarmOnOff = 0;
  }
  });
  
});
