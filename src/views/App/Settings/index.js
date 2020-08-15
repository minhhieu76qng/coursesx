import React, { useMemo, useCallback, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import AppLayout from 'layouts/AppLayout';
import { ListItem } from 'react-native-elements';
import Text from 'components/Text';
import Button from 'components/Button';
import Avatar from 'components/Avatar';
import Icon from 'themes/Icon';
import { getCurrentUser } from 'services/inapp/getters';

import styles from './styles';
import { LOGOUT } from '../../../services/user/constants';
import { SETTINGS_ID } from '../../../constants';
import SettingModal from './SettingModal';

const Settings = () => {
  const [modalType, setModalType] = useState(null);
  const dispatch = useDispatch();

  const { colors } = useTheme();
  const { t } = useTranslation('settings');

  const currentUser = useSelector(getCurrentUser);

  const SETTINGS_MENU = useMemo(() => {
    return [
      {
        id: SETTINGS_ID.PROFILE,
        title: t('update_profile'),
        icon: 'user',
      },
      {
        id: SETTINGS_ID.THEME,
        title: t('change_theme'),
        icon: 'adjust',
      },
      {
        id: SETTINGS_ID.LANGUAGE,
        title: t('change_language'),
        icon: 'language',
      },
      {
        id: SETTINGS_ID.ABOUT,
        title: t('about_us'),
        icon: 'info',
      },
      {
        id: SETTINGS_ID.LOGOUT,
        title: t('logout'),
        icon: 'sign-out',
      },
    ];
  }, [t]);

  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT,
    });
  }, [dispatch]);

  const onListItemPress = useCallback((settingId) => {
    switch (settingId) {
      case SETTINGS_ID.PROFILE:
        break;
      case SETTINGS_ID.THEME:
        setModalType(settingId);
        break;
      case SETTINGS_ID.LANGUAGE:
        setModalType(settingId);
        break;
      case SETTINGS_ID.ABOUT:
        break;
      case SETTINGS_ID.LOGOUT:
        onLogout();
        break;
      default:
        break;
    }
  }, []);

  const clearModalType = useCallback(() => {
    setModalType(null);
  }, []);

  return (
    <AppLayout>
      <ScrollView style={[styles.container, styles.cardShadow]}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          {currentUser && (
            <>
              <View style={styles.cardProfile}>
                <View>
                  <Avatar userAvatar={currentUser.avatar} avatarSize="large" showName={false} />
                  <Button
                    type="clear"
                    title="Change avatar"
                    titleStyle={styles.changeAvatarButtonText}
                  />
                </View>
                <View style={styles.profileBox}>
                  <Text style={styles.profileText} type="h3">
                    {currentUser.name || 'User'}
                  </Text>
                  <Text type="subbody-light" style={styles.profileText}>
                    {currentUser.email}
                  </Text>
                  <Text type="subbody-light" style={styles.profileText}>
                    {currentUser.phone}
                  </Text>
                </View>
              </View>

              <View style={[styles.settingsDivider, { backgroundColor: colors.border }]} />
            </>
          )}
          <View>
            {SETTINGS_MENU.map((item) => (
              <ListItem
                key={item.id}
                containerStyle={{ backgroundColor: colors.card }}
                title={<Text>{item.title}</Text>}
                leftIcon={<Icon size={25} style={styles.listItemIcon} name={item.icon} />}
                chevron
                onPress={() => onListItemPress(item.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      {modalType && <SettingModal modalType={modalType} clearModalType={clearModalType} />}
    </AppLayout>
  );
};

export default Settings;
