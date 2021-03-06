'use strict';

const kindCodeLogo = document.querySelector('.js-logo');
const aboutNavButton = document.querySelector('.js-about');
const teamNavButton = document.querySelector('.js-team');
const requestNavButton = document.querySelector('.js-request');
const aboutSection = document.querySelector('#nav-about');
const teamSection = document.querySelector('#nav-team');
const requestSection = document.querySelector('#nav-request');

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

requestNavButton.addEventListener('click', function () {
  requestSection.scrollIntoView();
});

// ============== SUBMIT REQUEST ===============

const colourNames = ['purple', 'blue', 'orange', 'pink'];

const passPhrase = ['elephant', 'tiger', 'squid', 'robot'];

const nameInput = document.querySelector("input[name='request-name']");
const emailInput = document.querySelector("input[name='request-email']");
const phraseInput = document.querySelector("input[name='request-phrase']");
const requestInput = document.querySelector("textarea[name='request-request']");
const submitButton = document.querySelector("button[name='request-submit']");
const requestDiv = document.getElementById('requests');
const form = document.getElementById('form--request');

function validateLength(e) {
  e.preventDefault();
  const length = requestInput.value.length;
  if (length > 140) {
    requestInput.setAttribute('aria-invalid', 'true');
  } else {
    requestInput.setAttribute('aria-invalid', 'false');
  }
}

requestInput.addEventListener('input', validateLength);

function validateEmail(email) {
  const input =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return input.test(email);
}

// Returns a random positive whole number between two values (min, max)
// Used throughout to select random array elements
function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Return random phrase from passPhrase array using randomNumber()
function randomPhrase() {
  return passPhrase[randomNumber(0, passPhrase.length - 1)];
}

//  Cycle through colourNames Array so that there is a different border for each request / member

let i = 0;

function colourPicker() {
  if (i >= 3) {
    i = 0;
    return colourNames[i];
  } else {
    i++;
    return colourNames[i];
  }
}

//  Random 'I am not a robot' phrase generator

const currentPassPhrase = randomPhrase();

phraseInput.placeholder = `type '${currentPassPhrase}'`;

// Check and Post request

function postRequest(e) {
  e.preventDefault(e);
  const name = nameInput.value;
  const email = emailInput.value;
  const request = requestInput.value;

  if (
    name.length !== 0 &&
    email.length !== 0 &&
    request.length !== 0 &&
    phraseInput.length !== 0
  ) {
    if (validateEmail(email)) {
      emailInput.setAttribute('aria-invalid', 'false');
      if (phraseInput.value === `${currentPassPhrase}`) {
        let article = document.createElement('article');
        article.classList.add(
          'box',
          'section__grid--full-height',
          'box__card--padding'
        );
        article.setAttribute('data-color', `${colourPicker()}`);
        article.innerHTML = `
        <div class="section__grid--input">
          
          <p class="section__cards--font">
          ???? From: ${name}<br>
            ???? Email: ${email} <br><br>
            ${request}
          </p>
        </div>`;

        requestDiv.append(article);
        form.reset();

        phraseInput.setAttribute('aria-invalid', 'false');
      } else {
        phraseInput.setAttribute('aria-invalid', 'true');
      }
    } else {
      emailInput.setAttribute('aria-invalid', 'true');
    }
  }
}

submitButton.addEventListener('click', postRequest);

// ============== END SUBMIT REQUEST ===============

// ============== ADD MEMBER ===============

const addMemberFormCard = document.querySelector('#js-formCard');
const addMemberExpander = document.querySelector('#js-addMemberExpander');
const addMemberForm = document.querySelector('#js-addMemberForm');
const addMemberFormName = addMemberForm.querySelectorAll('input')[0];
const addMemberFormJob = addMemberForm.querySelectorAll('input')[1];
const addMemberFormImg = addMemberForm.querySelectorAll('input')[2];
const addMemberFormImgAlt = addMemberForm.querySelectorAll('input')[3];
const addMemberFormPassword = addMemberForm.querySelectorAll('input')[4];
const addMemberFormSubmit = document.querySelector('#js-addMemberFormSubmit');
const memberCardTemplate = document.querySelector('#js-memberCardTemplate');

function validateURL() {
  const regexURL =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  if (!regexURL.test(addMemberFormImg.value)) {
    addMemberFormImg.setAttribute('aria-invalid', 'true');
  } else {
    addMemberFormImg.setAttribute('aria-invalid', 'false');
  }
}

addMemberFormImg.addEventListener('input', validateURL);

function validateNameLength() {
  if (addMemberFormName.value.length > 20) {
    addMemberFormName.setAttribute('aria-invalid', 'true');
  } else {
    addMemberFormName.setAttribute('aria-invalid', 'false');
  }
}

addMemberFormName.addEventListener('input', validateNameLength);

function validateJobLength() {
  if (addMemberFormJob.value.length > 20) {
    addMemberFormJob.setAttribute('aria-invalid', 'true');
  } else {
    addMemberFormJob.setAttribute('aria-invalid', 'false');
  }
}

addMemberFormJob.addEventListener('input', validateJobLength);

function addMemberFormReveal() {
  addMemberExpander.classList.add('card__hidden');

  addMemberForm.style = '';
}

addMemberExpander.addEventListener('click', addMemberFormReveal);

function passwordChecker(password) {
  return password === 'password';
}

function memberBuilder() {
  const newMemberCard = memberCardTemplate.content.cloneNode(true);

  newMemberCard.querySelector('h3').textContent = addMemberFormName.value;

  newMemberCard.querySelector('p').textContent = addMemberFormJob.value;

  newMemberCard.querySelector('img').src = addMemberFormImg.value;

  newMemberCard.querySelector('img').alt = addMemberFormImgAlt.value;

  const article = newMemberCard.querySelector('.box');

  article.setAttribute('data-color', `${colourPicker()}`);

  return newMemberCard;
}

function memberAdder(newMemberHTML) {
  addMemberFormCard.before(newMemberHTML);
}

function addMemberColourChanger() {
  addMemberFormCard.setAttribute(
    'data-color',
    `${
      i === colourNames.length - 1
        ? `${colourNames[0]}`
        : `${colourNames[i + 1]}`
    }`
  );
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

addMemberFormSubmit.addEventListener('click', (event) => {
  event.preventDefault();

  if (
    addMemberFormName.value === '' ||
    addMemberFormJob.value === '' ||
    addMemberFormImg.value === '' ||
    addMemberFormImgAlt.value === '' ||
    addMemberFormPassword.value === ''
  ) {
    alert('Please fill out all sections!');
  } else {
    if (
      addMemberFormName.getAttribute('aria-invalid') === 'true' ||
      addMemberFormJob.getAttribute('aria-invalid') === 'true'
    ) {
      alert(
        'Name or job description too long! Keep them to 20 characters or less!'
      );
    } else {
      if (addMemberFormImg.getAttribute('aria-invalid') === 'true') {
        alert('Image URL is not valid! Sort it out!');
      } else {
        if (passwordChecker(addMemberFormPassword.value)) {
          memberAdder(memberBuilder());
          addMemberColourChanger();
          newMemberFormReset();
        } else {
          alert("Uh uh uh! You didn't say the magic word!");
        }
      }
    }
  }
});

// ============ ADD MEMBER END =============
