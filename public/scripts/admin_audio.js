const audioFileInput = document.querySelector('.audio-file-input');
const audioFiles = document.querySelectorAll('.audio-file');
const audioFileEditInputs = document.querySelectorAll('.audio-file-edit');
const audioFileTitles = document.querySelectorAll('.audio-title');
const deleteButtons = document.querySelectorAll('.audio-delete');
const submitButton = document.querySelector('.submit-button');
const titleInput = document.querySelector('.title-input');

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
      return response.json();
    }).then((result) => {
      console.log('RESULTS', result)
      window.location.reload();
    }).catch((err) => {
      console.error('ERROR POSTING AUDIO', err)
    });
  });
})

audioFileTitles.forEach((title) => {
  title.addEventListener('blur', (evt) => {
    const { id } = title.parentElement;
    console.log('input blurred', id)
    fetch(`/admin/audio/${id}/edit/title`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        property: evt.target.value,
      })
    }).then((res) => res.json())
      .then((results) => {
        window.location.reload()
      }).catch((err) => {
        console.error(err);
      })
  })
})

audioFileEditInputs.forEach((input) => {
  input.addEventListener('change', () => {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const { result } = fileReader;
      const { id } = input.parentElement;
      fetch(`/admin/audio/${id}/edit/audio`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          audio: result,
        }),
      }).then((result) => {
        console.log('RESULT', result);
        window.location.reload();
      }).catch((err) => {
        throw err;
      });
    });
    fileReader.readAsDataURL(input.files[0]);
  });
})

deleteButtons.forEach((btn) => {
  btn.addEventListener('click', (evt) => {
    const { id } = btn.parentElement;
    fetch(`/admin/audio/${id}/delete`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then((response) => {
      if (response.status === 200) {
        window.location.reload()
      }
    }).catch((err) => {
      throw err;
    })
  })
})