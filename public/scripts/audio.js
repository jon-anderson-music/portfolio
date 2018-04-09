const audioList = document.querySelector('.audio-list');
const audioPlayer = document.querySelector('audio');
const bar = document.querySelector('.bar');
const playerDetails = document.querySelector('.media-player .details');
const playPauseBtn = document.querySelector('.play-pause');
const prevButton = document.querySelector('.previous-track');
const nextButton = document.querySelector('.next-track');
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

const findActiveAndPlay = () => {
  const selectedPlayBtn = document.querySelector('.audio-list .active .play-pause');
  selectedPlayBtn.click();
};

const changeTrack = (diff) => {
  const wasPlaying = !audioPlayer.paused;
  let index;
  for (let i = 0; i < audioList.children.length; i++) {
    if (audioList.children[i].classList.contains('active')) {
      index = i;
    }
  }
  deactivateList();
  const newIndex = index + diff;
  const { length } = audioList.children;
  const lastChild = audioList.children[length - 1];

  if (newIndex < length && newIndex >= 0) {
    audioList.children[newIndex].classList.add('active');
  } else if (newIndex < 0) {
    lastChild.classList.add('active');
  } else {
    audioList.children[0].classList.add('active');
  }
  if (wasPlaying) {
    findActiveAndPlay();
  }
};

const loadAudio = (title, url) => {
  if (title) {
    playerDetails.children[0].textContent = title;
    audioPlayer.src = url;
  } else {
    const selectedAudio = document.querySelector('.audio-list .active .wrapper');
    playerDetails.children[0].textContent = selectedAudio.dataset.title;
    audioPlayer.src = selectedAudio.dataset.url;
  }
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

nextButton.addEventListener('click', () => {
  changeTrack(1);
});

prevButton.addEventListener('click', () => {
  changeTrack(-1);
});

playPauseBtn.addEventListener('click', () => {
  findActiveAndPlay();
});

audioPlayer.style.display = 'none';
