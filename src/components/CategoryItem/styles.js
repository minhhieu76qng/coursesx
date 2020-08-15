import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    opacity: 0.9,
    // backgroundColor: '#576574',
    width: '100%',
    minHeight: 130,
    maxHeight: 150,
  },
  textWrapper: {
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
