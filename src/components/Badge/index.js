import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from 'components/Text';
import styles from './styles';

const Badge = ({ id, text, wrapperStyle = {}, badgePress = null }) => {
  const WrappedComponent = useMemo(() => {
    return badgePress ? TouchableOpacity : View;
  }, [badgePress]);
  const touchableProps = useMemo(() => {
    return badgePress ? { onPress: badgePress } : {};
  }, [badgePress, id]);
  return (
    <WrappedComponent style={[styles.badgeWrapper, wrapperStyle]} {...touchableProps}>
      <Text style={styles.badgeText} weight="medium">
        {text}
      </Text>
    </WrappedComponent>
  );
};

export default Badge;
