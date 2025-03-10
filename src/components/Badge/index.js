import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from 'components/Text';
import styles from './styles';

const Badge = ({
  id,
  text,
  children,
  wrapperStyle = {},
  onPress = null,
  onLongPress = null,
  activeOpacity = 0.8,
}) => {
  const WrappedComponent = useMemo(() => {
    return onPress || onLongPress ? TouchableOpacity : View;
  }, [onPress]);
  const touchableProps = useMemo(() => {
    return onPress || onLongPress ? { onPress, onLongPress, activeOpacity } : {};
  }, [onPress, id]);
  return (
    <WrappedComponent style={[styles.badgeWrapper, wrapperStyle]} {...touchableProps}>
      {children || (
        <Text style={styles.badgeText} weight="medium">
          {text}
        </Text>
      )}
    </WrappedComponent>
  );
};

export default Badge;
