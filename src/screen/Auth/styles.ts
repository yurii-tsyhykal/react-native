import {Platform, StyleSheet} from 'react-native';
import {fonts} from '../../constants/fonts';

export default StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  title: {
    fontSize: 24,
    color: 'black',
    fontFamily: fonts.ComfortaaRegular,
  },
  welcomeText: {
    fontSize: 17,
    color: 'black',
    fontFamily: fonts.MontserratRegular,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EAE9FB',
    padding: 4,
    borderRadius: 20,
    marginTop: 32,
  },
  activeTab: {
    alignItems: 'center',
    backgroundColor: '#F8F8F9',
    padding: 10,
    borderRadius: 20,
    flex: 1,
  },
  authText: {
    fontSize: 14,
    color: '#0B0B0B',
  },
  disabledTab: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    opacity: 0.7,
    flex: 1,
  },
  titleContainer: {
    gap: 4,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 25,
    margin: 0,
    paddingVertical: Platform.select({
      android: 12,
      ios: 14,
      default: 12,
    }),
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formContainer: {
    marginTop: 28,
    marginBottom: 68,
    gap: 13,
  },
  input: {
    padding: 0,
  },
  errorTextContainer: {
    height: 12,
    position: 'relative',
    padding: 0,
  },
  errorText: {
    color: 'red',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  activeTabContainer: {
    backgroundColor: '#7A71BA',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  loginText: {color: 'white'},
});
