const navLinks = document.querySelectorAll('.nav-link');
const collapseMenu = document.querySelector('#navbarSupportedContent');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    collapseMenu.classList.remove('show');
  });
});

