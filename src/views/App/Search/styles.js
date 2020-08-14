import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  searchContainer: {
    backgroundColor: 'transparent',
    opacity: 1,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    padding: 0,
    paddingHorizontal: 10,
  },
  searchInput: {
    fontSize: 18,
    fontFamily: 'Quicksand-Medium',
  },
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  searchTopTab: {
    marginHorizontal: -10,
  },
  searchContentWrapper: {
    flex: 1,
    marginTop: 10,
  },
  searchHistories: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  deleteHistoryTextModal: {
    textAlign: 'center',
  },
  historyBadge: {
    marginRight: 10,
  },
});
