import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  searchContainer: {
    // backgroundColor: 'transparent',
    opacity: 1,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  searchInput: {
    fontSize: 18,
    fontFamily: 'Quicksand-Medium',
  },
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  searchContentWrapper: {
    flex: 1,
    marginTop: 20,
  },
  searchHistories: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  deleteHistoryTextModal: {
    textAlign: 'center',
  },
});
