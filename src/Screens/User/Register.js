import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar, ScrollView, TextInput, Keyboard, SafeAreaView } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import { ButtonStyle, DisableButton } from '../../Custom/CustomView'
import Toast from 'react-native-simple-toast';
import { Api, LocalStorage } from '../../services/Api';
import { _SetAuthToken } from '../../services/ApiSauce';
import { useDispatch } from 'react-redux';
import { COLORS } from '../../Constant/Colors';
import { Platform } from 'react-native';

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false)
  const [state, setState] = useState({
    name: '',
    contact_number: '',
    password: '',
    isLoading: false
  })

  const registerHandler = async () => {

    Keyboard.dismiss()
    const {
      name = '',
      contact_number = '',
      password = '',
    } = state;

    if (!name) {
      Toast.show('Please enter your name')
      return;
    }

    if (!contact_number) {
      Toast.show('Please enter your mobile no.');
      return;
    }

    if (contact_number.length !== 10) {
      Toast.show('Mobile number must be in 10 digits');
      return;
    }

    if (!password) {
      Toast.show('Please enter your password')
      return;
    }
    setClick(true)
    const body = {
      name,
      contact_number,
      password
    };
    // alert(JSON.stringify(body,null,2))
    setState({ ...state, isLoading: true });
    const response = await Api.userRegister(body);
    const { success, data = {}, message } = response;
    console.log(JSON.stringify(response, null, 2))
    setState({ ...state, isLoading: false });
    if (success) {
      alert(data.otp)
      // LocalStorage.setToken(data.token);
      // _SetAuthToken(data.token);
      // // dispatch(actions.SetUserDetail(user));
      // // LocalStorage.setUserDetail(JSON.stringify(user));
      Toast.show(message);
      navigation.replace('VerifyOTP', data);
      setClick(false)
    } else {
      Toast.show(data.data.contact_number[0])
      setState('')
      navigation.navigate('Login')
      setClick(false)
    }

  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      {/* <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
        <Image source={require('../../images/Add.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
      </TouchableOpacity> */}
      <ScrollView style={{ marginTop: 0 }}>
        <View>
          <View style={{ flexDirection: 'row', }}>
            <Text style={{ color: '#4285F4', fontFamily: 'Poppins-SemiBold', fontSize: 28, marginLeft: 30, fontWeight: '600' }}>Create </Text>
            <Text style={{ color: '#FB802A', fontFamily: 'Poppins-SemiBold', fontSize: 28, fontWeight: '600' }}>Account</Text>
          </View>
          <Text style={{ color: '#1212128A', marginLeft: 30, marginTop: 15, fontSize: 14 }}>Hello, Welcome back to your account!</Text>
        </View>
        <View style={{ marginTop: 40 }}>
          <View style={{ height: 56, flexDirection: 'row', alignItems: 'center', marginHorizontal: 30, borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, marginBottom: 20 }}>
            <TextInput
              value={state.name}
              onChangeText={text => setState({ ...state, name: text.replace(/[`~!@#₹$%^&*✓™®©%€¥$¢^∆¶×÷π√•°()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '') })}
              style={{ flex: 1, fontSize: 16, fontFamily: 'Poppins-SemiBold', color: 'black' }}
              placeholder={'Full Name'}
              keyboardType={Platform.OS == 'ios' ? "ascii-capable": "visible-password"}
              placeholderTextColor={'lightgray'}
              // error={hasEmailErrors}
              maxLength={50}
            />
            <Image style={{ width: 28, height: 28 }} source={require('../../images/User.png')} />
          </View>
          {/* <TextInput
            value={state.contact_number}
            onChangeText={text => setState({ ...state, contact_number: text.replace(/[^0-9]/g, '') })}
            style={styles.textInput}
            placeholder={'Mobile No.'}
            placeholderTextColor={'lightgray'}
            keyboardType={'number-pad'}
            // secureTextEntry={true}
            // error={hasEmailErrors}
            maxLength={10}
          /> */}
          <View style={{ height: 56, flexDirection: 'row', alignItems: 'center', marginHorizontal: 30, borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, marginBottom: 20 }}>
            <TextInput
              value={state.contact_number}
              onChangeText={text => setState({ ...state, contact_number: text.replace(/[^0-9]/g, '') })}
              style={{ flex: 1, fontSize: 16, fontFamily: 'Poppins-SemiBold', color: 'black' }}
              placeholder={'Mobile No.'}
              placeholderTextColor={'lightgray'}
              keyboardType={'number-pad'}
              // secureTextEntry={true}
              // error={hasEmailErrors}
              maxLength={10}
            />
            <Image style={{ width: 28, height: 28 }} source={require('../../images/phonereg.png')} />
          </View>
          {/* <TextInput
            value={state.password}
            onChangeText={text => setState({ ...state, password: text })}
            style={styles.textInput}
            placeholder={'Password'}
            placeholderTextColor={'lightgray'}
            keyboardType={'default'}
            secureTextEntry={true}
            // error={hasEmailErrors}
            // maxLength={10}
          /> */}
          <View style={{ height: 56, flexDirection: 'row', alignItems: 'center', marginHorizontal: 30, borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, marginBottom: 10 }}>
            <TextInput
              value={state.password}
              onChangeText={text => setState({ ...state, password: text })}
              style={{ flex: 1, fontSize: 16, fontFamily: 'Poppins-SemiBold', color: 'black' }}
              placeholder={'Password'}
              placeholderTextColor={'lightgray'}
              keyboardType={'default'}
              secureTextEntry={true}
            // error={hasEmailErrors}
            // maxLength={10}
            />
            <Image style={{ width: 28, height: 28 }} source={require('../../images/passwordreg.png')} />
          </View>
        </View>
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          {click ?
            <View style={{ width: '90%' }}>
              <DisableButton
                title={'Sign Up'}
                bgColor={COLORS.orange}
              />
            </View> :
            <View style={{ width: '90%' }}>
              <ButtonStyle
                title={'Sign Up'}
                loader={state.isLoading}
                onPress={() => {
                  registerHandler()
                  // navigation.replace('Home');
                }}
              />
            </View>
          }
          {/* <View style={{width: '90%' }}>
          <ButtonStyle
            title={'Sign Up'}
            loader={state.isLoading}
            onPress={() => {
              registerHandler()
              // navigation.replace('Home');
            }}
          />
        </View> */}
        </View>
        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
          <Text style={{ color: 'gray' }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={{ color: '#FB802A' }}>Login</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Register

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
    height: 56,
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