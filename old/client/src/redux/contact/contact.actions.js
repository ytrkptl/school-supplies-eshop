import ContactFormTypes from './contact.types';

export const fetchContactFormStart = text => ({
  type: ContactFormTypes.SEND_CONTACT_FORM_START,
  payload: text
})

export const fetchContactFormSuccess = data => ({
  type: ContactFormTypes.SEND_CONTACT_FORM_SUCCESS,
  payload: data
})

export const fetchContactFormFailure = errorMessage => ({
  type: ContactFormTypes.SEND_CONTACT_FORM_FAILURE,
  payload: errorMessage
})