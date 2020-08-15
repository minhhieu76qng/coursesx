import React, { useCallback, useState, useEffect } from 'react';
import { ScrollView, FlatList, View, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme, useNavigation } from '@react-navigation/native';
import { isArray } from 'lodash';
import { useTranslation } from 'react-i18next';
import { SEARCH_TAB } from 'constants';
import CourseListItem from 'components/CourseListItem';
import EmptyState from 'components/EmptyState';
import InstructorListItem from 'components/InstructorListItem';

import styles from './styles';
import { screenName } from '../../../../constants';

const LAZY_LOAD_TIMEOUT = 600;

const SearchList = ({ data, loading, type }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { t } = useTranslation('search_tab');
  const [virtualLoading, setVirtualLoading] = useState(true);

  const onCourseItemPress = useCallback((courseId) => {
    navigation.navigate(screenName.courseDetail, { courseId });
  });

  const onInstructorPress = useCallback((courseId) => {
    console.log('onInstructorPress -> courseId', courseId);
  });

  const renderListItem = useCallback(({ item }) => {
    if (item.itemType === SEARCH_TAB.COURSES) {
      return <CourseListItem course={item} onPress={() => onCourseItemPress(item.id)} />;
    }

    if (item.itemType === SEARCH_TAB.INSTRUCTORS) {
      return <InstructorListItem instructor={item} onPress={() => onInstructorPress(item.id)} />;
    }
    return null;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setVirtualLoading(loading);
    }, LAZY_LOAD_TIMEOUT);
  }, [loading, setVirtualLoading]);

  if (!loading && (!isArray(data) || data.length === 0)) {
    let emptyStateObject = {
      iconName: null,
      title: '',
    };

    switch (type) {
      case SEARCH_TAB.COURSES:
        emptyStateObject = {
          ...emptyStateObject,
          iconName: 'film',
          title: t('no_course'),
        };
        break;
      case SEARCH_TAB.INSTRUCTORS:
        emptyStateObject = {
          ...emptyStateObject,
          iconName: 'user',
          title: t('no_instructors'),
        };
        break;
      case SEARCH_TAB.ALL:
        emptyStateObject = {
          ...emptyStateObject,
          iconName: 'list-alt',
          title: t('no_all'),
        };
      // eslint-disable-next-line no-fallthrough
      default:
        break;
    }
    return (
      <View style={styles.loadingContainer}>
        <EmptyState
          iconSize={100}
          iconColor={colors.textSecondary}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...emptyStateObject}
        />
      </View>
    );
  }

  return (
    <>
      <ScrollView>{data && <FlatList data={data} renderItem={renderListItem} />}</ScrollView>
      <Animatable.View
        animation="fadeInUp"
        duration={300}
        style={[
          styles.loadingContainer,
          styles.absoluteLoading,
          { backgroundColor: colors.background },
          !virtualLoading && styles.noneLoading,
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </Animatable.View>
    </>
  );
};

export default SearchList;
