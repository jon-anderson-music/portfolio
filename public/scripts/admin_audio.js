const audioFileInput = document.querySelector('.audio-file-input');
const audioFiles = document.querySelectorAll('.audio-file');
const audioFileEditInputs = document.querySelectorAll('.audio-file-edit');
const audioFileTitles = document.querySelectorAll('.audio-title');
const inputEdits = document.querySelectorAll('.input-edit');
const audioOrders = document.querySelectorAll('.audio-order-edit');
const audioForm = document.querySelector('.audio-form');
const deleteButtons = document.querySelectorAll('.audio-delete');
const errorMessage = document.createElement('p');
const loader = document.createElement('div');
const orderInput = document.querySelector('.order-input');
const submitButton = document.querySelector('.submit-button');
const titleInput = document.querySelector('.title-input');

let hasError = false;

const removeError = () => {
  audioForm.removeChild(errorMessage)
  hasError = false;
}

const showError = (message) => {
  errorMessage.textContent = message;
  errorMessage.style.color = 'red';
  errorMessage.style.fontSize = '2rem';
  audioForm.appendChild(errorMessage);
  enableSubmitButton();
  hasError = true;
}

const enableSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.classList.remove('disabled');
  submitButton.removeChild(loader)
}

loader.classList.add('loader');


audioFileInput.addEventListener('change', (evt) => {
  console.log('FILE CHANGED')
});

submitButton.addEventListener('click', (evt) => {
  if (hasError) {
    removeError();
  };
  submitButton.disabled = true;
  submitButton.classList.add('disabled');
  submitButton.appendChild(loader)
  const audioFile = audioFileInput.files[0];
  const fileReader = new FileReader()
  fileReader.readAsDataURL(audioFileInput.files[0]);
  fileReader.addEventListener('load', () => {
    const audio = fileReader.result;
    const title = titleInput.value;
    const order = orderInput.value;
    fetch('/admin/audio', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        audio,
        title,
        order,
      }),
    }).then((response) => {
      console.log('RESPONSE', response)
      return response.json();
    }).then((result) => {
      console.log('RESULTS', result)
      if (!result.errors) {
        window.location.reload();
      } else {
        showError(result.message)
      }
    }).catch((err) => {
      showError('Something went wrong.')
      console.error('ERROR POSTING AUDIO', err)
    });
  });
})

inputEdits.forEach((input) => {
  input.addEventListener('blur', (evt) => {
    const { id } = input.parentElement;
    const { name } = input;
    console.log('input blurred', id)
    fetch(`/admin/audio/${id}/edit/${name}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        property: evt.target.value,
      })
    }).then((res) => res.json())
      .catch((err) => {
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