import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../../../../../HARBI/WhowithWhom_UI/whowithwhom/app/config/constants';
import PropTypes from 'prop-types';

const HSGradientButton = props => {
  const {
    style,
    onPress,
    disabled,
    children,
    gradient = colors.buttonDarkGradient,
    row,
  } = props;

  return (
    <LinearGradient
      style={[styles.viewStyle, style]}
      start={{x: 0.5, y: 0}}
      end={{x: 1, y: 0}}
      colors={gradient}>
      <TouchableOpacity
        style={row ? styles.rowStyle : null}
        hitSlop={{left: 100, top: 10, bottom: 10, right: 100}}
        onPress={onPress}
        disabled={disabled}>
        {children}
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 5,
  },
  rowStyle: {
    flexDirection: 'row',
  },
});

HSGradientButton.propTypes = {
  onPress: PropTypes.func,
};

export default HSGradientButton;
