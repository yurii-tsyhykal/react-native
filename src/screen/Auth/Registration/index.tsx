import React from 'react';
import AuthLayout from '../components/AuthLayout';
import AuthHeader from '../components/AuthHeader';
import {View} from 'react-native';
import {useForm} from 'react-hook-form';

export interface IRegistration {
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

export default function Registration() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: {}) => console.log(data);
  return (
    <AuthLayout>
      <AuthHeader activeTab="registration" />
      <View></View>
    </AuthLayout>
  );
}
