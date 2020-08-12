import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modalStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  contentWrapper: {
    padding: 15,
    borderRadius: 15,
  },
  title: {
    borderBottomWidth: 1,
    paddingBottom: 15,
    alignItems: 'center',
  },
  content: {
    paddingVertical: 25,
  },
  actionBox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: -5
  },
  buttonStyle: {
    flex: 1,
    marginHorizontal: 5,
  },
});
