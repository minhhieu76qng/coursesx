import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    minHeight: 70,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: '#dadada',
    borderBottomWidth: 0.4,
    paddingVertical: 10,
    overflow: 'visible',
  },
  leftBox: {
    width: 120,
  },
  rightBox: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 50,
    overflow: 'visible',
  },
  courseImage: {
    width: '100%',
    // maxHeight: 120,
    aspectRatio: 1,
  },
  descriptionWrapper: {
    marginTop: 5,
  },
  rattingWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rating: {
    backgroundColor: 'red',
  },
});
