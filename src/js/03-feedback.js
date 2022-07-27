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
//   console.log(state);
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

function onFormFulfill() {
  const formValue = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (formValue === null) {
    return;
  }
  setFormValueOnLoad(formValue);
}

function setFormValueOnLoad({ email, message }) {
  formEl.elements.email.value = email;
  formEl.elements.message.value = message;
}

function onFormInput() {
  const formValue = getFormValue();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formValue));
}

function getFormValue() {
  const email = formEl.elements.email.value;
  const message = formEl.elements.message.value;
  return { email, message };
}

function onFormSubmit(event) {
  event.preventDefault();
  const formValue = getFormValue();
  console.log(formValue);

  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
