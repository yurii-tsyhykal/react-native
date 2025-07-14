import * as Yup from 'yup';

export const registerSchema = Yup.object({
  email: Yup.string().email('Invalid Email').required('Email is empty'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100)
    .matches(new RegExp(/^.{8,100}$/), {
      message: 'Password must be more then 8 symbols',
    })
    .required('Password is empty'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});
