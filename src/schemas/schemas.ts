import * as Yup from 'yup';
import {
  COMMENT_REGEX,
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  PHONE_REGEX,
} from '../constants/regexes';
import {
  COMMENT_REGEX_ERROR_MESSAGE,
  CONFIRM_PASSWORD,
  EMAIL_ERROR_MESSAGE,
  EMAIL_REQUIRED,
  MAX_ERROR_MESSAGE,
  NAME_MIN_ERROR_MESSAGE,
  NAME_REGEX_ERROR_MESSAGE,
  NAME_REQUIRED,
  PASSWORD_MATCH,
  PASSWORD_MIN_ERROR_MESSAGE,
  PASSWORD_REQUIRED,
  PHONE_REGEX_ERROR_MESSAGE,
  PHONE_REQUIRED,
} from '../constants/messages';
import {i18n} from '../i18n';

const t = (key: string) => i18n.t(key);

const emailYup = Yup.string()
  .trim()
  .required(EMAIL_REQUIRED)
  .max(50, MAX_ERROR_MESSAGE)
  .matches(EMAIL_REGEX, EMAIL_ERROR_MESSAGE);

export const registerSchema = Yup.object({
  email: emailYup,
  password: Yup.string()
    .min(8, () => t('validation.password.min'))
    .max(50, () => t('validation.password.max'))
    .matches(PASSWORD_REGEX, {
      message: () => t('validation.password.min'),
    })
    .required(() => t('validation.password.required')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], () => t('validation.confirmPassword.match'))
    .required(() => t('validation.confirmPassword.required')),
});

export const applicationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required(NAME_REQUIRED)
    .min(2, NAME_MIN_ERROR_MESSAGE)
    .max(50, MAX_ERROR_MESSAGE)
    .matches(NAME_REGEX, NAME_REGEX_ERROR_MESSAGE),
  phone: Yup.string()
    .trim()
    .required(PHONE_REQUIRED)
    .matches(PHONE_REGEX, PHONE_REGEX_ERROR_MESSAGE),
  email: emailYup,
  comment: Yup.string()
    .default('')
    .trim()
    .max(50, MAX_ERROR_MESSAGE)
    .matches(COMMENT_REGEX, COMMENT_REGEX_ERROR_MESSAGE),
});
