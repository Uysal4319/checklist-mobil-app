import React, {Component} from 'react';
import {ActivityIndicator, Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {HSButton,HSAddModal,ListItem,HSDeleteModal,HSIndicatorModal} from '../../components';
import {colors} from '../../config/constants';

import {isLogin} from '../../common/index';
import {connect} from 'react-redux';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

@connect(({ app, router }) => ({ app, router }))
export default class ListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: ' Yapilacaklar ',
            checkList: null,
            isConnected: true,
            modalVisible :false,
            deleteVisible :false,
            indicatorVisible :false,
            addedText:'',
            item:null
        };
        this._interval = null;
        this.getItems();
        this.updateItems = this.updateItems.bind(this);
        this.onStart = this.onStart.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.getItems = this.getItems.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onDeleteItem = this.onDeleteItem.bind(this);



    }

    async isLoginControl() {
        let present = this;
        isLogin().then((res) => {
            if (res) {
                present.props.navigator.push({ // yaptıysa main
                    id: 'Main',
                    name: 'Main',
                });
            } else {
                present.props.navigator.push({ // yapmadıysa login
                    id: 'Login',
                    name: 'Login',
                });
            }

        });
    }



    async getItems() {
        const  {token}  = this.props.app;
        console.debug("get Items çağrıldı token "+token);
        try {
            let response = await fetch('https://spring-eu.herokuapp.com/findAllItem',{
                method: 'POST',
                    headers: {
                    Accept: 'application/json',
                        'Content-Type': 'application/json',
                    Authorization:'Bearer '+ token
                },
                body: token
            });
            let responseJson = await response.json();

            this.setState({
                isLoading: false,
                checkList: responseJson,
            });

        } catch (error) {
            console.error(error);

            alert('Internetiniz açık olmalı. Açık olduğundan emin olun tekrar girin');
        }
    }

    async updateItems() {

        const  {token}  = this.props.app;

        this.setState({
            isLoading: true,
        });

        try {
            let response = await fetch('https://spring-eu.herokuapp.com/updateItems',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization:'Bearer '+ token
                },
                body: JSON.stringify( this.state.checkList ),
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

        // return fetch('https://spring-eu.herokuapp.com/updateItems', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify( this.state.checkList ),
        // });



    }
    componentWillMount() {
    }

     onStart(){
        this.setState({
            modalVisible:false,
            isLoading:true,
        });
        console.debug("kelime eklendi");
        this.getItems();
    }
    handleModal(){
        this.setState({
            modalVisible:true,
        })
    }

    onLongPressed (item) {
        console.debug(item.id);
        this.setState({
            deleteVisible:true,
            item: item
        })
    }

    onDeleteItem(){

        this.setState({
            deleteVisible:false,
            isLoading:true,
        });

        this.getItems();

    }

    onCancel(){
        this.setState({
            deleteVisible:false,
            modalVisible:false,
        });
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
            <SafeAreaView style={styles.container}>
                <View style={styles.text}>
                    <Text>
                        {
                            this.state.dataSource
                        }
                    </Text>
                </View>

                <View style={styles.list}>
                    <FlatList
                        data={this.state.checkList}
                        renderItem={({item}) => <ListItem article={item}
                                                          onItemLongPressed ={() =>this.onLongPressed(item)}/>}
                        keyExtractor={item => item.id}
                    />

                    <HSAddModal display={this.state.modalVisible} onStart={this.onStart} onCancel = {this.onCancel} />


                    <HSDeleteModal display={this.state.deleteVisible} onDelete={this.onDeleteItem} onCancel = {this.onCancel} item = {this.state.item}/>

                </View>

                <View style={styles.sendButtonView}>
                    <HSButton
                        title="Güncelle"
                        width={'50%'}
                        height={'75%'}
                        backgroundColor={colors.uglyBlue}
                        style={styles.button}
                        onPress={this.updateItems}
                    />

                    <HSButton
                        title="Ekle"
                        width={'50%'}
                        height={'75%'}
                        backgroundColor={colors.uglyBlue}
                        style={styles.button}
                        onPress={this.handleModal}
                    />
                </View>

            </SafeAreaView>


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
