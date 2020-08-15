import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';
import Text from 'components/Text';

const styles = StyleSheet.create({
  checkboxItemContainer: {
    borderWidth: 0,
  },
  textStyle: {
    marginLeft: 15,
  },
});

export default function CheckBoxList({ list = [], selectingId = null, onChange = () => {} }) {
  const [checkedId, setChecked] = useState(selectingId);
  const { colors } = useTheme();
  const onSelect = useCallback((id) => {
    setChecked(id);
    onChange(id);
  }, []);
  return (
    <View>
      {list &&
        list.map((item) => (
          <CheckBox
            key={item.id}
            containerStyle={[styles.checkboxItemContainer, { backgroundColor: colors.card }]}
            title={<Text style={styles.textStyle}>{item.title}</Text>}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checkedId === item.id}
            onPress={() => onSelect(item.id)}
          />
        ))}
    </View>
  );
}
