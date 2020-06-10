import React, { useMemo } from 'react';
import { ScrollView, FlatList, View, Dimensions } from 'react-native';
import AppLayout from 'layouts/AppLayout';
import Section from 'components/Section';
import Badge from 'components/Badge';
import Card from 'components/Card';
import Avatar from 'components/Avatar';
import styles from './styles';

const cardWidth = ((Dimensions.get('window').width - 10 * 2 - 15) * 2) / 3;

const CoursesInSection = () => {
  const listPopulateSkills = useMemo(
    () => [
      { id: 1, name: 'Angular' },
      { id: 2, name: 'JavaScript' },
      { id: 3, name: 'C#' },
      { id: 4, name: 'Java' },
      { id: 5, name: 'ASP.Net' },
    ],
    [],
  );
  const listPaths = useMemo(() => {
    return [
      {
        id: 1,
        name: 'C# Unity Testing with xUnit',
        descriptions: ['3 courses'],
        image: 'https://miro.medium.com/max/1200/1*s-IsFnLLsH0hu782a4fBeA.jpeg',
      },
      {
        id: 2,
        name: 'Java Fundamental',
        descriptions: ['3 courses'],
        image: 'https://miro.medium.com/max/1200/1*s-IsFnLLsH0hu782a4fBeA.jpeg',
      },
      {
        id: 3,
        name: 'JavaScript Crash Course',
        descriptions: ['3 courses'],
        image: 'https://miro.medium.com/max/1200/1*s-IsFnLLsH0hu782a4fBeA.jpeg',
      },
      {
        id: 4,
        name: 'Deep dive to React Hooks',
        descriptions: ['3 courses'],
        image: 'https://miro.medium.com/max/1200/1*s-IsFnLLsH0hu782a4fBeA.jpeg',
      },
      {
        id: 5,
        name: 'NodeJS + React native + GraphQL - create a movie app',
        descriptions: ['3 courses'],
        image: 'https://miro.medium.com/max/1200/1*s-IsFnLLsH0hu782a4fBeA.jpeg',
      },
    ];
  }, []);

  const authors = useMemo(() => {
    return [
      {
        id: 1,
        authorName: 'Hieu Do',
        authorAvatar:
          'https://image.freepik.com/free-vector/businessman-character-' +
          'avatar-icon-vector-illustration-design_24877-18271.jpg',
      },
      {
        id: 2,
        authorName: 'Hieu Do',
        authorAvatar:
          'https://image.freepik.com/free-vector/businessman-character-' +
          'avatar-icon-vector-illustration-design_24877-18271.jpg',
      },
      {
        id: 3,
        authorName: 'Hieu Do',
        authorAvatar:
          'https://image.freepik.com/free-vector/businessman-character-' +
          'avatar-icon-vector-illustration-design_24877-18271.jpg',
      },
      {
        id: 4,
        authorName: 'Hieu Do',
        authorAvatar:
          'https://image.freepik.com/free-vector/businessman-character-' +
          'avatar-icon-vector-illustration-design_24877-18271.jpg',
      },
      {
        id: 5,
        authorName: 'Hieu Do',
        authorAvatar:
          'https://image.freepik.com/free-vector/businessman-character-' +
          'avatar-icon-vector-illustration-design_24877-18271.jpg',
      },
      {
        id: 6,
        authorName: 'Hieu Do',
        authorAvatar:
          'https://image.freepik.com/free-vector/businessman-character-' +
          'avatar-icon-vector-illustration-design_24877-18271.jpg',
      },
      {
        id: 7,
        authorName: 'Hieu Do',
        authorAvatar:
          'https://image.freepik.com/free-vector/businessman-character-' +
          'avatar-icon-vector-illustration-design_24877-18271.jpg',
      },
      {
        id: 8,
        authorName: 'Hieu Do',
        authorAvatar:
          'https://image.freepik.com/free-vector/businessman-character-' +
          'avatar-icon-vector-illustration-design_24877-18271.jpg',
      },
    ];
  }, []);

  return (
    <AppLayout>
      <View style={styles.container}>
        <ScrollView>
          {/* popular skills */}
          <Section sectionTitle="Popular Skills">
            <FlatList
              keyExtractor={(skill) => `${skill.id}`}
              data={listPopulateSkills}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Badge
                  id={item.id}
                  text={item.name}
                  wrapperStyle={{ marginRight: 10 }}
                  badgePress={() => {}}
                />
              )}
            />
          </Section>

          {/* path */}
          <Section sectionTitle="Paths" onSeeAllPress={() => {}}>
            <FlatList
              contentContainerStyle={{ padding: 5 }}
              data={listPaths}
              keyExtractor={(path) => `${path.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Card
                  width={cardWidth}
                  cardTitle={item.name}
                  cardDescriptions={item.descriptions}
                  cardImage={item.image}
                />
              )}
            />
          </Section>
          {/* top authors */}
          <Section sectionTitle="Authors" onSeeAllPress={() => {}}>
            <FlatList
              data={authors}
              keyExtractor={(path) => `${path.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Avatar
                  userName={item.authorName}
                  userAvatar={item.authorAvatar}
                  onAvatarPress={null}
                />
              )}
            />
          </Section>
        </ScrollView>
      </View>
    </AppLayout>
  );
};

export default CoursesInSection;
