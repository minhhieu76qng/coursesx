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
});
