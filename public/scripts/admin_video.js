const videoTitle = document.querySelector('.video-form .title-input');
const videoUrl = document.querySelector('.video-form .url-input');
const videoOrder = document.querySelector('.video-form .order-input');
const submitButton = document.querySelector('.video-form .submit-button');
const videoInputs = document.querySelectorAll('.video-input');
const videoDeleteButtons = document.querySelectorAll('.video-delete');

submitButton.addEventListener('click', () => {
  const title = videoTitle.value;
  const url = videoUrl.value;
  const order = videoOrder.value;

  fetch('/admin/video', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      title,
      url,
      order,
    }),
  }).then(res => res.json())
    .then((results) => {
      window.location.reload();
    })
    .catch((err) => {
      throw err;
    });
});

videoInputs.forEach((input) => {
  input.addEventListener('blur', () => {
    const o = {};
    o[input.name] = input.value;
    const parent = input.parentElement;
    const { id } = parent;
    const url = `/admin/video/${id}`;
    fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(o),
    }).then(res => res.json())
      .then((results) => {
        console.log('update results', results);
      }).catch((err) => {
        throw err;
      })
  })
});

videoDeleteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const parent = button.parentElement;
    const { id } = parent;
    const url = `/admin/video/${id}/delete`;
    fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then(() => {
      window.location.reload();
    }).catch((err) => {
      throw err;
    })
  })
})