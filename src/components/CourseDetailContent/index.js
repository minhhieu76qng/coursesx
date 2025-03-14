import React, { useMemo, useContext, useCallback } from 'react';
import { View, SectionList, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Text from 'components/Text';
import Icon from 'themes/Icon';
import CourseDetailContext from 'views/App/CourseDetail/CourseDetailContext';
import { convertToTime } from 'utils/helpers';
import styles from './styles';

const CourseDetailContentItemHeader = ({
  headerItem: { name: sectionTitle, idx, sumHours = 0, data: lesson = [] },
}) => {
  const { colors } = useTheme();
  const learnedTimes = useMemo(() => {
    let times = 0;
    lesson.forEach((l) => {
      if (l.isFinish) {
        times += l.hours;
      }
    });
    return times;
  }, [lesson]);

  const learnedTimesPercent = useMemo(() => Number(learnedTimes / sumHours).toFixed(3) * 100, [
    learnedTimes,
    sumHours,
  ]);

  return (
    <View style={[styles.courseContentItemHeader]}>
      <View style={[styles.headerItemIdx, { backgroundColor: colors.card }]}>
        <View style={[styles.sectionProgress, { width: `${learnedTimesPercent}%` }]} />
        <Text>{idx}</Text>
      </View>
      <View style={styles.itemHeader}>
        <Text type="h4" size={18} numberOfLines={2}>
          {sectionTitle}
        </Text>
        <Text type="subbody" color={colors.textSecondary} style={styles.viewedTimesHeader}>
          {`${convertToTime(learnedTimes)} / ${convertToTime(sumHours)}`}
        </Text>
      </View>
    </View>
  );
};

const FooterItemSeparator = ({ show }) => {
  const { colors } = useTheme();
  if (!show) return null;
  return (
    <View
      style={[
        styles.separator,
        { borderBottomColor: colors.textSecondary, borderBottomWidth: 1, paddingTop: 10 },
      ]}
    />
  );
};

const SectionItem = ({
  item: { id, name: lessonName, hours: sumHours, isFinish = false },
  lessonPress,
}) => {
  const { colors } = useTheme();
  const onLessonPress = useCallback(() => {
    lessonPress(id);
  }, []);
  return (
    <TouchableOpacity style={styles.sectionItem} activeOpacity={0.65} onPress={onLessonPress}>
      <View style={styles.sectionItemTitle}>
        <Icon name="circle" size={8} color={isFinish ? '#44bd32' : '#1e272e'} />
        <Text style={{ paddingLeft: 20 }}>{lessonName}</Text>
      </View>
      {/* <Text>{item.viewedTimes}</Text> */}
      <Text type="subbody" color={colors.textSecondary}>
        {convertToTime(sumHours)}
      </Text>
    </TouchableOpacity>
  );
};

export default function CourseDetailContent() {
  const { courseData: { section: sections } = {}, selectLesson } =
    useContext(CourseDetailContext) || {};
  const formattedSections = useMemo(() => {
    let idx = 0;
    return (sections || []).map((st) => {
      const { lesson, ...tmpSection } = st;
      idx += 1;
      return {
        ...tmpSection,
        idx,
        data: lesson,
      };
    });
  }, [sections]);
  return (
    <SectionList
      contentContainerStyle={{ paddingVertical: 15 }}
      sections={formattedSections}
      renderSectionHeader={({ section }) => <CourseDetailContentItemHeader headerItem={section} />}
      renderSectionFooter={({ section }) => (
        <FooterItemSeparator show={section.idx !== sections.length} />
      )}
      keyExtractor={(item, index) => index}
      renderItem={({ item }) => <SectionItem item={item} lessonPress={selectLesson} />}
    />
  );
}
