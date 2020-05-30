import React, { useMemo } from 'react';
import { ScrollView, FlatList, View } from 'react-native';
import CategoryItem from 'components/CategoryItem';
import AppLayout from 'layouts/AppLayout';
import Section from 'components/Section';
import Badge from 'components/Badge';
import styles from './styles';
// import Card from '../../../components/Card';

const Browse = () => {
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
  return (
    <AppLayout>
      <View style={styles.container}>
        <ScrollView>
          {/* new release */}
          <CategoryItem
            title="NEW RELEASES"
            background={
              'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9Gc' +
              'RpTe7c65J8-ZEX5hrp7j6JG38tNnIEqJ_mvAeYe-Gu14JNy7pg&usqp=CAU'
            }
          />
          {/* recommend for you */}
          <CategoryItem
            style={{ marginTop: 10 }}
            title="RECOMMEND FOR YOU"
            background="https://miro.medium.com/max/1024/1*PfumnOVjrV3BFXsEIg2LTg.png"
          />
          {/* scrollview list of categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
            <View style={styles.categoryItemContainer}>
              <CategoryItem
                title="Software Development"
                background="https://miro.medium.com/max/2560/1*Rc3ff_4T_ZeAPGiU9ai9nw.png"
              />
              <CategoryItem
                style={styles.category2ndItem}
                title="IT Ops"
                background="https://miro.medium.com/max/2700/0*Wz93rPzLLTq1VwVW"
              />
            </View>
            <View style={styles.categoryItemContainer}>
              <CategoryItem
                title="Data Professional"
                background="https://miro.medium.com/max/1200/1*0wCRD_rBsvtksdVc69NZog.png"
              />
              <CategoryItem
                style={styles.category2ndItem}
                title="Business Professional"
                background="https://miro.medium.com/max/5760/1*CdmOkpEVHZ8TXA9tvtlvXA@2x.png"
              />
            </View>
            <View style={styles.categoryItemContainer}>
              <CategoryItem
                title="Creative Professional"
                background="https://miro.medium.com/max/1024/1*PfumnOVjrV3BFXsEIg2LTg.png"
              />
              <CategoryItem
                style={styles.category2ndItem}
                title="Certifications"
                background="https://miro.medium.com/max/1024/1*PfumnOVjrV3BFXsEIg2LTg.png"
              />
            </View>
          </ScrollView>

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
          {/* <Section sectionTitle="Paths" onSeeAllPress={() => {}}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {listPopulateSkills &&
                listPopulateSkills.map((skill) => (
                  <Badge
                    key={skill.id}
                    id={skill.id}
                    text={skill.name}
                    wrapperStyle={{ marginRight: 10 }}
                    badgePress={() => {}}
                  />
                ))}
            </ScrollView>
          </Section> */}
          {/* top authors */}

          {/* <Card /> */}
        </ScrollView>
      </View>
    </AppLayout>
  );
};

export default Browse;
