import React, { Component } from 'react';
import {View, Image, Text, Dimensions, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from "react-native-modal";
import {HSButton, HSIndicatorModal, HSTextInput} from '../../components';
import {colors} from '../../config/constants';
import {connect} from 'react-redux';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

@connect(({ app, router }) => ({ app, router }))
export default class HSDeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item:'',
            isLoading: false,

        };

        this.deleteItem = this.deleteItem.bind(this);
        this.onDelete = this.props.onDelete.bind(this);

    }

    async deleteItem(){
        const  {token}  = this.props.app;
        console.debug("item "+ this.props.item.text);


        this.setState({
            isLoading: true,
        });

        try {
            let response = await fetch('https://spring-eu.herokuapp.com/delete',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization:'Bearer '+ token
                },
                body:  JSON.stringify({
                        id: this.props.item.id,
                        text: this.props.item.text,
                        status: this.props.item.status,
                        username: token
                    }
                )
            });

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

        this.onDelete(this.state.item);


        // if(this.state.item !== null){
        //     return fetch('https://spring-eu.herokuapp.com/delete', {
        //         method: 'POST',
        //         headers: {
        //             Accept: 'application/json',
        //             'Content-Type': 'application/json',
        //         },
        //         body:  JSON.stringify({
        //             id: this.props.item.id,
        //             text: this.props.item.text,
        //             status: this.props.item.status
        //             }
        //         )
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


                    <HSButton
                        title="Sil"
                        width={'50%'}
                        height={'10%'}
                        backgroundColor={colors.uglyBlue}
                        style={styles.button}
                        onPress={this.deleteItem}
                    />

                    <HSButton
                        title="Silme"
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
