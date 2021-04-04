import React from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {screen, colors} from '../../config/constants';

const HSModal = props => {
  const {style, children, isVisible, onBackdropPress} = props;
  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <View style={style ? style : styles.container}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screen.width / 1.2,
    height: screen.height / 3,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: screen.width / 12,
    backgroundColor: colors.white,
  },
});

export default HSModal;
