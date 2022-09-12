import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBarDark } from '../../Custom/CustomStatusBar'
const {height} = Dimensions.get('window');

const DialedCallScreen = ({navigation}) => {
  return (
    <View style={{flex:1, backgroundColor:'#F4F9FF'}}>
        <StatusBarDark backgroundColor={'#fff'} />
        <Image source={require('../../images/callavatar.png')} style={{resizeMode:'contain', width:150, height:150, alignSelf:'center', marginTop: height/3}}/>
        <Text style={{fontSize:24, fontWeight:'700', alignSelf:'center', marginTop:20}}>Ravi Verma</Text>
        <Text style={{fontSize:18, alignSelf:'center'}}>Ringing...</Text>
        <View style={{flexDirection:'row', backgroundColor:'#fff', position:'absolute', bottom:0, width:'100%', justifyContent:'space-around', paddingVertical:20}}>
            <Image source={require('../../images/speaker.png')} style={{width:60, height:60}}/>
            <Image source={require('../../images/mic.png')} style={{width:60, height:60}}/>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
                <Image source={require('../../images/hangupbutton.png')} style={{width:60, height:60}}/>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default DialedCallScreen

const styles = StyleSheet.create({})