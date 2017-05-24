var breakValue = 5;
var workValue = 20;

$("#break").roundSlider({
    sliderType: "default",
    value: 5,
    circleShape: "half-top",
    max: 30,
    radius: 80,
    handleSize: "34,10",
    change: "setBreak"
});

$("#work").roundSlider({
    sliderType: "default",
    value: 20,
    circleShape: "half-top",
    max: 60,
    radius: 80,
    handleSize: "34,10",
    change: "setWork"
});


function setBreak () {
  breakValue = $("#break").roundSlider("getValue");
  
}


function setWork() {
  
}