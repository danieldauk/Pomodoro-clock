var breakValue = 5;
var workValue = 20;

$(function() {
  
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

  $("#break").roundSlider({
      sliderType: "min-range",
      value: 5,
      circleShape: "half-top",
      min: 1,
      max: 30,
      radius: 80,
      handleSize: "34,10",
      change: "setBreak"
  });

  $("#work").roundSlider({
      sliderType: "min-range",
      value: 20,
      circleShape: "half-top",
      min: 1,
      max: 60,
      radius: 80,
      handleSize: "34,10",
      change: "setWork"
  });


  function setBreak () {
    breakValue = $("#break").roundSlider("getValue");
    

  }


  function setWork() {
    workValue = $("#work").roundSlider("getValue");
  }
  
})
