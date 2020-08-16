import React, { useCallback, useRef } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import Text from 'components/Text';
import Input from 'components/Input';
import Rating from 'components/Rating';
import Button from 'components/Button';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { yup } from '../../utils/validator';

import styles from './styles';
import { showFlashMessage } from '../../services/inapp/actions';
import MessageType from '../../services/inapp/MessageType';
import CourseRepo from '../../services/courses/repo';

const ratingSchema = yup.object({
  stars: yup.number().min(1).max(5).required(),
  comment: yup.string().trim().min(1).max(200).required(),
});

const RatingBox = ({ courseId, onRated = () => {} }) => {
  const { t } = useTranslation(['course_detail', 'notification']);
  const dispatch = useDispatch();
  const commentRef = useRef(null);

  const onRatingSubmit = useCallback(
    (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);
      CourseRepo.rateCourse({
        courseId,
        stars: values.stars,
        comment: values.comment,
      })
        .then((ratedData) => {
          onRated(ratedData);

          dispatch(
            showFlashMessage({
              type: MessageType.Type.SUCCESS,
              description: t('notification:rate_course_success'),
            }),
          );
        })
        .catch(() => {
          dispatch(
            showFlashMessage({
              description: t('notification:rate_course_fail'),
            }),
          );
        })
        .finally(() => {
          resetForm();
          if (commentRef.current) {
            commentRef.current.clear();
          }
        });
    },
    [dispatch, onRated],
  );

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
        {({ values, errors, dirty, isSubmitting, handleChange, handleSubmit, setFieldValue }) => (
          <>
            {dirty && Object.values(errors).length > 0 && (
              <Text style={styles.errorTextMessage}>{Object.values(errors)?.[0]}</Text>
            )}
            <View style={styles.ratingContainer}>
              <Text>{`${t('your_rated_stars')} :`}</Text>
              <Rating
                style={styles.ratingBox}
                ratedStars={values.stars}
                onChange={(stars) => setFieldValue('stars', stars)}
              />
            </View>

            <Input
              ref={commentRef}
              style={styles.commentBox}
              placeholder={t('your_comment')}
              onChangeText={handleChange('comment')}
              value={values.comment}
              defaultValue={values.comment}
            />

            <Button
              disabled={!dirty || Object.values(errors).length > 0 || isSubmitting}
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
