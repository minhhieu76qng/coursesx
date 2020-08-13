import React, { useMemo, useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useRoute, useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Avatar } from 'react-native-elements';
import _, { isString } from 'lodash';
import { LOGOUT } from 'services/user/constants';
import Icon from 'themes/Icon';
import Colors from 'themes/colors';
import Text from 'components/Text';
import styles from './styles';

const Header = ({ paddingTop }) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const header = useMemo(() => {
    return _.get(route, 'params.header');
  }, [route]);

  const navigation = useNavigation();

  const { colors } = useTheme();

  const onUserAvatarPress = useCallback(() => {
    dispatch({
      type: LOGOUT,
    });
  }, []);

  return (
    <View
      style={{
        ...styles.headerContainer,
        paddingTop,
        backgroundColor: colors.tabBar,
      }}
    >
      {header && header?.backBtnVisibility === true && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
        >
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
