import React, { useRef, useCallback } from 'react';
import { Menu, MenuTrigger, MenuOption, MenuOptions } from 'react-native-popup-menu';
import { useTheme } from '@react-navigation/native';
import IconButton from 'components/IconButton';
import Text from 'components/Text';
import styles from './styles';

const ContextMenu = ({ options }) => {
  const { colors } = useTheme();
  const menuRef = useRef(null);
  const onCourseOptionMenuPress = useCallback(() => {
    menuRef.current.open();
  }, []);
  return (
    <Menu style={styles.menuWrapper} ref={menuRef}>
      <MenuTrigger>
        <IconButton
          name="ellipsis-v"
          containerStyle={styles.iconContextMenu}
          onPress={onCourseOptionMenuPress}
        />
      </MenuTrigger>
      <MenuOptions optionsContainerStyle={{ backgroundColor: colors.contextMenuBg }}>
        {options.map((option) => (
          <MenuOption key={option.name} style={styles.optionStyle} onSelect={option.onPress}>
            <Text color={colors.text} type="subbody">
              {option.name}
            </Text>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

export default ContextMenu;
