import React from 'react';
import { View } from 'react-native';
import { isString } from 'lodash';
import Text from 'components/Text';
import Icon from 'themes/Icon';
import styles from './styles';

const EmptyState = ({ iconName, iconSize, iconColor, iconComponent, title, description }) => {
  return (
    <View style={styles.container}>
      {!!iconComponent && iconComponent}
      {!iconComponent && <Icon name={iconName} size={iconSize} color={iconColor} />}
      {isString(title) && (
        <View style={styles.textContainer}>
          <Text style={[styles.textCenter]} type="h3">
            {title}
          </Text>
          {isString(description) && (
            <Text style={[styles.textCenter, styles.description]} type="subbody">
              {description}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default EmptyState;
