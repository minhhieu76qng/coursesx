import React, { useMemo } from 'react';
import { useColorScheme } from 'react-native-appearance';
import { TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import Icon from 'themes/Icon';
import Colors from 'themes/colors';
import Text from 'components/Text';
import { Dark, Light } from 'themes/MyTheme';
import styles from './styles';

const Header = ({ paddingTop }) => {
  const route = useRoute();
  const scheme = useColorScheme();
  const themeMode = useMemo(() => (scheme === 'dark' ? Dark : Light), [scheme, Dark, Light]);
  return (
    <View style={{ ...styles.headerContainer, paddingTop, backgroundColor: themeMode.tabBar }}>
      {route && route.params?.backBtnVisibility === true && (
        <TouchableOpacity style={styles.backButton}>
          <Icon
            name="angle-left"
            size={40}
            color={Colors.blueSky}
            style={{ marginLeft: -5, marginTop: -2 }}
          />
        </TouchableOpacity>
      )}
      {route && route.name && (
        <Text type="h3" color={themeMode.text}>
          {route.name}
        </Text>
      )}
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
