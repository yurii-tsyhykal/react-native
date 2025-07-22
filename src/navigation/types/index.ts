export type RootStackNavigation = {
  LOGGED_IN_STACK: {screens: keyof typeof LoggedInStack};
  LOGGED_OUT_STACK: {screens: keyof typeof LoggedOutStack};
};

export type LoggedInStackType = {
  TAB_BAR_STACK: undefined;
};

export type LoggedOutStackType = {
  LOGIN_PAGE: undefined;
  REGISTRATION_PAGE: undefined;
};

export type TabBarStackType = {
  HOME_PAGE: undefined;
  FAVORITE_PAGE: undefined;
};

const LoggedInStack: LoggedInStackType = {
  TAB_BAR_STACK: undefined,
};

const LoggedOutStack: LoggedOutStackType = {
  LOGIN_PAGE: undefined,
  REGISTRATION_PAGE: undefined,
};
