import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  courseBody: {
    paddingHorizontal: 10,
    // flex: 1,
  },
  courseTitle: {
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    marginTop: 5,
  },
  section: {
    marginTop: 10,
  },
  authorBadge: {
    flexDirection: 'row',
    paddingHorizontal: 0,
    paddingVertical: 1,
    maxWidth: 150,
    paddingRight: 35,
    flexWrap: 'nowrap',
  },
  authorAvatar: {
    paddingHorizontal: 0,
    marginRight: 10,
  },
  iconsWrapper: {
    marginTop: 0,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    marginTop: 10,
  },
  ratingSection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 15,
  },
  ratingContent: {
    flex: 1,
    marginLeft: 15,
  },
  ratingUsername: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  ratingText: {
    marginTop: 10,
  },
});
