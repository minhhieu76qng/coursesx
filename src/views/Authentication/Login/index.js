import React, { useCallback } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Divider } from 'react-native-elements';
import { Formik } from 'formik';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Icon from 'themes/Icon';
import styles from 'views/Authentication/styles';
import AppLogo from 'components/AppLogo';
import screenName from 'constants/screenName';
import Text from 'components/Text';
import Input from 'components/Input';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button';
import { yup, isPassword, isEmail } from 'utils/validator';
import { LOGIN_ACCOUNT } from 'services/user/constants';

const loginSchema = yup.object({
  email: isEmail(),
  password: isPassword(),
});

const Login = ({ navigation }) => {
  const { t } = useTranslation('authentication');
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const onForgotPasswordPress = useCallback(() => navigation.navigate(screenName.forgotPassword), [
    navigation,
  ]);

  const onSignUpPress = useCallback(() => navigation.navigate(screenName.register), [navigation]);

  const onLoginSubmit = useCallback((values) => {
    dispatch({
      type: LOGIN_ACCOUNT,
      payload: values,
      meta: {
        callback: () => {
          navigation.navigate(screenName.mainTab);
        },
      },
    });
  });

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container}>
        <View style={styles.logoContainer}>
          <AppLogo />
        </View>
        <View style={styles.form}>
          <Text type="h2" weight="medium" style={styles.screenTitle}>
            {t('login')}
          </Text>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginSchema}
            onSubmit={onLoginSubmit}
          >
            {({ handleChange, values, errors, handleSubmit }) => (
              <>
                {Object.values(errors).length > 0 && (
                  <Text style={styles.errorTextMessage}>{Object.values(errors)?.[0]}</Text>
                )}
                <Input
                  labelStyle={styles.inputLabelStyle}
                  label={t('email')}
                  onChangeText={handleChange('email')}
                  value={values.email}
                />
                <Input
                  labelStyle={styles.inputLabelStyle}
                  secureTextEntry
                  label={t('password')}
                  onChangeText={handleChange('password')}
                  value={values.password}
                />
                <Button
                  title={t('sign_in')}
                  titleStyle={styles.btnSubmitTitle}
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>
          <Divider style={{ ...styles.divider, backgroundColor: colors.text }} />

          <Button
            title={`${t('forgot_password')}?`}
            type="outline"
            titleStyle={styles.outlineTitle}
            buttonStyle={styles.btnOutline}
            icon={<Icon name="key" size={18} color={colors.primary} style={{ marginRight: 20 }} />}
            onPress={onForgotPasswordPress}
          />
          <Button
            title={t('sign_up_free')}
            type="outline"
            titleStyle={styles.outlineTitle}
            buttonStyle={styles.btnOutline}
            icon={
              <Icon name="user-plus" size={18} color={colors.primary} style={{ marginRight: 20 }} />
            }
            onPress={onSignUpPress}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
