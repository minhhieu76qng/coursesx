import React from 'react';
import { isString } from 'lodash';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '@react-navigation/native';
import Button from 'components/Button';
import Text from 'components/Text';
import styles from './styles';

const AppModal = ({
  title,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  children,
  isVisible,
  onBackdropPress,
  canBackdropPress,
}) => {
  const { colors } = useTheme();
  return (
    <Modal
      isVisible={isVisible}
      backdropColor="rgba(0,0,0,0.5)"
      backdropOpacity={1}
      onBackdropPress={canBackdropPress ? onBackdropPress : () => {}}
      style={styles.modalStyle}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationOutTiming={700}
    >
      <View style={[styles.contentWrapper, { backgroundColor: colors.card }]}>
        {isString(title) && (
          <View style={styles.title}>
            <Text type="h3">{title}</Text>
          </View>
        )}
        <View style={styles.content}>{children}</View>
        {(onCancel || onConfirm) && (
          <View style={styles.actionBox}>
            {onCancel && (
              <Button style={styles.buttonStyle} title={cancelLabel} onPress={onCancel} />
            )}
            {onConfirm && (
              <Button style={styles.buttonStyle} title={confirmLabel} onPress={onConfirm} />
            )}
          </View>
        )}
      </View>
    </Modal>
  );
};

AppModal.defaultProps = {
  title: null,
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm',
  onCancel: null,
  onConfirm: null,
  isVisible: false,
  onBackdropPress: () => {},
  canBackdropPress: true,
};

export default AppModal;
