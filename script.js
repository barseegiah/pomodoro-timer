document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer');
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const startPauseBtn = document.getElementById('startPauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const workBtn = document.getElementById('workBtn');
    const shortBreakBtn = document.getElementById('shortBreakBtn');
    const longBreakBtn = document.getElementById('longBreakBtn');

    let interval;
    let isRunning = false;
    let isPaused = false;
    let remainingTime = 1500; // default to 25 minutes

    function startTimer() {
        interval = setInterval(() => {
            if (remainingTime <= 0) {
                clearInterval(interval);
                alert('Time is up!');
                return;
            }
            remainingTime--;
            updateDisplay();
        }, 1000);
    }

    function updateDisplay() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        minutesDisplay.textContent = String(minutes).padStart(2, '0');
        secondsDisplay.textContent = String(seconds).padStart(2, '0');
    }

    function resetTimer() {
        clearInterval(interval);
        isRunning = false;
        isPaused = false;
        startPauseBtn.textContent = 'Start';
        switchActiveInterval(); // Reset to work interval by default
    }

    function switchActiveInterval() {
        if (workBtn.classList.contains('active')) {
            remainingTime = 1500; // 25 minutes
        } else if (shortBreakBtn.classList.contains('active')) {
            remainingTime = 300; // 5 minutes
        } else if (longBreakBtn.classList.contains('active')) {
            remainingTime = 900; // 15 minutes
        }
        updateDisplay();
    }

    startPauseBtn.addEventListener('click', () => {
        if (isRunning) {
            clearInterval(interval);
            startPauseBtn.textContent = 'Start';
        } else {
            if (isPaused) {
                isPaused = false;
            } else {
                switchActiveInterval();
            }
            startTimer();
            startPauseBtn.textContent = 'Pause';
        }
        isRunning = !isRunning;
    });

    resetBtn.addEventListener('click', () => {
        resetTimer();
    });

    workBtn.addEventListener('click', () => {
        if (!workBtn.classList.contains('active')) {
            document.querySelectorAll('.interval-btn').forEach(btn => btn.classList.remove('active'));
            workBtn.classList.add('active');
            resetTimer();
        }
    });

    shortBreakBtn.addEventListener('click', () => {
        if (!shortBreakBtn.classList.contains('active')) {
            document.querySelectorAll('.interval-btn').forEach(btn => btn.classList.remove('active'));
            shortBreakBtn.classList.add('active');
            resetTimer();
        }
    });

    longBreakBtn.addEventListener('click', () => {
        if (!longBreakBtn.classList.contains('active')) {
            document.querySelectorAll('.interval-btn').forEach(btn => btn.classList.remove('active'));
            longBreakBtn.classList.add('active');
            resetTimer();
        }
    });

    updateDisplay(); // Initialize display
});
