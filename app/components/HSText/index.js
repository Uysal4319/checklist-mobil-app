import React from 'react';
import {Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {colors} from '../../config/constants';

const HSText = props => {
  return (
    <Text
      style={[styles.textStyle, props.style]}
      numberOfLines={props.numberOfLines}
      onPress={props.onPress}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: colors.black,
  },
});

HSText.propTypes = {
  numberOfLines: PropTypes.number,
};

export default HSText;
