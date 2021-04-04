import React, {PureComponent} from 'react';

import {
    Alert,
    View,
    Image, // girdiler için
    Button, StyleSheet, Dimensions, // tıklamak için
} from 'react-native';

import { connect } from 'react-redux';

import {HSSignUpModal, HSIndicatorModal, HSText,HSButton,HSCommonContainer,HSGradientButton,HSLoading,HSTextInput,HSErrorModal} from '../../components';
import OneSignal from 'react-native-onesignal';
import i18N from '../../languages/index';
import {colors, screen} from '../../config/constants';

import images from '../../assets/images';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

@connect(({ app, router }) => ({ app, router }))
export default class LoginPage extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userPassword: '',
            isLoading:false,
            modalVisible:false,
        };

        const token = this.props.app;
        this.onCancel = this.onCancel.bind(this);
        this.onAddUser = this.onAddUser.bind(this);
        OneSignal.addEventListener('ids', this.onIds);
    }


    onIds(device) {


        console.log('Device info ===>> ', device);

     //   this.props.dispatch({type: 'app/updateState', payload: {userid: device.userid.toString()}});
    }


    async goLogin() {
        let name = this.state.userName;
        let pass = this.state.userPassword;
        let present = this;


        this.setState({
            isLoading: true,
        });

        try {
            let response = await fetch('https://spring-eu.herokuapp.com/authenticate'
                , {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: name,
                        password: pass,
                    }),
                }
            );

            let responseJson = await response.json();

            if (responseJson.token !== null && responseJson.token !== undefined) {
                console.debug("token == > "+ responseJson.token);
                this.props.dispatch({type: 'app/updateState', payload: {token: responseJson.token.toString()}});
                this.props.navigation.navigate('List');
            } else {

                Alert.alert('Kullanıcı Doğrulanamadı');

                this.setState({
                    isLoading: false,
                });

                return;
            }


            this.setState({
                isLoading: false,
            });



        } catch (error) {
            console.error(error);

            alert('Internetiniz açık olmalı. Açık olduğundan emin olun tekrar girin');
        }

        // fetch('http://192.168.1.33:8080/authenticate'
        //     , {
        //         method: 'POST',
        //         headers: {
        //             Accept: 'application/json',
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ // değerleri serialize ediyoruz
        //             username: name,
        //             password: pass,
        //         }),
        //     }
        // )
        //     .then((res) => res.json()) // gelen datayı parse ediyoruz
        //     .then((res) => {
        //
        //         this.setState({
        //             isLoading: false,
        //         });
        //
        //         this.props.dispatch({type: 'app/updateState', payload: {token: res.token}});
        //
        //         console.debug("token " + res);
        //
        //         if (res !== '-1' && res !== '') {
        //             this.props.navigation.navigate('List');
        //         } else {
        //             Alert.alert('Kullanıcı Doğrulanamadı');
        //         }
        //     })
        //     .catch((error) => {
        //         Alert.alert('data', 'Sunucuya bağlanırken bir hata oluştu');
        //     });
    }


    onAddUser(){
        this.setState({
            modalVisible: true,
        });
    }

    onCancel(){
        this.setState({
            modalVisible: false,
        });
    }

    secondView() {
        const {username, password} = this.state;
        return (
            <View style={styles.secondView}>
                <HSTextInput
                    height={35}
                    width={screen.width / 1.5}
                    placeholder={i18N.t('loginScreen.userName')}
                    onChangeText={value => {
                        this.setState({username: value});
                    }}
                    placeholderTextColor={colors.brownGrey}
                    backgroundColor={colors.lightPeach30}
                    color={colors.black}
                    value={username}
                />
                <HSTextInput
                    height={35}
                    width={screen.width / 1.5}
                    placeholder={i18N.t('loginScreen.password')}
                    onChangeText={value => this.setState({password: value})}
                    placeholderTextColor={colors.brownGrey}
                    backgroundColor={colors.lightPeach30}
                    color={colors.black}
                    value={password}
                    isSecureText={true}
                />
                <HSGradientButton
                    style={styles.loginButton}
                    gradient={
                        this.getLoginButtonColor()
                            ? colors.buttonDarkGradient
                            : colors.buttonLightGradient
                    }
                    onPress={() => this.doLogin()}>
                    <HSText style={styles.loginButtonText}>
                        {i18N.t('loginScreen.login')}
                    </HSText>
                </HSGradientButton>
                <View style={styles.rowView}>
                    <HSButton onPress={this.signUp}>
                        <HSText style={styles.registerButtonText}>
                            {i18N.t('loginScreen.signUp')}
                        </HSText>
                    </HSButton>
                    <HSButton>
                        <HSText style={styles.forgetPasswordButtonText}>
                            {i18N.t('loginScreen.forgot')}
                        </HSText>
                    </HSButton>
                </View>
            </View>
        );
    }

    thirdView() {
        return (
            <View style={styles.thirdView}>
                <View style={styles.harbiLogo}>
                    <Image source={images.harbiLogo} />
                    <HSText>{i18N.t('firmName')}</HSText>
                    <HSText>{i18N.t('firmEmail')}</HSText>
                </View>
            </View>
        );
    }

    getErrorModal() {
        const {isLoginError} = this.props;
        return (
            <HSErrorModal
                isVisible={isLoginError}
                errorMessage={i18N.t('loginScreen.errorMessage')}
                confirm={() => this.confirmLoginError()}
            />
        );
    }

    render() {

        // if (this.state.isLoading) {
        //     return (
        //         // <View style={{flex: 1, padding: 20}}>
        //         //     <ActivityIndicator/>
        //         // </View>
        //
        //         <HSIndicatorModal display= {this.state.isLoading} />
        //     );
        // }

        const {isLoginRequestProgress} = this.props;
        return (
            <HSCommonContainer noTitle>
                <View style={styles.firstView}>
                    <Image
                        source={images.loginImage}
                        style={styles.loginImage}
                        resizeMode={'contain'}
                    />
                </View>
                {this.secondView()}
                {this.thirdView()}
                {this.getErrorModal()}
                {isLoginRequestProgress ? <HSLoading /> : null}
            </HSCommonContainer>



            // <View
            //     style={{
            //         flex: 1,
            //         flexDirection: 'column',
            //         justifyContent: 'center',
            //         padding: 15,
            //     }}>
            //
            //
            //     <View>
            //         <TextInput
            //             placeholder="Kullanıcı adı"
            //             value={this.state.userName}
            //             onChangeText={(value) => this.setState({userName: value})}/>
            //     </View>
            //     <View>
            //         <TextInput
            //             placeholder="Şifre"
            //             value={this.state.userPassword}
            //             onChangeText={(value) => this.setState({userPassword: value})}/>
            //     </View>
            //     <View
            //         style={{
            //             height: 50,
            //         }}>
            //         <Button
            //             title="Giriş" // butonun yazısı
            //             color="#4285f4" // arkaplan rengi
            //             onPress={this.goLogin.bind(this)} /* butona tıklandığında tetiklenecek fonksiyon*/ />
            //     </View>
            //
            //     <HSButton
            //         title="Sign-up"
            //         width={'50%'}
            //         height={'10%'}
            //         alignItems={'center'}
            //         alignContent={'center'}
            //         justfyContent={'center'}
            //         backgroundColor={colors.uglyBlue}
            //         style={styles.button}
            //         onPress={this.onAddUser}
            //     />
            //
            //     <HSSignUpModal display={this.state.modalVisible}  onCancel = {this.onCancel} />
            //
            //
            // </View>
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
    firstView: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
    },
    loginImage: {
        width: '100%',
    },
    secondView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    thirdView: {
        flex: 1,
        alignItems: 'center',
    },
    rowView: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    harbiLogo: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'flex-end',
    },
    loginButton: {
        height: 35,
        width: screen.width / 1.5,
    },
    loginButtonText: {
        color: colors.white,
        textAlign: 'center',
    },
    registerButtonText: {
        fontSize: 10,
    },
    forgetPasswordButtonText: {
        fontSize: 9,
        color: colors.brownGrey,
        marginLeft: 30,
    },
});
