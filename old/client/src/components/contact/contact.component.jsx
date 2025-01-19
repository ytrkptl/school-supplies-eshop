import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import Spinner from '../spinner/spinner.component';

import { fetchContactFormStart } from "../../redux/contact/contact.actions";

import {
  ContactContainer,
  ContactTitle,
  ContactButtonsContainer,
  StyledSuccessOrErrorMessage
} from './contact.styles';

const Contact = ({ isFetching, hasErrored, data, fetchContactFormStart }) => {
  const [userInput, setUserInput] = useState({ customerName: '', email: '', message: '' })
  const [showSpinner, setShowSpinner] = useState(false);
  const [successOrErrorMessage, setSuccessOrErrorMessage] = useState('');
  const [showSuccessOrErrorMessage, setShowSuccessOrErrorMessage] = useState(false)
  const { customerName, email, message } = userInput;

  useEffect(() => {
    if (isFetching) {
      setShowSpinner(true)
    } else {
      setShowSpinner(false)
      if (!hasErrored && data !== null) {
        setUserInput({ customerName: '', email: '', message: '' })
        setSuccessOrErrorMessage(`Your message was sent successfully! If the email you provided
          is valid, we'll get back in touch with you within 48 hours.`)
        setShowSuccessOrErrorMessage(true)
      } else if (data !== null) {
        setSuccessOrErrorMessage('Something went wrong. Please try sending the form again!')
        setShowSuccessOrErrorMessage(true)
      }
    }
    return () => {
      setShowSpinner(false)
      setSuccessOrErrorMessage('')
      setShowSuccessOrErrorMessage(false)
    };
  }, [isFetching, hasErrored, data])

  const handleSubmit = async event => {
    event.preventDefault();
    fetchContactFormStart(userInput)
    window.scrollTo(0,0)
  };

  const handleChange = event => {
    const { value, name } = event.target;
    setUserInput({ ...userInput, [name]: value });
  };

  return (
    <ContactContainer>
      <ContactTitle>Contact Form</ContactTitle>
      <span>Fill out the form below in order to send us a message.</span>
      {showSpinner && <Spinner />}
      {showSuccessOrErrorMessage && <StyledSuccessOrErrorMessage hasErrored={hasErrored}>{successOrErrorMessage}</StyledSuccessOrErrorMessage>}
      <form onSubmit={handleSubmit}>
        <FormInput
          name='customerName'
          type='name'
          value={customerName}
          handleChange={handleChange}
          label='Name'
          required
        />
        <FormInput
          name='email'
          type='email'
          handleChange={handleChange}
          value={email}
          label='Email'
          required
        />
        <FormInput
          name='message'
          type='text'
          value={message}
          handleChange={handleChange}
          label='Message'
          required
          textareaInstead={true}
        />
        <ContactButtonsContainer>
          <CustomButton type='submit'> Submit </CustomButton>
        </ContactButtonsContainer>
      </form>
    </ContactContainer>
  );
}

const mapStateToProps = state => ({
  isFetching: state.contactFormReducer.isFetching,
  hasErrored: state.contactFormReducer.hasErrored,
  data: state.contactFormReducer.data
});

const mapDispatchToProps = dispatch => ({
  fetchContactFormStart: text => dispatch(fetchContactFormStart(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);