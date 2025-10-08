export const PASSWORD_REGEX = /^.{8,50}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const NAME_REGEX = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐąćęłńóśźżĄĆĘŁŃÓŚŹŻ''\- ]+$/u;

export const UK_REGEX = {
  PHONE: /^(?:\+380|380|0)\d{9}$/,
  COMMENT: /^[а-яА-ЯіІїЇєЄґҐ0-9\s.,!?'"()\-\n\r]*$/u,
};
export const PL_REGEX = {
  PHONE: /^(?:\+48|48)?[4-9]\d{8}$/,
  COMMENT: /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\s.,!?'"()\-\n\r]*$/u,
};
export const EN_REGEX = {
  PHONE: /^(?:\+1|1)?[2-9]\d{9}$/,
  COMMENT: /^[a-zA-Z0-9\s.,!?'"()\-\n\r]*$/,
};

export const getRegexByLocale = (locale: 'en' | 'uk' | 'pl') => {
  switch (locale) {
    case 'uk':
      return UK_REGEX;
    case 'pl':
      return PL_REGEX;
    case 'en':
      return EN_REGEX;
    default:
      return EN_REGEX;
  }
};
