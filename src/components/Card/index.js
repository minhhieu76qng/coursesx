import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import Text from 'components/Text';
import LogoLoadingIndicator from 'components/LogoLoadingIndicator';
import styles from './styles';

const CustomCard = ({
  width = 250,
  cardTitle = '',
  cardImage = '',
  cardDescriptions = [],
  onPress = null,
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[{ backgroundColor: colors.card, width }, styles.cardContainer]}
      onPress={onPress}
    >
      <View style={styles.cardImage}>
        <Image
          style={{ width: '100%', height: '100%' }}
          source={{ uri: cardImage }}
          PlaceholderContent={<LogoLoadingIndicator logoWidth={130} indicatorSize="large" />}
        />
      </View>
      <View style={styles.cardContent}>
        <Text numberOfLines={2} type="h4" colors="#fff">
          {cardTitle}
        </Text>
        {cardDescriptions &&
          cardDescriptions.map((des) => (
            <Text
              key={Math.random() * 10000}
              style={styles.cardDescription}
              type="description"
              colors="#fff"
              numberOfLines={2}
            >
              {des}
            </Text>
          ))}
      </View>
    </TouchableOpacity>
  );
};

export default CustomCard;
