import React, {useState} from 'react';
import {View} from 'react-native';
import DefaultBtn from '../../../common/components/DefaultBtn';
import Input from '../../../common/components/Input';
import styles from '../styles';

interface InputValue {
  email: string;
  password: string;
  errorEmail: null | string;
  errorPassword: null | string;
}

export default function LoginPage() {
  const [inputValues, setInputValues] = useState<InputValue>({
    email: '',
    password: '',
    errorEmail: null,
    errorPassword: null,
  });

  const handleChangeInput = (
    key: 'email' | 'password' | 'errorEmail' | 'errorPassword',
    value: string | null,
  ) => {
    setInputValues(prev => ({...prev, [key]: value}));
  };

  const checkEmail = () => {
    const emailValidator = new RegExp(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
    );
    if (!emailValidator.test(inputValues.email)) {
      handleChangeInput('errorEmail', 'Not valid email');
    } else {
      handleChangeInput('errorEmail', null);
    }
  };

  const checkPassword = (text: string) => {
    if (text.length < 8) {
      handleChangeInput('errorPassword', 'Too short password');
    } else {
      handleChangeInput('errorPassword', null);
    }
  };

  const isDisabledactiveTab = Boolean(
    inputValues.errorEmail ||
      inputValues.errorPassword ||
      !inputValues.email ||
      !inputValues.password,
  );

  return (
    <>
      <View style={styles.formContainer}>
        <Input
          placeholder="Email"
          onBlur={checkEmail}
          value={inputValues.email}
          onChangeText={text => handleChangeInput('email', text)}
          error={inputValues.errorEmail}
        />
        <Input
          placeholder="Password"
          value={inputValues.password}
          onChangeText={text => {
            handleChangeInput('password', text);
            checkPassword(text);
          }}
          secureTextEntry={true}
          error={inputValues.errorPassword && inputValues.errorPassword}
        />
      </View>
      <DefaultBtn
        onPress={() => {}}
        disabled={isDisabledactiveTab}
        text="Увійти"
      />
    </>
  );
}
