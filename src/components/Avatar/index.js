import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import Text from 'components/Text';
import styles from './styles';

const CustomAvatar = ({
  userName = null,
  userAvatar,
  showName = true,
  rounded = true,
  avatarSize = 'medium',
  onAvatarPress = null,
  containerStyle = {},
  avatarStyle = {},
}) => {
  const WrappedComponent = useMemo(() => (onAvatarPress ? TouchableOpacity : View), [
    onAvatarPress,
  ]);

  return (
    <WrappedComponent style={[styles.container, containerStyle]} onPress={onAvatarPress}>
      <Avatar
        size={avatarSize}
        containerStyle={avatarStyle}
        rounded={rounded}
        source={{ uri: userAvatar }}
        title={userName}
      />
      {userName && showName && (
        <Text weight="bold" style={styles.avatarName}>
          {userName}
        </Text>
      )}
    </WrappedComponent>
  );
};

export default CustomAvatar;
