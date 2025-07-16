import React from 'react';
import AuthLayout from '../components/AuthLayout';
import AuthHeader from '../components/AuthHeader';
import {View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import Input from '../../../common/components/Input';
import {yupResolver} from '@hookform/resolvers/yup';
import {registerSchema} from '../utils/schemas';
import DefaultBtn from '../../../common/components/DefaultBtn';
import styles from '../styles';

export interface IRegistration {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Registration() {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid, isDirty, touchedFields},
  } = useForm<IRegistration>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(registerSchema),
    mode: 'onTouched',
  });
  console.log(useForm());

  const onSubmit = (data: IRegistration) => console.log(data);
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
              error={touchedFields.email ? errors.email?.message : null}
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
              error={touchedFields.password ? errors.password?.message : null}
            />
          )}
          name="password"
        />
        <Controller
          control={control}
          render={({field: {onBlur, onChange, value}}) => (
            <Input
              additionalContainerStyle={styles.loginPwdInput}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              placeholder="Confirm Password"
              secureTextEntry={true}
              error={
                touchedFields.confirmPassword
                  ? errors.confirmPassword?.message
                  : null
              }
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
