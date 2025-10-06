import React from 'react';
import AuthLayout from '../components/AuthLayout';
import AuthHeader from '../components/AuthHeader';
import {View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import Input from '../../../common/components/Input';
import {yupResolver} from '@hookform/resolvers/yup';
import {registerSchema} from '../../../schemas/schemas';
import DefaultBtn from '../../../common/components/DefaultBtn';
import styles from '../styles';
import {
  createUserWithEmailAndPassword,
  getAuth,
} from '@react-native-firebase/auth';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackNavigation} from '../../../navigation/types';
import {ScreenNames} from '../../../constants/screenNames';
import {useTranslation} from 'react-i18next';

export interface IRegistration {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Registration() {
  const {t} = useTranslation();
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

  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();

  const registerNewUser = async (email: string, password: string) => {
    try {
      const {user} = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password,
      );
      if (user) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: ScreenNames.LOGGED_IN_STACK}],
          }),
        );
      }
      return user;
    } catch (error) {
      const firebaseError = error as {code: string};
      if (firebaseError.code === 'auth/email-already-in-use') {
        setError('email', {
          message: 'This email is already in use',
        });
      }
    }
  };

  const onSubmit = (data: IRegistration) => {
    registerNewUser(data.email, data.password);
  };
  return (
    <AuthLayout>
      <AuthHeader activeTab="Registration" />
      <View style={styles.formContainer}>
        <Controller
          control={control}
          render={({field: {onBlur, onChange, value}}) => (
            <Input
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              placeholder={t('auth.authForms.email_placeholder')}
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
              placeholder={t('auth.authForms.pwd_placeholder')}
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
              placeholder={t('auth.authForms.confirm_pwd_placeholder')}
              secureTextEntry={true}
              error={errors.confirmPassword?.message}
            />
          )}
          name="confirmPassword"
        />
        <DefaultBtn
          onPress={handleSubmit(onSubmit)}
          text={t('common.buttons.registration')}
          disabled={!isDirty || !isValid}
        />
      </View>
    </AuthLayout>
  );
}
