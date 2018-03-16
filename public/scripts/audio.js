const audioList = document.querySelector('.audio-list');
const audioPlayer = document.querySelector('audio');
const bar = document.querySelector('.bar');
const playerDetails = document.querySelector('.media-player .details');
const playPauseBtn = document.querySelector('.play-pause');
const timeStart = document.querySelector('.time-start');
const timeEnd = document.querySelector('.time-end');

const calculateTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const minInSec = minutes * 60;
  const seconds = String(Math.floor(totalSeconds - minInSec));
  return `${minutes}:${seconds.padStart(2, '0')}`;
};

const deactivateList = () => {
  const { children: items } = audioList;
  Array.from(items).forEach((item) => {
    const playButtonWrapper = item.children[0].children[0];
    playButtonWrapper.innerHTML = '<i class="far fa-play-circle"></i>';
    if (item.classList.contains('active')) {
      item.classList.remove('active');
    }
  });
};

const loadAudio = (title, url) => {
  playerDetails.children[0].textContent = title;
  audioPlayer.src = url;
};

const pauseAudio = () => {
  audioPlayer.pause();
  playPauseBtn.textContent = 'play_circle_outline';
  clearInterval(this.stopPlayer);
};

const playAudio = () => {
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
  }, 50);
};

const togglePlay = () => {
  if (!audioPlayer.paused) {
    pauseAudio();
  } else {
    playAudio();
  }
};

audioList.addEventListener('click', (evt) => {
  const item = evt.target;
  let playButtonClicked = false;
  const elevateClick = (item) => {
    if (item.tagName === 'LI') {
      deactivateList();
      const { children } = item;
      const playButtonWrapper = item.children[0].children[0];
      item.classList.add('active');
      const { title, url } = children[0].dataset;
      if (audioPlayer.src !== url) {
        loadAudio(title, url);
      }
      if (playButtonClicked) {
        togglePlay();
      }
      if (!audioPlayer.paused) {
        playButtonWrapper.innerHTML = '<i class="far fa-pause-circle"></i>';
      }
    } else {
      if (item.classList.contains('play-pause')) {
        playButtonClicked = true;
      }
      const newItem = item.parentElement;
      elevateClick(newItem);
    }
  };
  elevateClick(item);
});

playPauseBtn.addEventListener('click', () => {
  console.log('BUTTON CLICKED');
  togglePlay();
});

audioPlayer.style.display = 'none';
