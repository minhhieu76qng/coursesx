import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Image } from 'react-native-elements';
import LogoLoadingIndicator from 'components/LogoLoadingIndicator';
import Text from 'components/Text';
import styles from './styles';

const CategoryItem = ({
  style,
  title,
  description,
  background,
  onItemClick,
  titleStyle = {},
  descriptionStyle = {},
}) => {
  const [imageLoaded, setLoaded] = useState(false);
  return (
    <TouchableOpacity activeOpacity={!imageLoaded ? 1 : 0.4} onPress={onItemClick} style={style}>
      <Image
        onLoadEnd={() => setLoaded(true)}
        source={{ uri: background }}
        style={styles.imageStyle}
        PlaceholderContent={<LogoLoadingIndicator logoWidth={130} indicatorSize="large" />}
      />
      {imageLoaded && title && (
        <Animatable.View animation="bounceIn" delay={200} duration={800} style={styles.textWrapper}>
          <Text style={[styles.text, titleStyle]} color="#fff" type="h2" weight="bold">
            {title}
          </Text>

          {description && (
            <Text style={[styles.text, descriptionStyle]} type="h4" color="#fff" weight="medium">
              {description}
            </Text>
          )}
        </Animatable.View>
      )}
    </TouchableOpacity>
  );
};

export default CategoryItem;
