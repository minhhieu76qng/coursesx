import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absoluteLoading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  noneLoading: {
    position: 'relative',
    width: 0,
    height: 0,
    zIndex: 0,
    overflow: 'hidden',
  },
});
