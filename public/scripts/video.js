const videoPlayButtons = document.querySelectorAll('.video-list .play-pause');
const videoPlayer = document.querySelector('.video-player');
const videoModal = document.querySelector('.video-modal');
const videoClose = document.querySelector('.video-close');

videoPlayButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const parent = btn.parentElement;
    const { url } = parent.dataset;
    videoModal.classList.remove('hide');
    videoPlayer.src = url;
  });
});

videoClose.addEventListener('click', () => {
  videoPlayer.click();
  videoPlayer.src = '';
  videoModal.classList.add('hide');
});
