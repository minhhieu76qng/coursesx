import React, { useCallback } from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Divider } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import Icon from 'themes/Icon';
import styles from 'screens/Authentication/styles';
import AppLogo from 'components/AppLogo';
import routesName from 'constants/routesName';
import Text from 'components/Text';
import Input from 'components/Input';
import Button from 'components/Button';

const Register = ({ navigation }) => {
  const { colors } = useTheme();
  const onSignInPress = useCallback(() => navigation.navigate(routesName.login), [navigation]);
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <AppLogo />
        </View>
        <View style={styles.form}>
          <Text type="h2" weight="medium" style={{ ...styles.screenTitle, color: colors.text }}>
            Sign Up
          </Text>
          <Input
            labelStyle={styles.inputLabelStyle}
            inputStyle={{ color: colors.text }}
            label="Username"
          />
          <Input
            labelStyle={styles.inputLabelStyle}
            inputStyle={{ color: colors.text }}
            label="Email"
          />
          <Input
            labelStyle={styles.inputLabelStyle}
            inputStyle={{ color: colors.text }}
            secureTextEntry
            label="Password"
          />
          <Input
            labelStyle={styles.inputLabelStyle}
            inputStyle={{ color: colors.text }}
            secureTextEntry
            label="Confirm password"
          />
          <Button title="Sign up" titleStyle={styles.btnSubmitTitle} />

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
