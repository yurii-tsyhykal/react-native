import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from './styles';
import {NotVisibleIcon, VisibleIcon} from '../../../assets/icons';

interface InputValue {
  email: string;
  password: string;
  errorEmail: null | string;
  errorPassword: null | string;
}

export default function LoginPage() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
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

  const isDisabledLoginBtn = Boolean(
    inputValues.errorEmail ||
      inputValues.errorPassword ||
      !inputValues.email ||
      !inputValues.password,
  );

  return (
    <KeyboardAvoidingView
      style={styles.mainWrapper}
      keyboardVerticalOffset={Platform.select({android: 20, ios: 90})}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.contentWrapper}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Раді тебе вітати!</Text>
            <Text style={styles.welcomeText}>
              Кожен пухнастик заслуговує на дбайливих господарів. Ми допоможемо
              тобі знайти друга.
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginBtn}>
              <Text style={styles.authText}>Вхід</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerBtn}>
              <Text style={styles.authText}>Реєстрація</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                style={styles.input}
                placeholderTextColor={'#838383'}
                onBlur={() => checkEmail()}
                value={inputValues.email}
                onChangeText={text => handleChangeInput('email', text)}
              />
            </View>
            {inputValues.errorEmail && <Text>{inputValues.errorEmail}</Text>}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Password"
                style={styles.input}
                placeholderTextColor={'#838383'}
                value={inputValues.password}
                onChangeText={text => {
                  handleChangeInput('password', text);
                  checkPassword(text);
                }}
                secureTextEntry={!isVisiblePassword}
              />
              <TouchableOpacity
                onPress={() => setIsVisiblePassword(!isVisiblePassword)}
                hitSlop={15}>
                {isVisiblePassword ? (
                  <VisibleIcon fill={'black'} />
                ) : (
                  <NotVisibleIcon fill={'black'} />
                )}
              </TouchableOpacity>
            </View>
            {inputValues.errorPassword && (
              <Text>{inputValues.errorPassword}</Text>
            )}
          </View>
          <TouchableOpacity
            style={[
              styles.loginBtnContainer,
              // eslint-disable-next-line react-native/no-inline-styles
              isDisabledLoginBtn && {opacity: 0.5},
            ]}
            disabled={isDisabledLoginBtn}>
            <Text style={styles.loginText}>Увійти</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
