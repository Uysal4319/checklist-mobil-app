import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../../config/constants';


class HSTextInput extends Component {
    render() {
        const { title, placeholder, autoFocus, onChangeText, value, height, width, backgroundColor, color, placeholderTextColor } = this.props;
        return (
            <TextInput
                underlineColorAndroid='transparent'
                style={[{ height, width, backgroundColor, color }, styles.textInput]}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                autoFocus={autoFocus}
                onChangeText={onChangeText}
                value={value}
                placeholderStyle={styles.placeholderStyle}
            />
        );
    }
}


export default HSTextInput;


const styles = StyleSheet.create({
    container: {
        // marginBottom: '1%'
    },
    textInput: {
        borderRadius: 10,
        marginBottom: 10,
        textAlign: 'left',
        fontSize: 20,
        padding: 5,
    },
    title: {
        textAlign: 'left',
        fontSize: 20,
        padding: 5,
        color: colors.white
    }
})



HSTextInput.PropTypes = {
    placeholder: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
}
