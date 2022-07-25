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
//   if (JSONState) {
//     formEl['email'].value = JSONState.email ?? '';
//     formEl['message'].value = JSONState.message ?? '';
//   }
// }

/////////////////////////////////////////////////

const formEl = document.querySelector('.feedback-form');
const emailAreaEl = document.querySelector('.feedback-form input');
const messageAreaEl = document.querySelector('.feedback-form textarea');

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

const STORAGE_KEY = 'feedback-form-state';
const localData = {};

onFormFulfill();

function onFormSubmit(event) {
  event.preventDefault();
  // localData.email = emailAreaEl.value;
  // localData.message = messageAreaEl.value;
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
function onFormInput(event) {
  localData[event.target.name] = event.target.value;
  localData.email = emailAreaEl.value;
  localData.message = messageAreaEl.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(localData));
}
function onFormFulfill() {
  const inputWalue = localStorage.getItem(STORAGE_KEY);
  const parsedWalue = JSON.parse(inputWalue);
  if (parsedWalue) {
    emailAreaEl.value = parsedWalue.email ?? '';
    messageAreaEl.value = parsedWalue.message ?? '';
  }
}
