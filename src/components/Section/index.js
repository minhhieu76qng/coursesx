import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from 'components/Text';
import styles from './styles';

const Section = ({ sectionTitle, subtitle, onSeeAllPress, children }) => {
  const sTitle = useMemo(() => {
    if (!subtitle) {
      return sectionTitle;
    }
    return `${sectionTitle} in ${subtitle}`;
  }, [sectionTitle, subtitle]);
  return (
    <View style={styles.sectionWrapper}>
      <View style={styles.sectionTitle}>
        <Text type="h4" weight="bold">
          {sTitle}
        </Text>
        {onSeeAllPress && (
          <TouchableOpacity onPress={onSeeAllPress}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
};

export default Section;
