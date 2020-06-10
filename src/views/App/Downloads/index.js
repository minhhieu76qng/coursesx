import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
// import { useTheme } from '@react-navigation/native';
import AppLayout from 'layouts/AppLayout';
// import EmptyState from 'components/EmptyState';
// import styles from './styles';
import screenName from 'constants/screenName';
import CourseListItem from 'components/CourseListItem';

const Downloads = ({ navigation }) => {
  // const { colors } = useTheme();

  const courses = useMemo(() => {
    return [
      {
        id: 1,
        courseName: 'Migrating Applications and Services to Azure with Visual Studio 2019',
        courseImage: 'https://miro.medium.com/max/1200/1*s-IsFnLLsH0hu782a4fBeA.jpeg',
        author: 'Scott Allen',
        level: 'Beginner',
        publishDate: 'Jun 2019',
        duration: '6h 5m',
      },
      {
        id: 2,
        courseName: 'Migrating Applications and Services to Azure with Visual Studio 2019',
        courseImage: 'https://miro.medium.com/max/1200/1*s-IsFnLLsH0hu782a4fBeA.jpeg',
        author: 'Scott Allen',
        level: 'Beginner',
        publishDate: 'Jun 2019',
        duration: '6h 5m',
      },
      {
        id: 3,
        courseName: 'Migrating Applications and Services to Azure with Visual Studio 2019',
        courseImage: 'https://miro.medium.com/max/1200/1*s-IsFnLLsH0hu782a4fBeA.jpeg',
        author: 'Scott Allen',
        level: 'Beginner',
        publishDate: 'Jun 2019',
        duration: '6h 5m',
      },
      {
        id: 4,
        courseName: 'Migrating Applications and Services to Azure with Visual Studio 2019',
        courseImage: 'https://miro.medium.com/max/1200/1*s-IsFnLLsH0hu782a4fBeA.jpeg',
        author: 'Scott Allen',
        level: 'Beginner',
        publishDate: 'Jun 2019',
        duration: '6h 5m',
      },
      {
        id: 5,
        courseName: 'Migrating Applications and Services to Azure with Visual Studio 2019',
        courseImage: 'https://miro.medium.com/max/1200/1*s-IsFnLLsH0hu782a4fBeA.jpeg',
        author: 'Scott Allen',
        level: 'Beginner',
        publishDate: 'Jun 2019',
        duration: '6h 5m',
      },
    ];
  });
  return (
    <AppLayout>
      {/* <View style={styles.emptyStateContainer}>
        <EmptyState
          iconName="arrow-circle-o-down"
          iconSize={100}
          iconColor={colors.textSecondary}
          title="No downloads"
          description="Courses you download will appear here."
        />

      </View> */}
      <View style={{ padding: 10 }}>
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
      </View>
    </AppLayout>
  );
};

export default Downloads;
