import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import store from './src/redux/store';
import StackNavigator from './src/Navigator/StackNavigator';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();//Ignore all log notifications

const App = () => {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})