import React from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image } from 'react-native-elements';
import AppLayout from 'layouts/AppLayout';
import Text from 'components/Text';
import LogoLoadingIndicator from 'components/LogoLoadingIndicator';
import Badge from 'components/Badge';
import Avatar from 'components/Avatar';
import IconButton from 'components/IconButton';

import styles from './styles';
import CourseDetailContent from '../../../components/CourseDetailContent';

const CourseDetailTab = createMaterialTopTabNavigator();

const CourseDetail = () => {
  const videoHeight = Dimensions.get('window').height * 0.3 || 100;
  return (
    <AppLayout>
      <View>
        <Image
          style={{ width: '100%', height: videoHeight }}
          source={{
            uri:
              'https://d3gthpli891tsj.cloudfront.net/wp-content/' +
              'uploads/2019/01/22063215/GATE-Crash-Course.jpg',
          }}
          PlaceholderContent={<LogoLoadingIndicator logoWidth={130} indicatorSize="large" />}
        />
      </View>
      <ScrollView contentContainerStyle={styles.courseBody}>
        <Text type="h3" weight="medium" numberOfLines={2} style={styles.courseTitle}>
          Migrating Applications and Services to Azure with Visual Studio 2019
        </Text>
        <View style={styles.section}>
          <Badge onPress={() => {}} wrapperStyle={styles.authorBadge}>
            <Avatar avatarSize={20} containerStyle={styles.authorAvatar} />
            <Text type="subbody-light" color="#fff" numberOfLines={1}>
              Craig Shoemaker
            </Text>
          </Badge>
        </View>
        <View style={styles.section}>
          <Text type="description">Beginner - Jun 02 2020 - 3.9h</Text>
        </View>
        <View style={[styles.section, styles.iconsWrapper]}>
          <View style={styles.iconContainer}>
            <IconButton size={25} roundWidth={25} name="bookmark-o" />
            <Text style={styles.iconText} type="subbody" weight="medium">
              Bookmark
            </Text>
          </View>

          <View style={styles.iconContainer}>
            <IconButton size={25} roundWidth={25} name="arrow-circle-o-down" />
            <Text style={styles.iconText} type="subbody" weight="medium">
              Download
            </Text>
          </View>
        </View>
        <Text type="subbody">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry standard dummy text ever since the 1500s, when an unknown printer took a
          galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset
        </Text>
        <CourseDetailTab.Navigator style={{ marginTop: 15 }}>
          <CourseDetailTab.Screen name="Contents" component={CourseDetailContent} />
          <CourseDetailTab.Screen name="Transcript" component={View} />
        </CourseDetailTab.Navigator>
      </ScrollView>
    </AppLayout>
  );
};

export default CourseDetail;
