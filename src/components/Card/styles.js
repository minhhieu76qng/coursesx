import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  cardContainer: {
    aspectRatio: 1,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  cardImage: {
    height: '50%',
    flex: 1,
  },
  cardContent: {
    height: '50%',
    maxHeight: 150,
    padding: 10,
    overflow: 'hidden',
  },
  cardDescription: {
    marginTop: 10,
  },
});
