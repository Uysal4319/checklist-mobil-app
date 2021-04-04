/*
Konuların içerisinde bulunan içeriklerin her biri.
(Sarı, Kırmızı)
*/
import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Dimensions, Text, View , CheckBox} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.article.status,
        };
    }

    componentDidUpdate(){
        if(this.state.checked === true){
            this.props.article.status = true;
        }else if(this.state.checked ===false){
            this.props.article.status = false;
        }
    }

    render() {
        return (
            <TouchableOpacity onLongPress ={this.props.onItemLongPressed}>

                <View style={styles.container}>
                    <View style = {styles.text}>
                        <Text>
                            {this.props.article.text}
                        </Text>
                    </View>
                    <View style = {styles.checkbox}>
                        <CheckBox
                            value={this.state.checked}
                            onValueChange={() => this.setState({ checked: !this.state.checked })}
                        />
                    </View>

                </View>

            </TouchableOpacity>


        );
    }

}

const styles = StyleSheet.create({
        container: {
            width: width,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderWidth: 2,
            paddingHorizontal: '1%',
            borderRadius: 20,
            borderColor: 'black',
            backgroundColor: '#09daed',
            marginBottom : width *3/100
        },
       text: {
           width: width*8/10,
           flexDirection: 'row',
           marginLeft : '2%',
           marginRight : '2%',
           alignItems:'flex-start',

    },
    checkbox: {
            marginLeft : '2%',
            justifyContent: 'center',
            alignItems:'flex-end',
    },
    }
);
