import React from 'react';
import {
  StatusBar,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import PropTypes from 'prop-types';
import images from '../../assets/images';
import {colors, screen} from '../../config/constants';

const HSCommonContainer = props => {
  const {
    barStyle,
    style,
    includeTop,
    includeBottom,
    noTitle,
    backButton,
    goBack,
  } = props;
  return (
    <SafeAreaView
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: colors.backgroundColor,
          flex: 1,
          borderRadius: noTitle ? 5 : 0,
        },
        style,
      ]}
      forceInset={{
        bottom: includeBottom ? 'never' : 'always',
        top: includeTop ? 'never' : 'always',
      }}>
      <StatusBar translucent barStyle={barStyle} />
      {!noTitle ? (
        <View style={styles.title}>
          <Image source={images.title} />
        </View>
      ) : null}
      {backButton ? (
        <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
          <Image source={images.backButton} />
        </TouchableOpacity>
      ) : null}
      {props.children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    height: 60,
    width: screen.width,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  backButton: {
    height: 30,
    marginLeft: 20,
    marginTop: 15,
  },
});

HSCommonContainer.defaultProps = {
  barStyle: 'dark-content',
  includeTop: false,
  includeBottom: true,
};

HSCommonContainer.propTypes = {
  barStyle: PropTypes.string,
  includeTop: PropTypes.bool,
  includeBottom: PropTypes.bool,
};

export default HSCommonContainer;
