import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useRoute, useTheme } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import Icon from 'themes/Icon';
import Colors from 'themes/colors';
import Text from 'components/Text';
import styles from './styles';

const Header = ({ paddingTop }) => {
  const {
    params: { header },
  } = useRoute();
  const { colors } = useTheme();
  return (
    <View
      style={{
        ...styles.headerContainer,
        paddingTop,
        backgroundColor: colors.tabBar,
      }}
    >
      {header && header?.backBtnVisibility === true && (
        <TouchableOpacity style={styles.backButton}>
          <Icon
            name="angle-left"
            size={40}
            color={Colors.blueSky}
            style={{ marginLeft: -5, marginTop: -2 }}
          />
        </TouchableOpacity>
      )}
      {header && header?.headerTitle && <Text type="h3">{header?.headerTitle}</Text>}
      <View style={styles.rightWidgets}>
        <TouchableOpacity>
          <Avatar
            containerStyle={{ backgroundColor: 'red' }}
            rounded
            title="MD"
            size="small"
            titleStyle={styles.avatarTitle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
