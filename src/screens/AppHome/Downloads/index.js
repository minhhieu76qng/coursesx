import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import AppLayout from 'layouts/AppLayout';
import EmptyState from 'components/EmptyState';
import styles from './styles';

const Downloads = () => {
  const { colors } = useTheme();
  return (
    <AppLayout>
      <View style={styles.emptyStateContainer}>
        <EmptyState
          iconName="arrow-circle-o-down"
          iconSize={100}
          iconColor={colors.textSecondary}
          title="No downloads"
          description="Courses you download will appear here."
        />
      </View>
    </AppLayout>
  );
};

export default Downloads;
