import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import DefaultBtn from '../../../common/components/DefaultBtn';
import Input from '../../../common/components/Input';
import styles from '../styles';
import AuthLayout from '../components/AuthLayout';
import AuthHeader from '../components/AuthHeader';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import {ScreenNames} from '../../../constants/screenNames';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackNavigation} from '../../../navigation/types';

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

  const isDisabledActiveTab = Boolean(
    inputValues.errorEmail ||
      inputValues.errorPassword ||
      !inputValues.email ||
      !inputValues.password,
  );

  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();

  const onLogin = async (email: string, password: string) => {
    const {user} = await signInWithEmailAndPassword(getAuth(), email, password);
    console.log(user);
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), user => {
      if (user) {
        console.log('user is signed in');
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: ScreenNames.LOGGED_IN_STACK}],
          }),
        );
      } else {
        console.log('user is signed out');
      }
    });
    return subscriber;
  }, [navigation]);
  return (
    <AuthLayout>
      <AuthHeader activeTab="login" />
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
        onPress={() => {
          onLogin(inputValues.email, inputValues.password);
        }}
        disabled={isDisabledActiveTab}
        text="Увійти"
      />
    </AuthLayout>
  );
}
