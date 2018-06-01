const videoPlayButtons = document.querySelectorAll('.video-list .play-pause');
const videoPlayer = document.querySelector('.video-player');
const videoModal = document.querySelector('.video-modal');
const videoClose = document.querySelector('.video-close');
const videoItems = document.querySelectorAll('.video-list li');

videoPlayButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const parent = btn.parentElement;
    const { url } = parent.dataset;
    videoModal.classList.remove('hide');
    videoPlayer.src = url;
    videoItems.forEach((item, idx) => {
      if (index === idx) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });
});

videoClose.addEventListener('click', () => {
  videoPlayer.click();
  videoPlayer.src = '';
  videoModal.classList.add('hide');
});
