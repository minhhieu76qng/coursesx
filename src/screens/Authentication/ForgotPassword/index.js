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

const VerifyAccount = ({ navigation }) => {
  const { colors } = useTheme();
  const onSignInPress = useCallback(() => navigation.navigate(routesName.login), [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <AppLogo />
      </View>
      <View style={styles.form}>
        <Text type="h2" weight="medium" style={{ ...styles.screenTitle, color: colors.text }}>
          Forgot Password
        </Text>
        <Input
          labelStyle={styles.inputLabelStyle}
          inputStyle={{ color: colors.text }}
          label="Email"
        />
        <Button title="Submit" titleStyle={styles.btnSubmitTitle} />

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
    </View>
  );
};

export default VerifyAccount;
