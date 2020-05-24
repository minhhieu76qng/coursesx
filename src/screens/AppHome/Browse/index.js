import React from 'react';
import { ScrollView } from 'react-native';
import CategoryItem from 'components/CategoryItem';
import AppLayout from 'layouts/AppLayout';
import styles from './styles';

const Browse = () => {
  return (
    <AppLayout>
      <ScrollView style={styles.container}>
        {/* new release */}
        <CategoryItem
          title="NEW RELEASES"
          background={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9Gc' +
            'RpTe7c65J8-ZEX5hrp7j6JG38tNnIEqJ_mvAeYe-Gu14JNy7pg&usqp=CAU'
          }
        />

        <CategoryItem
          style={{ marginTop: 10 }}
          title="RECOMMEND FOR YOU"
          background="https://miro.medium.com/max/1024/1*PfumnOVjrV3BFXsEIg2LTg.png"
        />

        {/* recommend for you */}

        {/* scrollview list of categories */}

        {/* popular skills */}

        {/* path */}

        {/* top authors */}
      </ScrollView>
    </AppLayout>
  );
};

export default Browse;
