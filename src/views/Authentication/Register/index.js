import React, { useCallback } from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Divider } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { Formik } from 'formik';
import Icon from 'themes/Icon';
import styles from 'views/Authentication/styles';
import AppLogo from 'components/AppLogo';
import screenName from 'constants/screenName';
import Text from 'components/Text';
import Input from 'components/Input';
import Button from 'components/Button';
import {
  yup,
  isPhoneNumber,
  isUsername,
  isEmail,
  isPassword,
  isConfirmPassword,
} from '../../../utils/validator';
import { REGISTER_ACCOUNT } from '../../../services/user/constants';
import { showFlashMessage } from '../../../services/inapp/actions';
import MessageType from '../../../services/inapp/MessageType';

const signUpSchema = yup.object().shape({
  username: isUsername(),
  email: isEmail(),
  phone: isPhoneNumber(),
  password: isPassword(),
  confirmPassword: isConfirmPassword(yup.ref('password')),
});

const Register = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const onSignInPress = useCallback(() => navigation.navigate(screenName.login), [navigation]);
  const onSignUpSubmit = useCallback((values) => {
    dispatch({
      type: REGISTER_ACCOUNT,
      payload: values,
      meta: {
        callback: () => {
          dispatch(
            showFlashMessage({
              type: MessageType.Type.SUCCESS,
              description: 'Đăng kí thành công! Có mail được gửi vào địa chỉ email của bạn.',
            }),
          );
          navigation.navigate(screenName.login);
        },
      },
    });
  });

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <AppLogo width={100} />
        </View>
        <View style={styles.form}>
          <Text type="h2" weight="medium" style={{ ...styles.screenTitle, color: colors.text }}>
            Sign Up
          </Text>
          <Formik
            initialValues={{
              username: '',
              email: '',
              phone: '',
              password: '',
              confirmPassword: '',
            }}
            // validateOnChange={false}
            // validateOnBlur={false}
            validationSchema={signUpSchema}
            onSubmit={onSignUpSubmit}
          >
            {({ handleChange, values, errors, handleSubmit }) => (
              <>
                {Object.values(errors).length > 0 && (
                  <Text style={styles.errorTextMessage}>{Object.values(errors)?.[0]}</Text>
                )}
                <Input
                  onChangeText={handleChange('username')}
                  value={values.username}
                  labelStyle={styles.inputLabelStyle}
                  label="Username"
                />
                <Input
                  onChangeText={handleChange('email')}
                  value={values.email}
                  labelStyle={styles.inputLabelStyle}
                  label="Email"
                />
                <Input
                  onChangeText={handleChange('phone')}
                  value={values.phone}
                  labelStyle={styles.inputLabelStyle}
                  label="Phone"
                />

                <Input
                  onChangeText={handleChange('password')}
                  value={values.password}
                  labelStyle={styles.inputLabelStyle}
                  secureTextEntry
                  label="Password"
                />
                <Input
                  onChangeText={handleChange('confirmPassword')}
                  value={values.confirmPassword}
                  labelStyle={styles.inputLabelStyle}
                  secureTextEntry
                  label="Confirm password"
                />

                <Button
                  title="Sign up"
                  disabled={Object.values(errors).length > 0}
                  titleStyle={styles.btnSubmitTitle}
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>

          <Divider style={{ ...styles.divider, backgroundColor: colors.text }} />

          <Button
            title="Sign in now"
            type="outline"
            titleStyle={styles.outlineTitle}
            buttonStyle={styles.btnOutline}
            icon={
              <Icon name="user-plus" size={18} color={colors.primary} style={{ marginRight: 20 }} />
            }
            onPress={onSignInPress}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
