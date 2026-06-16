const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const overlay = document.querySelector('.overlay');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  menuToggle.classList.remove('active');
  navMenu.classList.remove('open');
  document.body.classList.remove('no-scroll');
  overlay.classList.remove('active');
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 486) {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.classList.remove('no-scroll');
    overlay.classList.remove('active');
  }
});
