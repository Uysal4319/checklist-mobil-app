import React, { Component } from 'react';
import {View, Text, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import Modal from "react-native-modal";
import {connect} from 'react-redux';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class HSLoadingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <Modal
                animationIn={'zoomInDown'}
                animationOut={'tada'}
                isVisible={this.props.display}
                onRequestClose={() => {

                }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection :"row" }}>
                    <View style={{flex: 1, padding: 20}}>
                        <View>
                            <View>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 27,
                                    fontWeight: "bold",
                                    lineHeight: 68.4,
                                    textAlign: 'center'
                                }}>
                                    Kullanici Dogrulaniyor...
                                </Text>
                            </View>
                        </View>
                        <ActivityIndicator/>
                    </View>
                </View>
            </Modal>

        );
    }
}
