import React from 'react';
import { Text, View } from 'react-native';
import AppLayout from 'layouts/AppLayout';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return (
    <AppLayout>
      <View>
        <Text>{t('course_detail:buy_course')}</Text>
      </View>
    </AppLayout>
  );
};

export default Home;
