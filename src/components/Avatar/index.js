import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import Text from 'components/Text';
import styles from './styles';

const CustomAvatar = ({ userName = '', userAvatar, avatarSize = 'medium', onAvatarPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onAvatarPress}>
      <Avatar size={avatarSize} rounded source={{ uri: userAvatar }} title={userName} />
      {userName && (
        <Text weight="bold" style={styles.avatarName}>
          {userName}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomAvatar;
