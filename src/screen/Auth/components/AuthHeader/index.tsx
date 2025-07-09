import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../../styles';

export interface IAuthHeader {
  activeTab: 'login' | 'registration';
}

export default function AuthHeader({activeTab}: IAuthHeader) {
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Раді тебе вітати!</Text>
        <Text style={styles.welcomeText}>
          Kobe пухнастик заслуговує на дбайливих господарів. Ми допоможемо тобі
          знайти друга.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={activeTab === 'login' ? styles.activeTab : styles.disabledTab}>
          <Text style={styles.authText}>Вхід</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            activeTab === 'registration' ? styles.activeTab : styles.disabledTab
          }>
          <Text style={styles.authText}>Реєстрація</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
