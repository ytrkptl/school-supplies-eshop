import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import Spinner from '../spinner/spinner.component';

import { sendContactForm } from '@/redux/contact/contact.reducer';

import {
  ContactContainer,
  ContactTitle,
  ContactButtonsContainer,
  StyledSuccessOrErrorMessage
} from './contact.styles';

const Contact = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.contactForm.isFetching);
  const hasErrored = useSelector(state => state.contactForm.hasErrored);
  const data = useSelector(state => state.contactForm.data);

  const [userInput, setUserInput] = useState({ name: '', email: '', message: '' });
  const [showSpinner, setShowSpinner] = useState(false);
  const [successOrErrorMessage, setSuccessOrErrorMessage] = useState('');
  const [showSuccessOrErrorMessage, setShowSuccessOrErrorMessage] = useState(false);
  const { name, email, message } = userInput;

  useEffect(() => {
    if (isFetching) {
      setShowSpinner(true);
    } else {
      setShowSpinner(false);
      if (!hasErrored && data !== null) {
        setUserInput({ name: '', email: '', message: '' });
        setSuccessOrErrorMessage(`Your message was sent successfully! If the email you provided
          is valid, we'll get back in touch with you within 48 hours.`);
        setShowSuccessOrErrorMessage(true);
      } else if (data !== null) {
        setSuccessOrErrorMessage('Something went wrong. Please try sending the form again!');
        setShowSuccessOrErrorMessage(true);
      }
    }
    return () => {
      setShowSpinner(false);
      setSuccessOrErrorMessage('');
      setShowSuccessOrErrorMessage(false);
    };
  }, [isFetching, hasErrored, data]);

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(sendContactForm(userInput));
    window.scrollTo(0, 0);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setUserInput({ ...userInput, [name]: value });
  };

  return (
    <ContactContainer>
      <ContactTitle>Contact Us</ContactTitle>
      <span>Fill out the form below in order to send us a message.</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          name='name'
          type='text'
          value={name}
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
          <CustomButton type='submit'>Send Message</CustomButton>
        </ContactButtonsContainer>
      </form>
      {showSpinner && <Spinner />}
      {showSuccessOrErrorMessage && (
        <StyledSuccessOrErrorMessage hasErrored={hasErrored}>{successOrErrorMessage}</StyledSuccessOrErrorMessage>
      )}
    </ContactContainer>
  );
};

export default Contact;