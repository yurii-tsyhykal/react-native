import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../../styles';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../../../constants/screenNames';
import {RootStackNavigation} from '../../../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

export interface IAuthHeader {
  activeTab: 'login' | 'Registration';
}

export default function AuthHeader({activeTab}: IAuthHeader) {
  const navigate = useNavigation<StackNavigationProp<RootStackNavigation>>();

  const {t} = useTranslation();
  const navigateToLogin = () =>
    navigate.navigate('LOGGED_OUT_STACK', {
      screen: ScreenNames.LOGIN_PAGE,
    });
  const navigateToRegistration = () =>
    navigate.navigate('LOGGED_OUT_STACK', {
      screen: ScreenNames.REGISTRATION_PAGE,
    });

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('auth.authHeader.title')}</Text>
        <Text style={styles.welcomeText}>{t('auth.authHeader.subtitle')}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={navigateToLogin}
          style={activeTab === 'login' ? styles.activeTab : styles.disabledTab}
        >
          <Text style={styles.authText}>Вхід</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToRegistration}
          style={
            activeTab === 'Registration' ? styles.activeTab : styles.disabledTab
          }
        >
          <Text style={styles.authText}>Реєстрація</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
