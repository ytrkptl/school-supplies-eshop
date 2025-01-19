import React from 'react';

import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel,
  FormTextarea
} from './form-input.styles';

const FormInput = ({ handleChange, label, textareaInstead, ...props }) => (
  <GroupContainer>
    {
      textareaInstead ? <FormTextarea onChange={handleChange} {...props} rows={10} columns={30} />
        : <FormInputContainer onChange={handleChange} {...props} />
    }
    {label ? (
      <FormInputLabel className={props.value && props.value.length ? 'shrink' : ''}>
        {label}
      </FormInputLabel>
    ) : null}
  </GroupContainer>
);

export default FormInput;