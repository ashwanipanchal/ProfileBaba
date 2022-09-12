import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { StatusBarLight } from '../../Custom/CustomStatusBar'
import { ButtonStyle, LoginButton } from '../../Custom/CustomView';
const { height } = Dimensions.get('window');
import * as Animatable from 'react-native-animatable';

const GetStarted = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={{}}>
        <Animatable.View style={{ alignItems:'center', paddingTop:20  }}>
          <Animatable.Image style={{ width: 56, height: 56, resizeMode: 'contain', marginTop:30 }} source={require('../../images/group3.png')} animation="slideInDown" />
        </Animatable.View>
        <Animatable.View style={{ alignItems:'flex-end',paddingRight:20 }}>
          <Animatable.Image style={{ width: 56, height: 56, resizeMode: 'contain', marginBottom:30, marginRight:30 }} source={require('../../images/group1.png')} animation="slideInRight" />
          <Animatable.Image style={{ width: 56, height: 56, resizeMode: 'contain' }} source={require('../../images/group2.png')} animation="slideInRight" />
        </Animatable.View>
        <Animatable.View style={{  alignItems:'flex-start', paddingLeft:20 }}>
          <Animatable.Image style={{ width: 56, height: 56, resizeMode: 'contain', marginBottom:30, marginLeft:30, marginTop:-20 }} source={require('../../images/group4.png')} animation="slideInLeft" />
          <Animatable.Image style={{ width: 56, height: 56, resizeMode: 'contain' }} source={require('../../images/group5.png')} animation="slideInLeft" />
        </Animatable.View>
      </View>
      <Animatable.View >
          <Animatable.Image style={{height:'90%', width:'50%', resizeMode:'contain', alignSelf:'center', marginTop:-280, }} source={require('../../images/logo.png')} animation="slideInUp" />
        </Animatable.View>
      {/* <Image style={styles.image} source={require('../../images/logo.png')} /> */}
      <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: 170, position:'absolute', bottom:'20%', width:'100%'}}>
        <View style={{ width: '80%' }}>
          <ButtonStyle
            title={'Sign Up'}
            onPress={() => {
              navigation.replace('Register');
            }}
          />
        </View>
        <View style={{ width: '80%', }}>
          <LoginButton
            title={'Login'}
            onPress={() => {
              navigation.replace('Login');
            }}
          />
        </View>
        <TouchableOpacity onPress={() => { navigation.navigate('DrawerNavigatorForSkip') }}>
          <Text style={{ fontSize: 14, color: 'gray' }}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default GetStarted

const styles = StyleSheet.create({
  image: {
    marginTop: -280,
    width: '60%',
    height: '50%',
    resizeMode: 'contain',
    alignSelf: 'center',
    // backgroundColor:'red'
  },
})