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
        return 'Thành công!';

      case MessageType.Type.DANGER:
        return 'Có lỗi';
      default:
        return null;
    }
  }
}

export default MessageType;
