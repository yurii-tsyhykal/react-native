import React, {useEffect} from 'react';
import AuthLayout from '../components/AuthLayout';
import AuthHeader from '../components/AuthHeader';
import {View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import Input from '../../../common/components/Input';
import {yupResolver} from '@hookform/resolvers/yup';
import {registerSchema} from '../utils/schemas';
import DefaultBtn from '../../../common/components/DefaultBtn';
import styles from '../styles';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from '@react-native-firebase/auth';

export interface IRegistration {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Registration() {
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors, isValid, isDirty},
  } = useForm<IRegistration>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(registerSchema),
    mode: 'onTouched',
  });

  const registerNewUser = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password,
      );
      return result;
    } catch (error) {
      const firebaseError = error as {code: string};
      if (firebaseError.code === 'auth/email-already-in-use') {
        setError('email', {
          message: 'This email is already in use',
        });
      }
    }
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), user => {
      if (user) {
        console.log('user is signed in');
      } else {
        console.log('user is signed out');
      }
    });
    return subscriber;
  }, []);

  const onSubmit = (data: IRegistration) => {
    registerNewUser(data.email, data.password);
  };
  return (
    <AuthLayout>
      <AuthHeader activeTab="registration" />
      <View style={styles.formContainer}>
        <Controller
          control={control}
          render={({field: {onBlur, onChange, value}}) => (
            <Input
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              placeholder="Email"
              error={errors.email?.message}
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          render={({field: {onBlur, onChange, value}}) => (
            <Input
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              placeholder="Password"
              secureTextEntry={true}
              error={errors.password?.message}
            />
          )}
          name="password"
        />
        <Controller
          control={control}
          render={({field: {onBlur, onChange, value}}) => (
            <Input
              confirmPwdStyle={styles.loginPwdInput}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              placeholder="Confirm Password"
              secureTextEntry={true}
              error={errors.confirmPassword?.message}
            />
          )}
          name="confirmPassword"
        />
        <DefaultBtn
          onPress={handleSubmit(onSubmit)}
          text="Зареєструватись"
          disabled={!isDirty || !isValid}
        />
      </View>
    </AuthLayout>
  );
}
