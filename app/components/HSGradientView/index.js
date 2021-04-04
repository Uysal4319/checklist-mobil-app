import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';
import {colors} from '../../../../../HARBI/WhowithWhom_UI/whowithwhom/app/config/constants';
import PropTypes from 'prop-types';

const HSGradientView = props => {
  const {
    style,
    children,
    dark,
    gradient = dark ? colors.buttonDarkGradient : colors.buttonLightGradient,
    noBorderRadious,
  } = props;

  const viewStyle = noBorderRadious ? styles.noBorderView : styles.viewStyle;

  return (
    <LinearGradient
      style={[viewStyle, style]}
      start={{x: 0.5, y: 0}}
      end={{x: 1, y: 0}}
      colors={gradient}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 5,
  },
  noBorderView: {
    justifyContent: 'center',
    paddingVertical: 8,
  },
});

HSGradientView.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.string,
};

export default HSGradientView;
