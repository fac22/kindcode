'use strict';

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

// ADD MEMBER

const addMemberExpander = document.querySelector('#js-addMemberExpander');
const addMemberForm = document.querySelector('#js-addMemberForm');
const addMemberFormName = addMemberForm.querySelectorAll('input')[0];
const addMemberFormJob = addMemberForm.querySelectorAll('input')[1];
const addMemberFormImg = addMemberForm.querySelectorAll('input')[2];
const addMemberFormImgAlt = addMemberForm.querySelectorAll('input')[3];
const addMemberFormPassword = addMemberForm.querySelectorAll('input')[4];
const addMemberFormSubmit = document.querySelector('#js-addMemberFormSubmit');
const memberCardTemplate = document.querySelector('#js-memberCardTemplate');

function addMemberFormReveal() {
  addMemberExpander.classList.add('card__hidden');

  addMemberForm.style = '';
}

addMemberFormSubmit.addEventListener('click', (event) => {
  event.preventDefault();

  if (passwordChecker(addMemberFormPassword.value)) {
    memberAdder(memberBuilder());
    newMemberFormReset();
  } else {
    alert("Uh uh uh! You didn't say the magic word!");
  }
});

addMemberExpander.addEventListener('click', addMemberFormReveal);

function memberBuilder() {
  const newMemberCard = memberCardTemplate.content.cloneNode(true);

  newMemberCard.querySelector('h3').textContent = addMemberFormName.value;

  newMemberCard.querySelector('p').textContent = addMemberFormJob.value;

  newMemberCard.querySelector('img').src = addMemberFormImg.value;

  newMemberCard.querySelector('img').alt = addMemberFormImgAlt.value;

  return newMemberCard;
}

function memberAdder(newMemberHTML) {
  document.querySelector('#js-memberCardTemplate').after(newMemberHTML);
}

function passwordChecker(password) {
  return password === 'password';
}

function newMemberFormReset() {
  addMemberFormName.value = '';
  addMemberFormJob.value = '';
  addMemberFormImg.value = '';
  addMemberFormImgAlt.value = '';
  addMemberFormPassword.value = '';
  addMemberForm.style = 'display: none';
  addMemberExpander.classList.remove('card__hidden');
}
