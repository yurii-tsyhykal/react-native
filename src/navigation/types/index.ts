export type RootStackNavigation = {
  LOGGED_IN_STACK: {screens: keyof typeof LoggedInStack};
  LOGGED_OUT_STACK: {screens: keyof typeof LoggedOutStack};
};

export type LoggedInStackType = {
  HOME_PAGE: undefined;
};

export type LoggedOutStackType = {
  LOGIN_PAGE: undefined;
  REGISTRATION_PAGE: undefined;
};

const LoggedInStack: LoggedInStackType = {
  HOME_PAGE: undefined,
};

const LoggedOutStack: LoggedOutStackType = {
  LOGIN_PAGE: undefined,
  REGISTRATION_PAGE: undefined,
};
