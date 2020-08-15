import React, { useMemo, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import Text from 'components/Text';
import Icon from 'themes/Icon';
import { isArray } from 'lodash';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: { marginLeft: 10 },
});

function Rating({
  size,
  activeColor,
  inactiveColor,
  numberOfStars,
  ratedStars,
  style,
  showRating,
}) {
  const { dark } = useTheme();

  const renderStar = useCallback((number, idx) => {
    const name = number === 0.5 ? 'star-half-o' : 'star';
    let color = activeColor;
    if (number < 0.5) {
      color = dark ? inactiveColor : '#95a5a6';
    }
    return <Icon key={idx} name={name} size={size} color={color} />;
  }, []);

  const arrayStars = useMemo(() => {
    const stars = new Array(numberOfStars).fill(0);
    let actualStars = numberOfStars;

    if (ratedStars < numberOfStars) {
      const tithes = ratedStars - Math.floor(ratedStars);
      actualStars = Math.floor(ratedStars);
      if (tithes > 0.75) {
        actualStars += 1;
      }
      if (tithes >= 0.5 && tithes < 0.75) {
        actualStars += 0.5;
      }
    }

    for (let i = 0; i < stars.length; i += 1) {
      if (actualStars - i > 0.5) {
        stars[i] = 1;
      }
      if (actualStars - i === 0.5) {
        stars[i] = 0.5;
      }
      if (actualStars < i) {
        stars[i] = 0;
      }
    }

    return stars;
  }, [numberOfStars, ratedStars]);
  return (
    <View style={[styles.container, style]}>
      {arrayStars && isArray(arrayStars) && arrayStars.map(renderStar)}
      {showRating && (
        <Text type="subbody" color={activeColor} style={[styles.ratingText, { lineHeight: size }]}>
          {`( ${Number(ratedStars).toFixed(1)} )`}
        </Text>
      )}
    </View>
  );
}

Rating.propsType = {
  numberOfStars: PropTypes.number,
  ratedStars: PropTypes.number,
  size: PropTypes.number,
  activeColor: PropTypes.string,
  inactiveColor: PropTypes.string,
  style: PropTypes.object,
  showRating: PropTypes.bool,
};

Rating.defaultProps = {
  numberOfStars: 5,
  ratedStars: 0,
  size: 20,
  activeColor: '#f1c40f',
  inactiveColor: '#ecf0f1',
  style: {},
  showRating: false,
};

export default Rating;
