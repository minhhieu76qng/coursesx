import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  courseContentItemHeader: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerItemIdx: {
    width: 70,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemHeader: {
    paddingLeft: 15,
  },
  viewedTimesHeader: {
    marginTop: 5,
  },
  separator: {
    width: '100%',
    height: 1,
  },
  sectionItem: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionItemTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 20,
  },
  sectionProgress: {
    backgroundColor: '#44bd32',
    width: 0,
    height: 3,
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 1,
    elevation: 1,
  },
});
