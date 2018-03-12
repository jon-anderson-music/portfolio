const descriptionInput = document.querySelector('.description');
const fileInput = document.querySelector('.image-uploader');
const hiddenInputs = document.querySelectorAll('.hidden-input');
const images = document.querySelectorAll('.image');
const imgPreview = document.querySelector('.img-preview');
const imgUploadHandler = document.querySelector('.image-upload-handler');
const photoDescriptions = document.querySelectorAll('.photo-description');
const photoInputs = document.querySelectorAll('.photo-input');
const submitBtn = document.querySelector('button');
const titleInput = document.querySelector('.title');

titleInput.addEventListener('keyup', () => {
  validateForm();
});

imgUploadHandler.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', () => {
  const fileReader = new FileReader();
  fileReader.addEventListener('load', () => {
    imgPreview.src = fileReader.result;
    imgUploadHandler.style.display = 'none';
    validateForm();
  });
  fileReader.readAsDataURL(fileInput.files[0]);
});

function validateForm() {
  if (fileInput.files[0] && titleInput.value.trim()) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

function submit(e) {
  e.preventDefault();
  const fileReader = new FileReader();
  fileReader.readAsDataURL(fileInput.files[0]);
  fileReader.addEventListener('load', () => {
    const image = fileReader.result;
    const title = titleInput.value;
    const description = descriptionInput.value;
    fetch('/admin/photo', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        image,
      }),
    }).then((response) => {
      if (response.status === 200) {
        window.location.reload();
      } else {
        alert('THERE WAS AN ERROR SAVING THE PHOTO');
      }
    }).catch((err) => {
      console.error('ERROR POSTING IMAGE', err);
    });
  });
}

submitBtn.addEventListener('click', (e) => {
  submit(e);
});

photoInputs.forEach((input) => {
  input.addEventListener('blur', (evt) => {
    const parentId = input.parentElement.id;
    fetch(`/admin/photo/${parentId}/edit/title`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({
        property: evt.target.value,
      }),
    });
  });
});

photoDescriptions.forEach((description) => {
  console.log('THE DESCRIPTION', description);
  description.addEventListener('blur', (evt) => {
    const parentId = description.parentElement.id;
    console.log('BLURRING', parentId);
    fetch(`/admin/photo/${parentId}/edit/description`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({
        property: evt.target.value,
      }),
    });
  });
});

images.forEach((image) => {
  image.addEventListener('click', () => {
    // console.log('IMAGE CLICKED');
    // console.log('BLURRING', parentId);
    // hiddenInput.click();
    const input = image.previousElementSibling;
    input.click();
  });
});

hiddenInputs.forEach((input) => {
  input.addEventListener('change', () => {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const { result } = fileReader;
      const parentId = input.parentElement.id;
      fetch(`/admin/photo/${parentId}/edit/image`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({
          image: result,
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
});
