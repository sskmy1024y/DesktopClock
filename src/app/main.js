var gui = require('nw.gui');
var win = gui.Window.get();

var appWidth = 450;
win.setShowInTaskbar(false);
win.setAlwaysOnTop(true);
window.moveTo(window.screen.availWidth - appWidth, 0);
win.show();

document.onkeydown = function(event){
  if (event.keyCode === 91 || event.keyCode === 17 ) document.body.classList.add('movable');
}

document.onkeyup = function(event){
  if (event.keyCode === 91 || event.keyCode === 17 ) document.body.classList.remove('movable');
}

document.addEventListener('dblclick', function(e){
  win.close();
});

function animatedDigitalLEDClock() {

  var digitSegments = [
    [1, 2, 3, 4, 5, 6],
    [2, 3],
    [1, 2, 7, 5, 4],
    [1, 2, 7, 3, 4],
    [6, 7, 2, 3],
    [1, 6, 7, 3, 4],
    [1, 6, 5, 4, 3, 7],
    [1, 2, 3],
    [1, 2, 3, 4, 5, 6, 7],
    [1, 2, 7, 3, 6]
  ];

  document.addEventListener('DOMContentLoaded', function () {
    var _hours = document.querySelectorAll('.hours');
    var _minutes = document.querySelectorAll('.minutes');
    var _seconds = document.querySelectorAll('.seconds');

    setInterval(function () {
      var date = new Date();
      var hours = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds();

      setNumber(_hours[0], Math.floor(hours / 10), 1);
      setNumber(_hours[1], hours % 10, 1);

      setNumber(_minutes[0], Math.floor(minutes / 10), 1);
      setNumber(_minutes[1], minutes % 10, 1);

      setNumber(_seconds[0], Math.floor(seconds / 10), 1);
      setNumber(_seconds[1], seconds % 10, 1);
    }, 1000);
  });

  var setNumber = function (digit, number, on) {
    var segments = digit.querySelectorAll('.segment');
    var current = parseInt(digit.getAttribute('data-value'));

    // only switch if number has changed or wasn't set
    if (!isNaN(current) && current != number) {
      // unset previous number
      digitSegments[current].forEach(function (digitSegment, index) {
        setTimeout(function () {
          segments[digitSegment - 1].classList.remove('on');
        }, index * 45)
      });
    }

    if (isNaN(current) || current != number) {
      // set new number after
      setTimeout(function () {
        digitSegments[number].forEach(function (digitSegment, index) {
          setTimeout(function () {
            segments[digitSegment - 1].classList.add('on');
          }, index * 45)
        });
      }, 250);
      digit.setAttribute('data-value', number);
    }
  }
}

function simpleDigitalClock() {
  document.addEventListener('DOMContentLoaded', function () {
    var display = function(){
      var date = new Date();
      var num = {
        "hour": date.getHours() < 10 ? "0" + date.getHours() : date.getHours() ,
        "min": date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes() ,
        "sec": date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
      }

      var clock = num.hour  + ":" + num.min + ":" + num.sec;
      document.getElementById('clock').textContent = clock;
    }
    setInterval(display, 1000);
  });
}

