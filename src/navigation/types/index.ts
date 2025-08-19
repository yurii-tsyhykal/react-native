import {ISettings} from '../../screen/Filter';
import {IPets} from '../../screen/Home';

export type RootStackNavigation = {
  LOGGED_IN_STACK: {screens: keyof typeof LoggedInStack};
  LOGGED_OUT_STACK: {screens: keyof typeof LoggedOutStack};
};

export type LoggedInStackType = {
  DRAWER_STACK: undefined;
  FILTER_PAGE: {
    petList: IPets[];
  };
};

export type LoggedOutStackType = {
  LOGIN_PAGE: undefined;
  REGISTRATION_PAGE: undefined;
};

export type TabBarStackType = {
  HOME_PAGE: {settings: ISettings};
  FAVORITE_PAGE: undefined;
};

export type DrawerStackType = {
  TAB_BAR_STACK: undefined;
};

const LoggedInStack: DrawerStackType = {
  TAB_BAR_STACK: undefined,
};

const LoggedOutStack: LoggedOutStackType = {
  LOGIN_PAGE: undefined,
  REGISTRATION_PAGE: undefined,
};
