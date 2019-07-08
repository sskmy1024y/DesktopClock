var gui = require('nw.gui');
var win = gui.Window.get();

var settings = {
  design: 0,
  'margin-top': 20,
  alwaystop: true,
  showTaskbar: false,
  htmls: [
    "main.html",
    "main2.html"
  ]
};
try{
  if (is_saved()) settings = load();
} catch(e) {
  reset();
}

var appWidth = 450;
win.setShowInTaskbar(settings.showTaskbar);
win.setAlwaysOnTop(settings.alwaystop);
window.moveTo(window.screen.availWidth - appWidth, settings['margin-top']);
win.show();

document.onkeydown = function (event) {
  const c = event.keyCode;
  //alert("key:" + c + " ,n:"+ settings.design)
  if (c === 91 || c === 17) document.body.classList.add('movable');
  else if (c === 37) {
    let n = settings.design-1;
    if (n < 0) return;
    settings.design = n;
    save(settings);
    location.href = "/views/" + settings.htmls[settings.design];
  } else if (c === 39) {
    let n = settings.design+1;
    if (n > settings.htmls.length) return;
    settings.design = n;
    save(settings);
    location.href = "/views/" + settings.htmls[settings.design];
  }
}

document.onkeyup = function (event) {
  const c = event.keyCode;
  if (c === 91 || c === 17) {
    document.body.classList.remove('movable');
    settings['margin-top'] = window.screenTop;
    save(settings);
  }
}

document.addEventListener('dblclick', function (e) {
  save(settings);
  win.close();
});


function save(data) {
  localStorage.setItem('DCData', JSON.stringify(data));
}
function load() {
  return JSON.parse(localStorage.getItem('DCData'));
}
function reset() {
  localStorage.removeItem('DCData');
}
function is_saved() {
  return (localStorage.getItem('DCData'));
}


// show clock function

function animatedDigitalLEDClock() {

  document.addEventListener('DOMContentLoaded', function () {

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

    var setTime = function () {
      var _hours = document.querySelectorAll('.hours');
      var _minutes = document.querySelectorAll('.minutes');
      var _seconds = document.querySelectorAll('.seconds');

      var date = new Date();
      var hours = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds();

      setNumber(_hours[0], Math.floor(hours / 10), 1);
      setNumber(_hours[1], hours % 10, 1);

      setNumber(_minutes[0], Math.floor(minutes / 10), 1);
      setNumber(_minutes[1], minutes % 10, 1);

      setNumber(_seconds[0], Math.floor(seconds / 10), 1);
      setNumber(_seconds[1], seconds % 10, 1);
    }

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
    setTimeout(function () {
      setTime();
      setInterval(setTime, 1000);
    }, 1000 - (new Date()).getUTCMilliseconds());
  });

}

function simpleDigitalClock() {
  document.addEventListener('DOMContentLoaded', function () {
    var display = function () {
      var date = new Date();
      var num = {
        "hour": date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
        "min": date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
        "sec": date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
      }

      var clock = num.hour + ":" + num.min + ":" + num.sec;
      document.getElementById('clock').textContent = clock;
    }

    setTimeout(function () {
      display();  // 最初のジャスト1秒表示
      setInterval(display, 1000); // 以降のジャスト1秒表示
    }, 1000 - (new Date()).getUTCMilliseconds());
  });
}

