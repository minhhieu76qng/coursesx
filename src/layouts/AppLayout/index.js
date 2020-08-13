import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useSafeArea, SafeAreaView } from 'react-native-safe-area-context';
import _ from 'lodash';
import { useRoute } from '@react-navigation/native';
import Header from 'components/Header';

const AppLayout = ({ children, headerShown = true }) => {
  const inset = useSafeArea();
  const route = useRoute();

  const header = useMemo(() => {
    return _.get(route, 'params.header');
  }, [route]);
  return (
    <SafeAreaView
      style={{
        paddingTop: !(header.headerShown !== false && headerShown) ? inset.top : 0,
        flex: 1,
        paddingBottom: 0,
      }}
    >
      {header.headerShown !== false && headerShown && <Header paddingTop={inset.top} />}
      <View style={{ flex: 1 }}>{children}</View>
    </SafeAreaView>
  );
};

export default AppLayout;
