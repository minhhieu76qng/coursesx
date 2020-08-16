import React, { useCallback } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import Text from 'components/Text';
import Input from 'components/Input';
import Rating from 'components/Rating';
import Button from 'components/Button';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { yup } from '../../utils/validator';

import styles from './styles';

const ratingSchema = yup.object({
  stars: yup.number().min(1).max(5).required(),
  comment: yup.string().trim().min(1).max(200).required(),
});

const RatingBox = () => {
  const { t } = useTranslation('course_detail');

  const onRatingSubmit = useCallback((values) => {
    console.log('onRatingSubmit -> values', values);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Formik
        initialValues={{
          stars: 0,
          comment: '',
        }}
        validationSchema={ratingSchema}
        onSubmit={onRatingSubmit}
      >
        {({ values, errors, dirty, handleChange, handleSubmit }) => (
          <>
            {dirty && Object.values(errors).length > 0 && (
              <Text style={styles.errorTextMessage}>{Object.values(errors)?.[0]}</Text>
            )}
            <View style={styles.ratingContainer}>
              <Text>{`${t('your_rated_stars')} :`}</Text>
              <Rating style={styles.ratingBox} ratedStars={values.stars} />
            </View>

            <Input
              style={styles.commentBox}
              placeholder={t('your_comment')}
              onChangeText={handleChange('comment')}
              value={values.comment}
            />

            <Button
              disabled={!dirty || errors}
              title={t('rate')}
              titleStyle={styles.btnSubmitTitle}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default RatingBox;
