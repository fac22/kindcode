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

const colourNames = ['purple', 'blue', 'pink', 'orange'];

const passPhrase = ['elephant', 'tiger', 'squid', 'robot'];

const nameInput = document.querySelector("input[name='name']");
const emailInput = document.querySelector("input[name='email']");
const phraseInput = document.querySelector("input[name='phrase']");
const requestInput = document.querySelector("textarea[name='request']");
const submitButton = document.querySelector("button[name='submit']");
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

//Cycle through colourNames Array so that there is a different border for each request / member
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

//Random 'I am not a robot' phrase generator

const currentPassPhrase = randomPhrase();

phraseInput.placeholder = `type '${currentPassPhrase}'`;

// Check and Post request

function postRequest(e) {
  e.preventDefault(e);
  const name = nameInput.value;
  const email = emailInput.value;
  const request = requestInput.value;

  if (
    name.length != 0 &&
    email.length != 0 &&
    request.length != 0 &&
    phraseInput.length != 0
  ) {
    if (validateEmail(email)) {
      emailInput.setAttribute('aria-invalid', 'false');
      if (phraseInput.value == `${currentPassPhrase}`) {
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
          📌 From: ${name}<br>
            📬 Email: ${email} <br><br>
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

const addMemberExpander = document.querySelector('#js-addMemberExpander');
const addMemberForm = document.querySelector('#js-addMemberForm');
const addMemberFormName = addMemberForm.querySelectorAll('input')[0];
const addMemberFormJob = addMemberForm.querySelectorAll('input')[1];
const addMemberFormImg = addMemberForm.querySelectorAll('input')[2];
const addMemberFormImgAlt = addMemberForm.querySelectorAll('input')[3];
const addMemberFormPassword = addMemberForm.querySelectorAll('input')[4];
const addMemberFormSubmit = document.querySelector('#js-addMemberFormSubmit');
const memberCardTemplate = document.querySelector('#js-memberCardTemplate');

addMemberExpander.addEventListener('click', addMemberFormReveal);

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

function memberBuilder() {
  const newMemberCard = memberCardTemplate.content.cloneNode(true);

  newMemberCard.querySelector('h3').textContent = addMemberFormName.value;

  newMemberCard.querySelector('p').textContent = addMemberFormJob.value;

  newMemberCard.querySelector('img').src = addMemberFormImg.value;

  newMemberCard.querySelector('img').alt = addMemberFormImgAlt.value;

  return newMemberCard;
}

function memberAdder(newMemberHTML) {
  document.querySelector('#js-formCard').before(newMemberHTML);
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

// ============ ADD MEMBER END =============
