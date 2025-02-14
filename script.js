// Digital Clock
function updateClock() {
    const now = new Date();
    document.getElementById("clock").innerText = now.toLocaleString();
}
setInterval(updateClock, 1000);

// Stopwatch
let stopwatchInterval;
let stopwatchTime = 0;
let stopwatchRunning = false;

document.getElementById("stopwatch-start").addEventListener("click", () => {
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            document.getElementById("stopwatch").innerText = formatTime(stopwatchTime);
        }, 1000);
    }
});

document.getElementById("stopwatch-pause").addEventListener("click", () => {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
});

document.getElementById("stopwatch-reset").addEventListener("click", () => {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchTime = 0;
    document.getElementById("stopwatch").innerText = "00:00:00";
});

// Timer
let timerInterval;
let timerTime = 0;
let timerRunning = false;

document.getElementById("timer-start").addEventListener("click", () => {
    if (!timerRunning) {
        timerTime = parseInt(document.getElementById("timerInput").value);
        if (isNaN(timerTime) || timerTime <= 0) {
            alert("Enter a valid number of seconds.");
            return;
        }
        timerRunning = true;
        document.getElementById("timerDisplay").innerText = formatMinutesSeconds(timerTime);
        timerInterval = setInterval(() => {
            timerTime--;
            document.getElementById("timerDisplay").innerText = formatMinutesSeconds(timerTime);
            if (timerTime <= 0) {
                clearInterval(timerInterval);
                timerRunning = false;
                alert("Time's up!");
            }
        }, 1000);
    }
});

document.getElementById("timer-pause").addEventListener("click", () => {
    clearInterval(timerInterval);
    timerRunning = false;
});

document.getElementById("timer-reset").addEventListener("click", () => {
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById("timerDisplay").innerText = "00:00";
});

// Alarm
document.getElementById("alarm-set").addEventListener("click", () => {
    const alarmTime = document.getElementById("alarmTime").value;
    if (!alarmTime) {
        alert("Please set a valid alarm time.");
        return;
    }

    const now = new Date();
    const alarmDate = new Date(now.toDateString() + " " + alarmTime);

    if (alarmDate < now) {
        alert("Alarm time must be in the future.");
        return;
    }

    const timeToAlarm = alarmDate - now;
    document.getElementById("alarmStatus").innerText = "Alarm set for " + alarmTime;

    setTimeout(() => {
        const alarmSound = document.getElementById("alarmSound");
        alarmSound.play();
        alert("⏰ Wake up! Alarm ringing!");
        document.getElementById("alarmStatus").innerText = "";
    }, timeToAlarm);
});

// Formatting Functions
function formatTime(seconds) {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function formatMinutesSeconds(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
