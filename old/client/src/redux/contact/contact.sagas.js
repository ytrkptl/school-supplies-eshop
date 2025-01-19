import { takeLatest, put, all } from 'redux-saga/effects';

import ContactFormTypes from './contact.types';

import {
  fetchContactFormSuccess,
  fetchContactFormFailure
} from './contact.actions';

function* sendContactFormAsync({ payload: userInput }) {
  try {
    let response = yield fetch('/send-contact-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInput)
    });
    if (response.status === 200) {
      yield put(fetchContactFormSuccess(response.json()))
    } else {
      yield put(fetchContactFormFailure('something went wrong'))
    }
  }
  catch (err) {
    yield put(fetchContactFormFailure('something'))
  }
}

function* sendContactFormStart() {
  yield takeLatest(ContactFormTypes.SEND_CONTACT_FORM_START, sendContactFormAsync)
}

export function* contactFormSagas() {
  yield all([sendContactFormStart()]);
}