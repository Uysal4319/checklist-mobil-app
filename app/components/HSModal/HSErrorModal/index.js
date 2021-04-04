import React from 'react';
import {View, StyleSheet} from 'react-native';
import {HSModal, HSText, HSButton} from '../../index';
import {colors} from '../../../config/constants';
import i18N from '../../../languages';

const HSErrorModal = props => {
  const {errorMessage, isVisible, confirm} = props;
  return (
    <HSModal isVisible={isVisible}>
      <View style={styles.errorMessage}>
        <HSText style={styles.errorMessageText}>{errorMessage}</HSText>
      </View>
      <HSButton style={styles.confirmButton} onPress={() => confirm()}>
        <HSText style={styles.confirmButtonText}>
          {i18N.t('modal.errorModal.buttonText')}
        </HSText>
      </HSButton>
    </HSModal>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    flex: 2,
    padding: 10,
    justifyContent: 'center',
  },
  errorMessageText: {
    textAlign: 'center',
    fontSize: 18,
  },
  confirmButton: {
    width: '50%',
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.lightBrownishOrange,
    borderColor: colors.blackTwo,
    borderWidth: 1,
  },
  confirmButtonText: {},
});

export default HSErrorModal;
