const audioPlayer = document.querySelector('audio');
const navbar = document.querySelector('.navbar');
const playPauseBtn = document.querySelector('.play-pause');
const bar = document.querySelector('.bar');
const timeStart = document.querySelector('.time-start');
const timeEnd = document.querySelector('.time-end');

function calculateTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const minInSec = minutes * 60;
  const seconds = String(Math.floor(totalSeconds - minInSec));
  return `${minutes}:${seconds.padStart(2, '0')}`;
}

window.addEventListener('scroll', () => {
  const y = window.pageYOffset;
  if (y > 200) {
    navbar.style.backgroundColor = 'rgba(0,0,0,0.2)';
    navbar.style.transition = '500ms';
    navbar.style.padding = '5px 160px';
  } else {
    navbar.style.backgroundColor = 'rgba(0,0,0,0)';
    navbar.style.transition = '500ms';
    navbar.style.padding = '30px 160px';
  }
});

navbar.addEventListener('click', evt => {
  const { link } = evt.target.dataset;
  const page = document.getElementById(link);
  page.scrollIntoView({ behavior: 'smooth' });
});

audioPlayer.style.display = 'none';

playPauseBtn.addEventListener('click', () => {
  console.log('BUTTON CLICKED');
  if (!audioPlayer.paused) {
    audioPlayer.pause();
    playPauseBtn.textContent = 'play_circle_outline';
    clearInterval(this.stopPlayer);
  } else {
    audioPlayer.play();
    playPauseBtn.textContent = 'pause_circle_outline';
    this.stopPlayer = setInterval(() => {
      const { currentTime, duration } = audioPlayer;
      const ratio = currentTime / duration;
      const timeElapsed = calculateTime(currentTime);
      const timeRemaining = calculateTime(duration - currentTime);
      const percentageDone = ratio * 100;
      timeStart.textContent = timeElapsed;
      timeEnd.textContent = timeRemaining;
      bar.style.width = `${percentageDone}%`;
    }, 1000);
  }
});
