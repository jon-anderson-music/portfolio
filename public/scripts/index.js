const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const y = window.pageYOffset;
  if (y > 200) {
    navbar.style.backgroundColor = 'rgba(0,0,0,0.2)';
    navbar.style.transition = '500ms';
    navbar.style.padding = '5px 160px';
  } else {
    navbar.style.backgroundColor = 'rgba(0,0,0,0)';
    navbar.style.transition = '500ms';
    navbar.style.padding = '30px 160px';
  }
});
