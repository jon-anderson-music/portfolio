const hamburger = document.querySelector('.hamburger');
const hamburgerLines = document.querySelectorAll('.hamburger .line');
const mobileNav = document.querySelector('.mobile-nav ul');
const navbar = document.querySelector('.navbar');

navbar.addEventListener('click', (evt) => {
  const { link } = evt.target.dataset;
  const page = document.getElementById(link);
  if (page) {
    page.scrollIntoView({ behavior: 'smooth' });
  }
});

mobileNav.addEventListener('click', (evt) => {
  const { link } = evt.target.dataset;
  const page = document.getElementById(link);
  if (page) {
    page.scrollIntoView({ behavior: 'smooth' });
  }
});

window.addEventListener('scroll', () => {
  const y = window.pageYOffset;
  if (y > 200) {
    navbar.style.backgroundColor = 'rgba(0,0,0,0.2)';
    navbar.style.transition = '500ms';
    navbar.style.padding = '5px 10%';
  } else {
    navbar.style.backgroundColor = 'rgba(0,0,0,0)';
    navbar.style.transition = '500ms';
    navbar.style.padding = '30px 10%';
  }
});

hamburger.addEventListener('click', (evt) => {
  if (mobileNav.style.bottom != '0px') {
    mobileNav.style.bottom = 0;
    mobileNav.style.opacity = 1;
    hamburgerLines[1].style.left = '200%';
    hamburgerLines[1].style.opacity = 0;
    hamburgerLines[0].style.transform = 'rotate(45deg)';
    hamburgerLines[0].style.top = '25%';
    hamburgerLines[2].style.transform = 'rotate(-45deg)';
    hamburgerLines[2].style.bottom = '25%';
  } else {
    mobileNav.style.bottom = '100vh';
    mobileNav.style.opacity = 0;
    hamburgerLines[1].style.left = 0;
    hamburgerLines[1].style.opacity = 1;
    hamburgerLines[0].style.transform = 'rotate(0)';
    hamburgerLines[0].style.top = 0;
    hamburgerLines[2].style.transform = 'rotate(0)';
    hamburgerLines[2].style.bottom = 0;
  }
})

mobileNav.addEventListener('click', () => {
  mobileNav.style.bottom = '100vh';
  mobileNav.style.opacity = 0;
  hamburgerLines[1].style.left = 0;
  hamburgerLines[1].style.opacity = 1;
  hamburgerLines[0].style.transform = 'rotate(0)';
  hamburgerLines[0].style.top = 0;
  hamburgerLines[2].style.transform = 'rotate(0)';
  hamburgerLines[2].style.bottom = 0;
})