import React from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Text, Input, Button, Divider } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const Register = () => {
  const { colors } = useTheme();
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Text>Logo</Text>
        </View>
        <View style={styles.form}>
          <Text h3 style={{ ...styles.screenTitle, color: colors.text }}>
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
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
