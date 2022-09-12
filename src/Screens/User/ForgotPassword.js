import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar, ScrollView, TextInput, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import { ButtonStyle, DisableButton, LoginButton } from '../../Custom/CustomView'
import Toast from 'react-native-simple-toast';
import { Api } from '../../services/Api';

const ForgotPassword = ({navigation}) => {
  const [state, setState] = useState({
    contact_number: '',
    isLoading: false
  })
  const [clicked, setClicked] = useState(false)
  const forgotHandler = async() => {
    Keyboard.dismiss()
    const {
      contact_number = '',
    } = state;

    if (!contact_number) {
      Toast.show('Please enter your mobile no.');
      return;
    }

    if (contact_number.length !== 10) {
      Toast.show('Mobile number must be in 10 digits');
      return;
    }

    setClicked(true)
    const body= {
      contact_number
    }
    // alert(JSON.stringify(body,null,2))
    const response = await Api.forgotPassword(body)
    const {success, message, data} = response;
    if(success){
      alert(data.otp)
      navigation.navigate('VerifyOTPForgotPassword',data);
      setClicked(false)
    }else{
      Toast.show("No user found");
      setClicked(false)
    }
  }

  return (
    <View style={{flex:1, backgroundColor:'#fff'}}>
      <StatusBarDark/>
      <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
        <Image source={require('../../images/Add.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
      </TouchableOpacity>
      <ScrollView>
      <View>
          <View style={{ flexDirection: 'row', marginTop: 40 }}>
            <Text style={{ color: '#4285F4', fontFamily: 'Poppins-SemiBold', fontSize: 28, marginLeft: 30, fontWeight: '600' }}>Forgot </Text>
            <Text style={{ color: '#FB802A', fontFamily: 'Poppins-SemiBold', fontSize: 28, fontWeight: '600' }}>Password</Text>
          </View>
          <Text style={{ color: '#1212128A', marginLeft: 30, marginTop: 15, fontSize: 14 }}>Hello, Enter your mobile no!</Text>
        </View>
        <View style={{ marginTop: 40 }}>
          {/* <TextInput
            value={state.contact_number}
            onChangeText={text => setState({ ...state, contact_number: text.replace(/[^0-9]/g, '') })}
            style={styles.textInput}
            placeholder={'Mobile No.'}
            placeholderTextColor={'lightgray'}
            keyboardType={'number-pad'}
            // error={hasEmailErrors}
            maxLength={10}
          /> */}
          <View style={{height:56,flexDirection:'row', alignItems:'center', marginHorizontal:30, borderColor:'gray', borderWidth:1, borderRadius:10, paddingHorizontal:14, marginBottom:20}}>
            <TextInput
              value={state.contact_number}
              onChangeText={text => setState({ ...state, contact_number: text.replace(/[^0-9]/g, '') })}
              style={{flex:1, fontSize:16, fontFamily:'Poppins-SemiBold',alignSelf:'center', color:'black'}}
              placeholder={'Mobile No.'}
              placeholderTextColor={'lightgray'}
              keyboardType={'number-pad'}
              // secureTextEntry={true}
              // error={hasEmailErrors}
              maxLength={10}
            />
            <Image style={{width:28, height:28}} source={require('../../images/phonereg.png')}/>
          </View>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: 170, marginTop: 30 }}>
            {clicked ? 
              <View style={{ width: '90%',  }}>
              <DisableButton
                title={'Done'}
                bgColor={'#4285F4'}

              />
            </View>:
            <View style={{ width: '90%',  }}>
            <ButtonStyle
              title={'Done'}
              bgColor={'#4285F4'}
              onPress={() => {
                forgotHandler()
                  // navigation.navigate('VerifyOTPForgotPassword');
              }}
            />
          </View>
            }
          {/* <View style={{ width: '90%',  }}>
            <ButtonStyle
              title={'Done'}
              bgColor={'#4285F4'}
              onPress={() => {
                forgotHandler()
                  // navigation.navigate('VerifyOTPForgotPassword');
              }}
            />
          </View> */}
          </View>
      </ScrollView>
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
    crossImage: {
        marginTop: 0,
        marginLeft: 20,
        width: '10%',
        padding: 5,
        // backgroundColor:'red'
      },
      textInput: {
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        height:56,
        paddingHorizontal: 15,
        marginHorizontal: 30,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '600',
        backgroundColor: '#fff',
        borderColor: '#1212128A',
        color: '#000'
      },
})