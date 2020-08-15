import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  cardShadow: {
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 3,
      height: 15,
    },
    shadowRadius: 9,
    shadowOpacity: 1,
    elevation: 9,
  },
  card: {
    width: '100%',
    borderRadius: 25,
    borderBottomLeftRadius: 8,
    overflow: 'hidden',
    paddingVertical: 20,
  },
  cardProfile: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  changeAvatarButtonText: {
    fontSize: 14,
  },
  profileBox: {
    marginLeft: 15,
  },
  profileText: {
    marginBottom: 5,
  },
  settingsDivider: {
    marginVertical: 20,
    width: '100%',
    height: 1,
  },
  listItemIcon: {
    width: 25,
    height: 25,
    textAlign: 'center',
  },
});
