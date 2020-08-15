import React, { useCallback } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { Divider } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Icon from 'themes/Icon';
import styles from 'views/Authentication/styles';
import AppLogo from 'components/AppLogo';
import screenName from 'constants/screenName';
import Text from 'components/Text';
import Input from 'components/Input';
import Button from 'components/Button';

const ForgotPassword = ({ navigation }) => {
  const { colors } = useTheme();
  const { t } = useTranslation('authentication');
  const onSignInPress = useCallback(() => navigation.navigate(screenName.login), [navigation]);
  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <AppLogo />
        </View>
        <View style={styles.form}>
          <Text type="h2" weight="medium" style={styles.screenTitle}>
            {t('forgot_password')}
          </Text>
          <Input labelStyle={styles.inputLabelStyle} label="Email" />
          <Button title={t('submit')} titleStyle={styles.btnSubmitTitle} />

          <Divider style={[styles.divider, { backgroundColor: colors.text }]} />

          <Button
            title={t('sign_in_now')}
            type="outline"
            titleStyle={styles.outlineTitle}
            buttonStyle={styles.btnOutline}
            icon={
              <Icon name="user-plus" size={18} color={colors.primary} style={{ marginRight: 20 }} />
            }
            onPress={onSignInPress}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
