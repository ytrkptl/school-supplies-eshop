import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {
  googleSignInStart,
  emailSignInStart
} from '@/redux/user/user.reducer';

import {
  SignInContainer,
  SignInTitle,
  ButtonsBarContainer
} from './sign-in.styles';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const dispatch = useDispatch();
  const [userCredentials, setCredentials] = useState({ email: '', password: '' });

  const { email, password } = userCredentials;

  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await dispatch(emailSignInStart({ email, password })).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error);
      alert(error.message || 'Failed to sign in. Please try again.');
    }
  };

  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({...userCredentials, [name]: value });
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  };

  return (
    <SignInContainer>
      <SignInTitle>I already have an account</SignInTitle>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          handleChange={handleChange}
          value={email}
          label='Email'
          required
        />
        <FormInput
          name='password'
          type='password'
          value={password}
          handleChange={handleChange}
          label='Password'
          required
        />
        <ButtonsBarContainer>
          <CustomButton type='submit'> Sign in </CustomButton>
          <CustomButton type='button' onClick={handleGoogleSignIn} isGoogleSignIn>
            Sign in with Google
          </CustomButton>
        </ButtonsBarContainer>
      </form>
    </SignInContainer>
  );
};

export default SignIn;