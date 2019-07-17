
window.addEventListener('DOMContentLoaded', function(){
  'use strict';

// timer
function countTimer(deadLine){
    let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

function getTimeRemaining(){
  let dateStop = new Date(deadLine).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
        return {timeRemaining, hours, minutes, seconds};
    }
function updateClock(){

  let timer = getTimeRemaining();

     timerHours.textContent = timer.hours;
     timerMinutes.textContent = timer.minutes;
     timerSeconds.textContent = timer.seconds;

    if (timer.timeRemaining > 0) {
      setTimeout(updateClock, 1000);
    }

    else if (timer.timeRemaining < 0) {
    let setClock = clearInterval(timer.timeRemaining);

  }

    timerHours.innerHTML = ("0" + timer.hours).slice(-2);
    timerMinutes.innerHTML = ("0" + timer.minutes).slice(-2);
    timerSeconds.innerHTML = ("0" + timer.seconds).slice(-2);

}
updateClock();
} //function countTimer(deadLine)

setInterval(countTimer, 1000, '20 july 2019');

}); //window.addEventListener
