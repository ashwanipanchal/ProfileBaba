
import React, { useState,useEffect,useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image,StatusBar, FlatList, ScrollView } from 'react-native'
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import { COLORS } from '../../Constant/Colors'
import * as Animatable from 'react-native-animatable';


const Notification = ({navigation}) => {    

  return (
    <View style={{flex:1, backgroundColor:'#F5F5F5'}}>
      <StatusBar barStyle="dark-content"  backgroundColor="#F5F5F5"/>
          <View style={{ flexDirection: 'row', marginBottom:30 , marginTop:0}}>
              <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
                  <Image source={require('../../images/arrowback.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
              </TouchableOpacity>
              <Image source={require('../../images/Notification.png')} style={{  marginLeft: 10, width: 120, height: 32, alignSelf: 'center', resizeMode: 'contain' }} />
          </View>
          {/* <View>
            <Animatable.View style={{marginLeft:50}}>
              <Animatable.Text animation="slideInLeft">Left</Animatable.Text>
            </Animatable.View>
            <Animatable.View style={{marginRight:50}}>
              <Animatable.Text animation="slideInRight">Right</Animatable.Text>
            </Animatable.View>
          </View> */}
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({
    crossImage: {
        marginLeft: 20,
        width: '10%',
        padding: 5,
        // backgroundColor:'red'
        padding: 5,
        backgroundColor:'#FFF',
        borderRadius:10
      },
})