import {NavigatorScreenParams} from '@react-navigation/native';
import {ISettings} from '../../screen/Filter';
import {IPets} from '../../screen/Home';

export type RootStackNavigation = {
  LOGGED_IN_STACK: NavigatorScreenParams<LoggedInStackType>;
  LOGGED_OUT_STACK: NavigatorScreenParams<LoggedOutStackType>;
};

export type LoggedInStackType = {
  DRAWER_STACK: NavigatorScreenParams<DrawerStackType>;
  LANGUAGES_PAGE: undefined;
  PET_PAGE: {pet: IPets};
  FILTER_PAGE: {
    petList: IPets[];
  };
};

export type LoggedOutStackType = {
  LOGIN_PAGE: undefined;
  REGISTRATION_PAGE: undefined;
};

export type TabBarStackType = {
  HOME_PAGE: {settings?: ISettings};
  FAVORITE_PAGE: undefined;
};

export type DrawerStackType = {
  TAB_BAR_STACK: NavigatorScreenParams<TabBarStackType>;
};

// const LoggedInStack: DrawerStackType = {
//   TAB_BAR_STACK: undefined,
// };

// const LoggedOutStack: LoggedOutStackType = {
//   LOGIN_PAGE: undefined,
//   REGISTRATION_PAGE: undefined,
// };
