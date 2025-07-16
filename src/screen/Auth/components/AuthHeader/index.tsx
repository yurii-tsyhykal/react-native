import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../../styles';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../../../constants/screenNames';
import {RootStackNavigation} from '../../../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';

export interface IAuthHeader {
  activeTab: 'login' | 'registration';
}

export default function AuthHeader({activeTab}: IAuthHeader) {
  const navigate = useNavigation<StackNavigationProp<RootStackNavigation>>();

  const navigateToLogin = () => navigate.navigate(ScreenNames.LOGIN_PAGE);
  const navigateToRegistration = () =>
    navigate.navigate(ScreenNames.REGISTRATION_PAGE);

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Раді тебе вітати!</Text>
        <Text style={styles.welcomeText}>
          Koжен пухнастик заслуговує на дбайливих господарів.{'\n'}
          <Text>Ми допоможемо тобі знайти друга.</Text>
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={navigateToLogin}
          style={activeTab === 'login' ? styles.activeTab : styles.disabledTab}>
          <Text style={styles.authText}>Вхід</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToRegistration}
          style={
            activeTab === 'registration' ? styles.activeTab : styles.disabledTab
          }>
          <Text style={styles.authText}>Реєстрація</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
