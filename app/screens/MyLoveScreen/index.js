import React, {Component} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

export default class MainScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: null,
            isLoading: true,
        }
    }

    fetchHello(){
        return fetch('https://say-hello-eu.herokuapp.com/hello')
            .then((response) => response.text())
            .then((responseText) => {

                console.debug(responseText);
                this.setState({
                    dataSource: responseText,
                    isLoading : false,
                }, function(){

                });

            })
            .catch((error) =>{
                console.error(error);
            });

    }

    componentWillMount(){
        this.fetchHello();
    }

    render() {
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (
            <View justfiyContent = 'center' alignItems = 'center'>

                <View>
                    <Text>{this.state.dataSource}</Text>
                </View>
            </View>
        );
    }
}
