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
    borderRadius: 20,
    borderBottomLeftRadius: 5,
    marginBottom: 20,
    overflow: 'hidden',
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
  listItemIcon: {
    width: 25,
    height: 25,
    textAlign: 'center',
  },
});
