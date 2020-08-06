import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
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
import Button from 'components/Button';
import { yup, isPassword, isEmail } from '../../../utils/validator';
import { LOGIN_ACCOUNT } from '../../../services/user/constants';

const loginSchema = yup.object({
  email: isEmail(),
  password: isPassword(),
});

const Login = ({ navigation }) => {
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
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <AppLogo />
      </View>
      <View style={styles.form}>
        <Text type="h2" weight="medium" style={styles.screenTitle}>
          Log In
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
                label="Email"
                onChangeText={handleChange('email')}
                value={values.email}
              />
              <Input
                labelStyle={styles.inputLabelStyle}
                secureTextEntry
                label="Password"
                onChangeText={handleChange('password')}
                value={values.password}
              />
              <Button title="Sign in" titleStyle={styles.btnSubmitTitle} onPress={handleSubmit} />
            </>
          )}
        </Formik>
        <Divider style={{ ...styles.divider, backgroundColor: colors.text }} />

        <Button
          title="Forgot password?"
          type="outline"
          titleStyle={styles.outlineTitle}
          buttonStyle={styles.btnOutline}
          icon={<Icon name="key" size={18} color={colors.primary} style={{ marginRight: 20 }} />}
          onPress={onForgotPasswordPress}
        />
        <Button
          title="Sign up for free"
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
  );
};

export default Login;
