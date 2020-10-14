/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';
import { InputContainer } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = ({ name, ...rest }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return <InputContainer ref={inputRef} {...rest} />;
};

export default Input;
