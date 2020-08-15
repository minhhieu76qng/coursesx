import i18n from '../../i18n';

class MessageType {
  static Type = {
    SUCCESS: 'success',
    WARNING: 'warning',
    DANGER: 'danger',
    INFO: 'info',
    DEFAULT: 'default',
  };

  static titleFromType(type) {
    switch (type) {
      case MessageType.Type.SUCCESS:
        return `${i18n.t('notification:success')}!`;

      case MessageType.Type.DANGER:
        return `${i18n.t('notification:fail')}!`;
      default:
        return null;
    }
  }
}

export default MessageType;
