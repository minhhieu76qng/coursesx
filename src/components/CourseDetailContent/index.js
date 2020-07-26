import React from 'react';
import { View, SectionList, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Text from 'components/Text';
import Icon from 'themes/Icon';
import styles from './styles';

const data = [
  {
    id: 1,
    key: 1,
    sectionTitle: 'Course Overview',
    viewedTimes: 10,
    data: [
      {
        title: 'Course Overview',
        duration: 92,
      },
    ],
  },
  {
    id: 2,
    key: 2,
    sectionTitle: 'Course Introduction',
    viewedTimes: 0,
    data: [
      {
        title: 'Getting Started',
        duration: 384,
      },
    ],
  },
  {
    id: 3,
    key: 3,
    sectionTitle: 'Keys Concept and Core Services',
    viewedTimes: 0,
    data: [
      {
        title: 'What we will cover?',
        duration: 87,
      },
      {
        title: 'Understand Identity and Access Management (IAM)',
        duration: 235,
      },
      {
        title: 'Configuring Additional IAM Best Practices',
        duration: 402,
      },
      {
        title: 'Configuring Additional IAM Best Practices',
        duration: 231,
      },
    ],
  },
];

const CourseDetailContentItemHeader = ({ headerItem: { sectionTitle, viewedTimes = 0, key } }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.courseContentItemHeader]}>
      <View style={[styles.headerItemIdx, { backgroundColor: colors.card }]}>
        <Text>{key}</Text>
      </View>
      <View style={styles.itemHeader}>
        <Text type="h4" size={18} numberOfLines={2}>
          {sectionTitle}
        </Text>
        <Text type="subbody" color={colors.textSecondary} style={styles.viewedTimesHeader}>
          {viewedTimes}
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

const SectionItem = ({ item }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={styles.sectionItem}
      activeOpacity={0.65}
      onPress={() => console.log('a')}
    >
      <View style={styles.sectionItemTitle}>
        <Icon name="circle" size={8} color={colors.card} />
        <Text style={{ paddingLeft: 20 }}>{item.title}</Text>
      </View>
      {/* <Text>{item.viewedTimes}</Text> */}
      <Text type="subbody" color={colors.textSecondary}>
        10:10
      </Text>
    </TouchableOpacity>
  );
};

export default function CourseDetailContent() {
  return (
    <SectionList
      contentContainerStyle={{ paddingVertical: 15 }}
      sections={data}
      renderSectionFooter={({ section }) => (
        <FooterItemSeparator show={section.key !== data.length} />
      )}
      keyExtractor={(item, index) => index}
      renderSectionHeader={({ section }) => <CourseDetailContentItemHeader headerItem={section} />}
      renderItem={({ item }) => <SectionItem item={item} />}
    />
  );
}
