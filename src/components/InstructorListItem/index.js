import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Avatar from 'components/Avatar';
import { useTranslation } from 'react-i18next';
import Text from 'components/Text';

const styles = StyleSheet.create({
  instructorItemContainer: {
    minHeight: 70,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: '#dadada',
    borderBottomWidth: 0.4,
    paddingVertical: 10,
    overflow: 'visible',
  },
  instructorDetail: {
    flex: 1,
    marginLeft: 10,
  },
  instructorDetailSection: {
    marginTop: 7,
  },
});

const InstructorListItem = ({ instructor, onPress }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.instructorItemContainer, { backgroundColor: colors.card }]}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Avatar userAvatar={instructor.avatar} />
      <View style={styles.instructorDetail}>
        <Text>{instructor.name}</Text>
        {instructor.numcourses >= 0 && (
          <Text type="description" style={styles.instructorDetailSection}>
            {`${t('total_instructor_courses')}: `}
            <Text type="description" weight="bold">
              {instructor.numcourses}
            </Text>
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default InstructorListItem;
