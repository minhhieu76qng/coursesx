import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  cardShadow: {
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 3,
      height: 15,
    },
    shadowRadius: 9,
    shadowOpacity: 1,
    elevation: 9,
  },
  card: {
    width: '100%',
    borderRadius: 25,
    borderBottomLeftRadius: 8,
    overflow: 'hidden',
    padding: 20,
  },
  updateProfileTitle: {
    textAlign: 'center',
    marginBottom: 30,
  },
  inputLabelStyle: {
    fontWeight: 'normal',
  },
  errorTextMessage: {
    color: 'red',
    marginVertical: 5,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
