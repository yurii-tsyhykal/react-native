import * as Yup from 'yup';
import {
  EMAIL_REGEX,
  getRegexByLocale,
  NAME_REGEX,
  PASSWORD_REGEX,
} from '../constants/regexes';
import {
  COMMENT_REGEX_ERROR_MESSAGE,
  MAX_ERROR_MESSAGE,
} from '../constants/messages';
import {i18n} from '../i18n';

const t = (key: string) => i18n.t(key);

const emailYup = Yup.string()
  .trim()
  .required(() => t('validation.email.required'))
  .max(50, () => t('validation.max'))
  .matches(EMAIL_REGEX, () => t('validation.email.format'));

export const registerSchema = Yup.object({
  email: emailYup,
  password: Yup.string()
    .min(8, () => t('validation.password.min'))
    .max(50, () => t('validation.max'))
    .matches(PASSWORD_REGEX, {
      message: () => t('validation.password.min'),
    })
    .required(() => t('validation.password.required')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], () => t('validation.confirmPassword.match'))
    .required(() => t('validation.confirmPassword.required')),
});

export const getApplicationSchema = () => {
  const locale = i18n.language as 'en' | 'pl' | 'uk';
  const regex = getRegexByLocale(locale);
  return Yup.object({
    name: Yup.string()
      .trim()
      .required(() => t('validation.name.required'))
      .min(2, () => t('validation.name.min'))
      .max(50, () => t('validation.max'))
      .matches(NAME_REGEX, () => t('validation.name.valid')),
    phone: Yup.string()
      .trim()
      .required(() => t('validation.phone.required'))
      .matches(regex.PHONE, () => t('validation.phone.valid')),
    email: emailYup,
    comment: Yup.string()
      .default('')
      .trim()
      .max(50, () => t('validation.max'))
      .matches(regex.COMMENT, () => t('validation.comment.valid')),
  });
};
