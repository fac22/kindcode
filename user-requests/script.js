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
const form = document.getElementById('form--request');

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

// Returns a random positive whole number between two values (min, max)
// Used throughout to select random array elements
function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Return random phrase from passPhrase array using randomNumber()
function randomPhrase() {
  return passPhrase[randomNumber(0, passPhrase.length - 1)];
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

const currentPassPhrase = randomPhrase();

phraseInput.placeholder = `type '${currentPassPhrase}'`;

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
    if (validEmail(email)) {
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
