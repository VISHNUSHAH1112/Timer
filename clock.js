let hours = 0,
  minutes = 0,
  second = 0;
let timer = null;

const display = document.getElementById("display");

// Load saved time from localStorage
if (localStorage.getItem("stopwatchTime")) {
  const savedTime = JSON.parse(localStorage.getItem("stopwatchTime"));
  hours = savedTime.hours;
  minutes = savedTime.minutes;
  second = savedTime.second;
}

updateClock();

// Update display
function updateClock() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = second < 10 ? "0" + second : second;

  display.textContent = `${h}:${m}:${s}`;
  // Save current time in localStorage
  localStorage.setItem(
    "stopwatchTime",
    JSON.stringify({ hours, minutes, second })
  );
}

// Start timer
function startTimer() {
  if (timer) return;

  timer = setInterval(() => {
    second++;
    if (second === 60) {
      second = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    updateClock();
  }, 1000);
}

// Stop timer
function stopTimer() {
  clearInterval(timer);
  timer = null;
}

// Reset timer
function resetTimer() {
  stopTimer();
  hours = minutes = second = 0;
  updateClock();
  // Clear saved time
  localStorage.removeItem("stopwatchTime");
}

// Button events
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
