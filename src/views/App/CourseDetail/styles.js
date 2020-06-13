import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  courseBody: {
    paddingHorizontal: 10,
    // flex: 1,
  },
  courseTitle: {
    marginTop: 20,
  },
  section: {
    marginTop: 5,
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
});
