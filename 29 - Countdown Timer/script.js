let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    //divide by 1000 to get seconds 
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        //intervals don't know when to stop, so need to check
        if(secondsLeft <= 0){
            clearInterval(countdown);
            return;
        }
        //display it
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    //new date object
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    // const adjustedPM = hour > 12 ? 'pm' : 'am';
    const minutes = end.getMinutes();
    const adjustedMinutes = minutes < 10 ? '0' : '';
    endTime.textContent = `Be back at ${adjustedHour}:${adjustedMinutes}${minutes}`;
}

function startTimer() {
    //dataset.time makes it into a string
    const seconds = parseInt(this.dataset.time);
    timer(seconds);

}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value; 
    console.log(mins);
    timer(mins * 60);
    this.reset();
});