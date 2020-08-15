import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Text from 'components/Text';

export default function CheckBoxList({ list = [], selectingId = null, onChange = () => {} }) {
  const [checkedId, setChecked] = useState(selectingId);
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
            title={<Text>{item.title}</Text>}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checkedId === item.id}
            onPress={() => onSelect(item.id)}
          />
        ))}
    </View>
  );
}
