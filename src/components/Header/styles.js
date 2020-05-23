import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  rightWidgets: {
    minWidth: 40,
    marginRight: 5,
  },
});
