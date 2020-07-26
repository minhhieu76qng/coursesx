import React from 'react';
import { connect } from 'react-redux';
import FlashMessageComp, { showMessage } from 'react-native-flash-message';
import { getFlashMessage } from '../../services/inapp/getters';
import { removeFlashMessage } from '../../services/inapp/actions';

class FlashMessage extends React.Component {
  // shouldComponentUpdate(nextProps) {
  //   if (
  //     this.props?.flashMessage?.type !== nextProps.flashMessage?.type &&
  //     nextProps.flashMessage?.type !== null
  //   ) {
  //     return true;
  //   }
  //   return false;
  // }

  componentDidUpdate(prevProps) {
    if (
      this.props?.flashMessage?.type !== null &&
      prevProps?.flashMessage?.type !== this.props?.flashMessage?.type
    ) {
      console.log(
        'FlashMessage -> componentDidUpdate -> this.props?.flashMessage',
        this.props?.flashMessage,
      );
      showMessage(this.props?.flashMessage);
      setTimeout(() => {
        const { dispatch } = this.props;
        dispatch(removeFlashMessage());
      }, 2000);
    }
  }

  render() {
    return <FlashMessageComp position="top" />;
  }
}

const mapStateToProps = (state) => {
  const flashMessage = getFlashMessage(state);
  return {
    flashMessage,
  };
};

export default connect(mapStateToProps)(FlashMessage);
