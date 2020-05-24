import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import Icon from 'themes/Icon';
import styles from 'screens/Authentication/styles';
import AppLogo from 'components/AppLogo';
import routesName from 'constants/routesName';
import Text from 'components/Text';
import Input from 'components/Input';
import Button from 'components/Button';

const Login = ({ navigation }) => {
  const { colors } = useTheme();

  const onForgotPasswordPress = useCallback(() => navigation.navigate(routesName.forgotPassword), [
    navigation,
  ]);

  const onSignUpPress = useCallback(() => navigation.navigate(routesName.register), [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <AppLogo />
      </View>
      <View style={styles.form}>
        <Text type="h2" weight="medium" style={styles.screenTitle}>
          Log In
        </Text>
        <Input labelStyle={styles.inputLabelStyle} label="Username" />
        <Input labelStyle={styles.inputLabelStyle} secureTextEntry label="Password" />
        <Button title="Sign in" titleStyle={styles.btnSubmitTitle} />

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
    </View>
  );
};

export default Login;
