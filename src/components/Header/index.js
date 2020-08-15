import React, { useMemo, useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useRoute, useTheme, useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import _, { isString } from 'lodash';
import Icon from 'themes/Icon';
import Colors from 'themes/colors';
import Text from 'components/Text';
import screenName from 'constants/screenName';
import styles from './styles';

const Header = ({ paddingTop }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const header = useMemo(() => {
    return _.get(route, 'params.header');
  }, [route]);

  const onUserAvatarPress = useCallback(() => {
    navigation.navigate(screenName.settings);
  }, [navigation]);

  const onBackButtonPress = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  return (
    <View
      style={{
        ...styles.headerContainer,
        paddingTop,
        backgroundColor: colors.tabBar,
      }}
    >
      {header && header?.backBtnVisibility === true && (
        <TouchableOpacity style={styles.backButton} onPress={onBackButtonPress}>
          <Icon
            name="angle-left"
            size={40}
            color={Colors.blueSky}
            style={{ marginLeft: -5, marginTop: -2 }}
          />
        </TouchableOpacity>
      )}
      {header && isString(header?.headerTitle) && <Text type="h3">{header?.headerTitle}</Text>}
      <View style={styles.rightWidgets}>
        <TouchableOpacity onPress={onUserAvatarPress}>
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
