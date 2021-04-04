import React, { Component } from 'react';
import {View, Image, Text, Dimensions, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import Modal from "react-native-modal";
import {HSButton, HSIndicatorModal, HSTextInput} from '../../components';
import {colors} from '../../config/constants';
import {connect} from 'react-redux';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

@connect(({ app, router }) => ({ app, router }))
export default class HSSignUpModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            isLoading:false,
        };

        this.addUser = this.addUser.bind(this);
        this.onCancel = this.props.onCancel.bind(this);
    }

    async addUser(){

        this.setState({
            isLoading: true,
        });

        try {
            let response = await fetch('https://spring-eu.herokuapp.com/sign-up',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username:this.state.username,
                    password:this.state.password

                })
            });


            console.log("response ==>"+ response.status);

            if(response.status === 201){

                Alert.alert('Kullanıcı Zaten var');
            }

            this.setState({
                isLoading: false,
            });

        } catch (error) {
            console.error(error);
            this.setState({
                isLoading: false,
            });

            alert('Internetiniz açık olmalı. Açık olduğundan emin olun tekrar girin');
        }

        this.onCancel();


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
                        placeholder="Username"
                        onChangeText={text => this.setState({
                            username:text
                        })}
                        placeholderTextColor="white"
                        backgroundColor="blue"
                        color="white"
                    />

                    <HSTextInput
                        width={'90%'}
                        height={'12%'}
                        placeholder="Password"
                        onChangeText={text => this.setState({
                            password:text
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
                        onPress={this.addUser}
                    />

                    <HSButton
                        title="İptal"
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
