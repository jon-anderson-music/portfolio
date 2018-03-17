const deleteButtons = document.querySelectorAll('.bio-delete');
const displayOrders = document.querySelectorAll('.display-order');
const displayParas = document.querySelectorAll('.display-para');
const orderInput = document.querySelector('.order input');
const paragraphInput = document.querySelector('.paragraph textarea')
const submitBtn = document.querySelector('.submit-button');

const updateParaByParent = (parent) => {
  const { children, id } = parent;
  const paragraph = children[0].value.trim();
  const order = children[1].value;
  const body = { paragraph, order };
  fetch(`/admin/bio/${id}/edit`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(body)
  }).then((res) => res.json())
    .then((results) => {
      console.log('RESULts', results);
      window.location.reload();
    }).catch((err) => {
      throw err;
    });
}

submitBtn.addEventListener('click', (evt) => {
  const order = orderInput.value;
  const paragraph = paragraphInput.value;
  const body = { order, paragraph };
  fetch('/admin/bio', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(body),
  }).then((response) => response.json())
    .then((results) => {
      console.log('RESULTS', results)
      window.location.reload();
    }).catch((err) => {
      console.error('ERROR CREATING PARAGRAPH', err)
    })
})

displayOrders.forEach((input) => {
  input.addEventListener('blur', (evt) => {
    const parent = evt.target.parentElement;
    updateParaByParent(parent)
  })
})

displayParas.forEach((input) => {
  input.addEventListener('blur', (evt) => {
    const parent = evt.target.parentElement;
    updateParaByParent(parent);
  })
})

deleteButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    const { id } = evt.target.parentElement;
    console.log('BUTTON CLICKED', id)
    fetch(`/admin/bio/${id}/delete`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
    }).then(() => {
      window.location.reload()
    }).catch((err) => {
      throw err;
    })
  })
})