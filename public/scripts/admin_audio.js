const audioFileInput = document.querySelector('.audio-file-input');
const submitButton = document.querySelector('.submit-button')
const titleInput = document.querySelector('.title-input')

audioFileInput.addEventListener('change', (evt) => {
  console.log('FILE CHANGED')
});

submitButton.addEventListener('click', (evt) => {
  console.log('BUTTON CLICKED')
  const audioFile = audioFileInput.files[0];
  const fileReader = new FileReader()
  fileReader.readAsDataURL(audioFileInput.files[0]);
  fileReader.addEventListener('load', () => {
    const audio = fileReader.result;
    const title = titleInput.value;
    fetch('/admin/audio', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        audio,
        title
      }),
    }).then((response) => {
      console.log('RESPONSE', response)
    }).catch((err) => {
      console.error('ERROR POSTING AUDIO', err)
    });
  });
})