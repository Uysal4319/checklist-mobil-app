import React, {PureComponent} from 'react';
import Root from './app/Root';
import OneSignal from 'react-native-onesignal';

export default class App extends PureComponent{

  constructor(properties) {
    super(properties);
    OneSignal.init("09901b76-e9f2-4223-b15c-ec6f75478f16", {kOSSettingsKeyAutoPrompt : true});// set kOSSettingsKeyAutoPrompt to false prompting manually on iOS

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: '+ device);
  }

  render(){
    return (
        <Root/>
    );
  }

};
