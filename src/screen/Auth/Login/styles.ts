import {Platform, StyleSheet} from 'react-native';

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
  },
  welcomeText: {
    fontSize: 14,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EAE9FB',
    padding: 4,
    borderRadius: 20,
    marginTop: 32,
  },
  loginBtn: {
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
  registerBtn: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    flex: 1,
  },
  titleContainer: {
    gap: 4,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 25,
    marginVertical: 4,
    paddingVertical: Platform.select({
      android: 12,
      ios: 14,
      default: 12,
    }),
    paddingHorizontal: 24,
  },
  formContainer: {
    marginTop: 28,
    marginBottom: 68,
  },
  input: {
    padding: 0,
  },
  loginBtnContainer: {
    backgroundColor: '#7A71BA',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  loginText: {color: 'white'},
});
