import React, { useMemo, useState, useEffect } from 'react';
import { ScrollView, FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import CategoryItem from 'components/CategoryItem';
import AppLayout from 'layouts/AppLayout';
import Section from 'components/Section';
import Avatar from 'components/Avatar';
import screenName from 'constants/screenName';
import styles from './styles';
import { getCategories } from '../../../services/inapp/getters';
import CourseRepo from '../../../services/courses/repo';

const NUM_OF_ROW = 2;
const NUM_OF_DISPLAYED_AUTHOR = 8;

const Browse = ({ navigation }) => {
  const [authors, setAuthors] = useState([]);
  const categories = useSelector(getCategories);
  const transformedCategories = useMemo(() => {
    const result = [];
    let tmp = [];
    for (let i = 0; i < categories.length; i += 1) {
      if (tmp && tmp.length < NUM_OF_ROW) {
        tmp.push(categories[i]);
      }

      if (tmp && (tmp.length === NUM_OF_ROW || i === categories.length - 1)) {
        result.push(tmp);
        tmp = [];
      }
    }
    return result;
  }, [categories]);

  useEffect(() => {
    CourseRepo.getAuthorsList()
      .then((data) => {
        const maxLength =
          data?.length > NUM_OF_DISPLAYED_AUTHOR ? NUM_OF_DISPLAYED_AUTHOR : data?.length;
        setAuthors((data || []).slice(0, maxLength));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <AppLayout>
      <View style={styles.container}>
        <ScrollView>
          {/* new release */}
          <CategoryItem
            title="Khoá học mới nhất"
            background={
              'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9Gc' +
              'RpTe7c65J8-ZEX5hrp7j6JG38tNnIEqJ_mvAeYe-Gu14JNy7pg&usqp=CAU'
            }
            onPress={() => navigation.navigate(screenName.coursesInSection)}
          />
          {/* recommend for you */}
          <CategoryItem
            style={{ marginTop: 10 }}
            title="Khoá học đề xuất"
            background="https://miro.medium.com/max/1024/1*PfumnOVjrV3BFXsEIg2LTg.png"
            onPress={() => navigation.navigate(screenName.coursesInSection)}
          />
          {/* scrollview list of categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
            {transformedCategories &&
              transformedCategories.map((group, grIdx) => (
                // eslint-disable-next-line react/no-array-index-key
                <View style={styles.categoryItemContainer} key={grIdx}>
                  {group.map((cate, idx) => (
                    <CategoryItem
                      key={cate.id}
                      style={idx === 0 ? {} : styles.category2ndItem}
                      title={cate.name}
                      background={cate.image}
                      onPress={() => navigation.navigate(screenName.coursesInSection)}
                    />
                  ))}
                </View>
              ))}
          </ScrollView>

          {/* top authors */}
          <Section sectionTitle="Giảng viên" onSeeAllPress={() => {}}>
            <FlatList
              data={authors}
              keyExtractor={(path) => `${path.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Avatar userName={item.name} userAvatar={item.avatar} onAvatarPress={null} />
              )}
            />
          </Section>
        </ScrollView>
      </View>
    </AppLayout>
  );
};

export default Browse;
