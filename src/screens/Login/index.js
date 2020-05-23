import React from 'react';
import { View } from 'react-native';
import { Text, Input, Button, Divider } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const Login = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View>
        <Text>Logo</Text>
      </View>
      <View style={styles.loginForm}>
        <Input
          labelStyle={styles.inputLabelStyle}
          inputStyle={{ color: colors.text }}
          label="Username"
        />
        <Input
          labelStyle={styles.inputLabelStyle}
          inputStyle={{ color: colors.text }}
          secureTextEntry
          label="Password"
        />
        <Button title="Sign in" titleStyle={styles.btnSubmitTitle} />

        <Divider style={{ ...styles.divider, backgroundColor: colors.text }} />

        <Button
          title="Forgot password?"
          type="outline"
          titleStyle={styles.outlineTitle}
          buttonStyle={styles.btnOutline}
          icon={<Icon name="key" size={18} color={colors.primary} style={{ marginRight: 20 }} />}
        />

        <Button
          title="Sign up for free"
          type="outline"
          titleStyle={styles.outlineTitle}
          buttonStyle={styles.btnOutline}
          icon={
            <Icon name="user-plus" size={18} color={colors.primary} style={{ marginRight: 20 }} />
          }
        />
      </View>
    </View>
  );
};

export default Login;
