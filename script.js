const kindCodeLogo = document.querySelector('.js-logo');
const aboutNavButton = document.querySelector('.js-about');
const teamNavButton = document.querySelector('.js-team');
const aboutSection = document.querySelector('#nav-about');
const teamSection = document.querySelector('#nav-team');

kindCodeLogo.addEventListener('click', function () {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});

aboutNavButton.addEventListener('click', function () {
  aboutSection.scrollIntoView();
});

teamNavButton.addEventListener('click', function () {
  teamSection.scrollIntoView();
});
