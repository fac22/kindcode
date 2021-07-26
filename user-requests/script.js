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

// === SUBMIT REQUEST ===

const colourNames = ['purple', 'blue', 'pink', 'orange'];

const passPhrase = ['elephant', 'tiger', 'squid', 'robot'];

const nameInput = document.querySelector("input[name='name']");
const emailInput = document.querySelector("input[name='email']");
const phraseInput = document.querySelector("input[name='phrase']");
const requestInput = document.querySelector("textarea[name='request']");
const submitButton = document.querySelector("button[name='submit']");
const requestDiv = document.getElementById('requests');
const form = document.getElementsByTagName('form');

function validateTweet(e) {
  e.preventDefault();
  const length = requestInput.value.length;
  if (length > 140) {
    requestInput.setAttribute('aria-invalid', 'true');
  } else {
    requestInput.setAttribute('aria-invalid', 'false');
  }
}

requestInput.addEventListener('input', validateTweet);

function validEmail(email) {
  const input =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return input.test(email);
}

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

let j = 0;

let word1 = '';

function phrasePicker() {
  if (j >= 3) {
    j = 0;
    word1 = passPhrase[j];
  } else {
    word1 = passPhrase[j];
    j++;
  }
  phraseInput.placeholder = `type '${word1}'`;
}

phrasePicker();

function postRequest(e) {
  e.preventDefault();
  const name = nameInput.value;
  const email = emailInput.value;
  const request = requestInput.value;
  const phrase = phraseInput.value;

  if (
    name.length != 0 &&
    email.length != 0 &&
    request.length != 0 &&
    phrase.length != 0
  ) {
    if (validEmail(email)) {
      emailInput.setAttribute('aria-invalid', 'false');
      if (phraseInput.value == `${word1}`) {
        requestDiv.innerHTML += ` 
        <article class="box section__grid--full-height box__card--padding" data-color="${colourPicker(
          colourNames
        )}">
          <h3>${name} ${email}</h3>
          <p class="section__cards--font">
            ${request}
          </p>
        </article>`;
        phraseInput.setAttribute('aria-invalid', 'false');
        form[0].reset();
      } else {
        phraseInput.setAttribute('aria-invalid', 'true');
      }
    } else {
      emailInput.setAttribute('aria-invalid', 'true');
    }
  }
}

submitButton.addEventListener('click', postRequest);
