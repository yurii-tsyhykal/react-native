import React, {useEffect} from 'react';
import {View} from 'react-native';
import DefaultBtn from '../../../common/components/DefaultBtn';
import Input from '../../../common/components/Input';
import styles from '../styles';
import AuthLayout from '../components/AuthLayout';
import AuthHeader from '../components/AuthHeader';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import {ScreenNames} from '../../../constants/screenNames';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackNavigation} from '../../../navigation/types';
import {useTranslation} from 'react-i18next';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {loginSchema} from '../../../schemas/schemas';
import {authInstance} from '../../../config/firebaseConfig';

interface ILogin {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {t} = useTranslation();
  const {
    control,
    handleSubmit,
    formState: {errors, isDirty, isValid},
  } = useForm<ILogin>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
    mode: 'onTouched',
  });

  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();

  const onLogin = async (data: ILogin) => {
    console.log('start');

    try {
      const userCredential = await signInWithEmailAndPassword(
        authInstance,
        data.email,
        data.password,
      );
      console.log('User UID:', userCredential.user.uid);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(authInstance, user => {
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
              onChangeText={onChange}
              value={value}
              placeholder={t('auth.authForms.pwd_placeholder')}
              secureTextEntry={true}
              error={errors.password?.message}
            />
          )}
          name="password"
        />
      </View>
      <DefaultBtn
        onPress={handleSubmit(onLogin)}
        disabled={!isDirty || !isValid}
        text={t('common.buttons.login')}
      />
    </AuthLayout>
  );
}
