import React, {useEffect, useRef} from 'react';
import {InputContainer, TextInput, Icon, Error} from './styles';
import {useField} from '@unform/core';
import {Text, TextInputProps} from 'react-native';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.ForwardRefRenderFunction<InputProps> = ({name, icon}) => {
  const inputRef = useRef(null);
  const {fieldName, registerField, defaultValue, error} = useField(name);

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue(ref) {
        ref.value = '';
        ref.clear();
      },
      setValue(ref, value) {
        ref.setNativeProps({text: value});
        inputRef.current.value = value;
      },
      getValue(ref) {
        return ref.value;
      },
    });
  }, [fieldName, registerField]);

  return (
    <InputContainer>
      <TextInput
        ref={inputRef}
        keyboardAppearance="dark"
        defaultValue={defaultValue}
        placeholderTextColor="#666360"
        onChangeText={(value) => {
          if (inputRef.current) {
            inputRef.current.value = value;
          }
        }}
      />
    </InputContainer>
  );
};

export default Input;
