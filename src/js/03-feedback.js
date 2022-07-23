import throttle from 'lodash.throttle';

// const formEl = document.querySelector('.feedback-form');

// formEl.addEventListener('input', onFormInput);
// formEl.addEventListener('submit', throttle(onFormSubmit, 500));
// window.addEventListener('load', onSavedMessage);
// function onFormInput(event) {
//   const state = localStorage.getItem('feedback-form-state');

//   const JSONState = JSON.parse(state);
//   const newLocalStorage = {
//     ...JSONState,
//     [event.target.name]: event.target.value,
//   };

//   localStorage.setItem('feedback-form-state', JSON.stringify(newLocalStorage));
// }

// function onFormSubmit(event) {
//   event.preventDefault();

//   localStorage.removeItem('feedback-form-state');
//   event.currentTarget.reset();
// }

// function onSavedMessage() {
//   const state = localStorage.getItem('feedback-form-state');
//   const JSONState = JSON.parse(state);
//   formEl['email'].value = JSONState ? JSONState.email ?? '' : '';
//   formEl['message'].value = JSONState ? JSONState.message ?? '' : '';
// }

const formEl = document.querySelector('.feedback-form');
const emailAreaEl = document.querySelector('.feedback-form input');
const messageAreaEl = document.querySelector('.feedback-form textarea');

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

const STORAGE_KEY = 'feedback-form-state';

onFormFulfill();

const localData = {};

function onFormInput(event) {
  localData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(localData));
}

function onFormSubmit(event) {
  event.preventDefault();
  localData.email = emailAreaEl.value;
  localData.message = messageAreaEl.value;
  console.log(localData);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormFulfill() {
  const inputWalue = localStorage.getItem(STORAGE_KEY);
  const parsedWalue = JSON.parse(inputWalue);
  console.log(parsedWalue);
  if (parsedWalue) {
    const emailData = parsedWalue.email;
    emailAreaEl.value = emailData;

    const messageData = parsedWalue.message;
    messageAreaEl.value = messageData;
  }
}
