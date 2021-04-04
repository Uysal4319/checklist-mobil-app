import React, { Component } from 'react';
import {View, Image, Text, Dimensions, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from "react-native-modal";
import {HSButton, HSIndicatorModal, HSTextInput} from '../../components';
import {colors} from '../../config/constants';
import {connect} from 'react-redux';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

@connect(({ app, router }) => ({ app, router }))
export default class HSPauseModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item:'',
            isLoading:false,
        };

        this.addItem = this.addItem.bind(this);
        this.onStart = this.props.onStart.bind(this);
    }

    async addItem(){
        const  {token}  = this.props.app;

        const tokenBody= this.state.item+'&&'+token;
        console.debug("Add Itim log token " + tokenBody);

        this.setState({
            isLoading: true,
        });
        try {
            let response = await fetch('https://spring-eu.herokuapp.com/addItem',{
                method: 'POST',
                headers: {
                    Accept: 'text/plain',
                    'Content-Type': 'text/plain',
                    Authorization:'Bearer '+ token
                },
                body:  tokenBody
            });

            this.setState({
                isLoading: false,
            });
        } catch (error) {
            console.error(error);

            alert('Internetiniz açık olmalı. Açık olduğundan emin olun tekrar girin');
        }

        this.onStart();


        // if(this.state.item !== null){
        //     return fetch('https://spring-eu.herokuapp.com/addItem', {
        //         method: 'POST',
        //         headers: {
        //             Accept: 'text/plain',
        //             'Content-Type': 'text/plain',
        //         },
        //         body:  this.state.item,
        //     });
        //
        // }

    }

    render() {

        if (this.state.isLoading) {
            return (
                // <View style={{flex: 1, padding: 20}}>
                //     <ActivityIndicator/>
                // </View>

                <HSIndicatorModal display= {this.state.isLoading} />
            );
        }

        return (
            <Modal
                animationIn={'zoomInDown'}
                animationOut={'tada'}
                isVisible={this.props.display}
                onRequestClose={() => {

                }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection :"column" }}>


                    <HSTextInput
                        width={'90%'}
                        height={'12%'}
                        placeholder="Item gir"
                        onChangeText={text => this.setState({
                            item:text
                        })}
                        placeholderTextColor="white"
                        backgroundColor="blue"
                        color="white"
                    />

                    <HSButton
                        title="Ekle"
                        width={'50%'}
                        height={'10%'}
                        backgroundColor={colors.uglyBlue}
                        style={styles.button}
                        onPress={this.addItem}
                    />

                    <HSButton
                        title="iptal"
                        width={'50%'}
                        height={'10%'}
                        backgroundColor={colors.uglyBlue}
                        style={styles.button}
                        onPress={this.props.onCancel}
                    />

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
