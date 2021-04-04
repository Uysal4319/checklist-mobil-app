import React, { Component } from 'react';
import {View, Image, Text, Dimensions,  StyleSheet, ActivityIndicator} from 'react-native';
import Modal from "react-native-modal";
import {colors} from '../../config/constants';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class HSIndicatorModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        return (
            <Modal
                animationIn={'zoomInDown'}
                animationOut={'tada'}
                isVisible={this.props.display}
                onRequestClose={() => {

                }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection :"column" }}>


                    <View>
                        <ActivityIndicator  style={{size: 'large', color: 'white'}}/>
                    </View>

                </View>
            </Modal>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    text: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    list: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: height * 9 / 10,
    },
    sendButtonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
