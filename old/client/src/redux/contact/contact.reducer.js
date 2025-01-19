import ContactFormTypes from './contact.types';

const INITIAL_STATE = {
  isFetching: false,
  data: null,
  errorMessage: undefined,
  hasErrored: null
};

const contactFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ContactFormTypes.SEND_CONTACT_FORM_START:
      return {
        ...state,
        isFetching: true
      }
    case ContactFormTypes.SEND_CONTACT_FORM_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      }
    case ContactFormTypes.SEND_CONTACT_FORM_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isFetching: false,
        hasErrored: true
      }
    default:
      return state;
  }
}

export default contactFormReducer;