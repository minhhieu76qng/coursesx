import React, { useMemo, useCallback } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
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

const SETTINGS_ID = {
  PROFILE: 'PROFILE',
  THEME: 'THEME',
  LANGUAGE: 'LANGUAGE',
  ABOUT: 'ABOUT',
  LOGOUT: 'LOGOUT',
};

const Settings = () => {
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

  const onListItemPress = useCallback((settingId) => {
    console.log('onListItemPress -> settingId', settingId);
  }, []);

  return (
    <AppLayout>
      <View style={styles.container}>
        <View style={styles.cardShadow}>
          <View style={[styles.card, styles.cardProfile, { backgroundColor: colors.card }]}>
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
        </View>
        <View style={styles.cardShadow}>
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            {/* settings */}
            {SETTINGS_MENU.map((item) => (
              <ListItem
                key={item.id}
                title={<Text>{item.title}</Text>}
                leftIcon={<Icon size={25} style={styles.listItemIcon} name={item.icon} />}
                // bottomDivider
                chevron
                onPress={() => onListItemPress(item.id)}
              />
            ))}
          </View>
        </View>
      </View>
    </AppLayout>
  );
};

export default Settings;
