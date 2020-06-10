import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from 'components/Text';
import styles from './styles';

const Badge = ({ id, text, wrapperStyle = {}, onPress = null }) => {
  const WrappedComponent = useMemo(() => {
    return onPress ? TouchableOpacity : View;
  }, [onPress]);
  const touchableProps = useMemo(() => {
    return onPress ? { onPress } : {};
  }, [onPress, id]);
  return (
    <WrappedComponent style={[styles.badgeWrapper, wrapperStyle]} {...touchableProps}>
      <Text style={styles.badgeText} weight="medium">
        {text}
      </Text>
    </WrappedComponent>
  );
};

export default Badge;
