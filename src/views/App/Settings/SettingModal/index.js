import React, { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import AppModal from 'components/AppModal';
import { themeMode, SETTINGS_ID } from 'constants';
import CheckBoxList from 'components/CheckBoxList';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../../../services/inapp/actions';
import { getThemeMode } from '../../../../services/inapp/getters';
import { LANGUAGE_ID } from '../../../../constants';

const Select = ({ type = null, onSelect = () => {} }) => {
  const { t, i18n } = useTranslation('settings');
  const currentTheme = useSelector(getThemeMode);

  const { list, checked } = useMemo(() => {
    let listData = [];
    let selecting = null;
    switch (type) {
      case SETTINGS_ID.THEME:
        listData = [
          {
            id: themeMode.dark,
            title: t('dark_mode'),
          },
          {
            id: themeMode.light,
            title: t('light_mode'),
          },
        ];
        selecting = currentTheme;
        break;
      case SETTINGS_ID.LANGUAGE:
        listData = [
          {
            id: LANGUAGE_ID.VI,
            title: t('vietnamese'),
          },
          {
            id: LANGUAGE_ID.EN,
            title: t('english'),
          },
        ];
        selecting = i18n.language;
        break;
      default:
        break;
    }
    return {
      list: listData,
      checked: selecting,
    };
  }, []);
  return <CheckBoxList list={list} selectingId={checked} onChange={onSelect} />;
};

export default function SettingModal({ modalType, clearModalType = () => {} }) {
  const [isModalVisible, setModalVisible] = useState(true);
  const [selectedData, setSelectedData] = useState();
  const { t } = useTranslation('settings');
  const dispatch = useDispatch();

  const onDataChange = useCallback((data) => {
    setSelectedData(data);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const onModalHide = useCallback(() => {
    setTimeout(() => {
      clearModalType();
    }, 200);
  }, []);

  const ModalData = useMemo(() => {
    // let modalData = {
    //   title: null,
    //   children: null
    // }
    let result = null;
    switch (modalType) {
      case SETTINGS_ID.THEME:
        result = {
          title: t('change_theme'),
          children: () => <Select type={modalType} onSelect={onDataChange} />,
        };
        break;
      case SETTINGS_ID.LANGUAGE:
        result = {
          title: t('change_language'),
          children: () => <Select type={modalType} onSelect={onDataChange} />,
        };
        break;
      default:
        break;
    }
    return result;
  }, [modalType]);

  const ModalChildren = useMemo(() => {
    return ModalData?.children;
  }, [ModalData]);

  const onConfirmModal = useCallback(() => {
    switch (modalType) {
      case SETTINGS_ID.THEME:
        dispatch(changeTheme(selectedData));
        closeModal();
        break;
      default:
        break;
    }
  }, [dispatch, closeModal, modalType, selectedData]);

  return (
    <AppModal
      isVisible={isModalVisible}
      onBackdropPress={closeModal}
      onModalHide={onModalHide}
      onCancel={closeModal}
      onConfirm={onConfirmModal}
      cancelLabel={t('cancel_modal')}
      confirmLabel={t('confirm_modal')}
      title={ModalData?.title}
    >
      <ModalChildren />
    </AppModal>
  );
}
