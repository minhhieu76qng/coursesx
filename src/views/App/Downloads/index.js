import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import AppLayout from 'layouts/AppLayout';
import EmptyState from 'components/EmptyState';
import styles from './styles';

const Downloads = () => {
  const { colors } = useTheme();
  const { t } = useTranslation('download_tab');
  return (
    <AppLayout>
      <View style={styles.emptyStateContainer}>
        <EmptyState
          iconName="cloud-download"
          iconSize={100}
          iconColor={colors.textSecondary}
          title={t('empty_title')}
          description={t('empty')}
        />
      </View>
      {/* <View style={{ padding: 10 }}>
        <FlatList
          data={courses}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <CourseListItem
              courseData={item}
              onPress={() => navigation.navigate(screenName.courseDetail)}
            />
          )}
        />
      </View> */}
    </AppLayout>
  );
};

export default Downloads;
