import React from 'react';
import { View } from 'react-native';
import { useSafeArea, SafeAreaView } from 'react-native-safe-area-context';
import Header from 'components/Header';

const AppLayout = ({ children }) => {
  const inset = useSafeArea();
  return (
    <SafeAreaView style={{ paddingTop: 0 }}>
      <Header paddingTop={inset.top} />
      <View style={{ flex: 1 }}>{children}</View>
    </SafeAreaView>
  );
};

export default AppLayout;
