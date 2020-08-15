import React, { useCallback, useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme, useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import Text from 'components/Text';
import Button from 'components/Button';
import Input from 'components/Input';
import AppLayout from 'layouts/AppLayout';
import { yup, isFullname, isPhoneNumber } from 'utils/validator';
import { getCurrentUser } from 'services/inapp/getters';
import { showFlashMessage } from 'services/inapp/actions';
import MessageType from 'services/inapp/MessageType';
import { UPDATE_USER_INFORMATION } from 'services/user/constants';
import { screenName } from 'constants';

import styles from './styles';

const updateProfileSchema = yup.object({
  name: isFullname(),
  phone: isPhoneNumber(),
  avatar: yup.string().required().url(),
});

const UpdateProfile = () => {
  const { t } = useTranslation(['authentication', 'settings']);
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const currentUser = useSelector(getCurrentUser);

  const onUpdateProfileSubmit = useCallback(async (values) => {
    try {
      dispatch({
        type: UPDATE_USER_INFORMATION,
        payload: values,
        meta: {
          afterSuccess: () => {
            dispatch(
              showFlashMessage({
                type: MessageType.Type.SUCCESS,
                description: t('update_profile_success'),
              }),
            );
            navigation.navigate(screenName.settings);
          },
          afterFail: () => {
            dispatch(
              showFlashMessage({
                type: MessageType.Type.SUCCESS,
                description: t('update_profile_fail'),
              }),
            );
          },
        },
      });
    } catch (e) {
      dispatch(
        showFlashMessage({
          description: t('update_profile_fail'),
        }),
      );
    }
  }, []);

  const isUpdateAvatar = useMemo(() => route?.params?.isUpdateAvatar, [route]);

  return (
    <AppLayout>
      <ScrollView style={[styles.container, styles.cardShadow]}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text type="h2" weight="medium" style={styles.updateProfileTitle}>
            {t('settings:update_profile')}
          </Text>
          <Formik
            initialValues={{
              name: currentUser.name,
              phone: currentUser.phone,
              avatar: currentUser.avatar,
            }}
            validationSchema={updateProfileSchema}
            onSubmit={onUpdateProfileSubmit}
          >
            {({ values, errors, handleChange, handleSubmit }) => (
              <>
                {Object.values(errors).length > 0 && (
                  <Text style={styles.errorTextMessage}>{Object.values(errors)?.[0]}</Text>
                )}
                <Input
                  onChangeText={handleChange('name')}
                  value={values.name}
                  labelStyle={styles.inputLabelStyle}
                  label={t('fullname')}
                  style={[isUpdateAvatar ? styles.hideInput : {}]}
                />
                <Input
                  onChangeText={handleChange('phone')}
                  value={values.phone}
                  labelStyle={styles.inputLabelStyle}
                  label={t('phone')}
                  style={[isUpdateAvatar ? styles.hideInput : {}]}
                />
                <Input
                  onChangeText={handleChange('avatar')}
                  value={values.avatar}
                  labelStyle={styles.inputLabelStyle}
                  label={t('avatar')}
                  style={[!isUpdateAvatar ? styles.hideInput : {}]}
                />
                <Button
                  title={t('submit')}
                  titleStyle={styles.btnSubmitTitle}
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </AppLayout>
  );
};

export default UpdateProfile;
