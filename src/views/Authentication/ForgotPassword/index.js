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
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { yup, isEmail } from 'utils/validator';
import UserRepo from 'services/user/repo';
import { showFlashMessage } from 'services/inapp/actions';
import MessageType from 'services/inapp/MessageType';

const forgotPasswordSchema = yup.object({
  email: isEmail(),
});

const ForgotPassword = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation(['authentication', 'notification']);

  const onForgotPasswordSubmit = useCallback(async (values) => {
    try {
      await UserRepo.requestForgotPasswordToEmail(values.email);
      dispatch(
        showFlashMessage({
          type: MessageType.Type.SUCCESS,
          description: t('notification:request_password_success'),
        }),
      );
      navigation.navigate(screenName.login);
    } catch (e) {
      dispatch(
        showFlashMessage({
          description: t('notification:request_password_fail'),
        }),
      );
    }
  }, []);

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
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={forgotPasswordSchema}
            onSubmit={onForgotPasswordSubmit}
          >
            {({ handleChange, values, errors, handleSubmit }) => (
              <>
                {Object.values(errors).length > 0 && (
                  <Text style={styles.errorTextMessage}>{Object.values(errors)?.[0]}</Text>
                )}
                <Input
                  value={values.email}
                  onChangeText={handleChange('email')}
                  labelStyle={styles.inputLabelStyle}
                  label="Email"
                />
                <Button
                  title={t('submit')}
                  titleStyle={styles.btnSubmitTitle}
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>

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
