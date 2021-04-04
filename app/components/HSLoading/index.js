import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {colors} from '../../config/constants';

const HSLoading = props => {
  return (
    <View style={styles.indicator}>
      <ActivityIndicator size="large" color={colors.brownishOrange} />
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HSLoading;
