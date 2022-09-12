import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { ButtonStyle, DisableButton } from '../../Custom/CustomView';
import Toast from 'react-native-simple-toast';
import { Api, LocalStorage } from '../../services/Api';
import { useDispatch } from 'react-redux';
import { _SetAuthToken } from '../../services/ApiSauce';
import { COLORS } from '../../Constant/Colors';

const STATIC_TIME = 60;
const VerifyOTP = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false)
  const [otp, setOtp] = useState('');
  const [veriryOtp, setVeriryOtp] = useState(route.params?.otp);
  const [token, setToken] = useState(route.params?.token);
  const [seconds, setSeconds] = useState(STATIC_TIME);
  const [state, setState] = useState({
    isLoading: false
  })

  /* Countdown Handle */
  useEffect(() => {
    let interval = null;
    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds]);
  useEffect(() => {
    console.log(route.params)
  }, [])
  var tempMinutes = Math.floor(seconds / 60);
  var tempSeconds = seconds - tempMinutes * 60;
  let countDown = `${tempMinutes < 10 ? `0${tempMinutes}` : tempMinutes}:${tempSeconds < 10 ? `0${tempSeconds}` : tempSeconds}`;
  // console.log(countDown)
  const verifyHandler = async () => {
    if (!otp) {
      Toast.show('Please enter your OTP');
      return;
    }
    if (!otp.length === 6) {
      Toast.show('Please enter complete OTP');
      return;
    }
    setClicked(true)
    setState({ ...state, isLoading: true });
    const body = {
      contact_number: route.params?.mobile,
      otp: otp
    }
    // alert(JSON.stringify(body,null,2))
    const response = await Api.verifyOTP(body);
    const { success, message, data } = response;
    // alert(JSON.stringify(route.params,null,2))
    setState({ ...state, isLoading: false });
    if (success) {
      Toast.show(message)
      // LocalStorage.setUserDetail(route.params.user_id.toString());
      // LocalStorage.setToken(route.params.token);
      // _SetAuthToken(route.params.token);
      navigation.replace('Login')
      setClicked(false)
    } else {
      Toast.show("Wrong OTP")
      setClicked(false)
      // navigation.replace('Register')
    }
  }

  const resendOTPHandler = async () => {
    const body = {
      'contact_number': route.params.mobile,
      'verification_type': 'register'
    }
    const response = await Api.resendOTP(body)
    const { success, data, message } = response;
    if (success) {
      setVeriryOtp(data.otp)
      alert(data.otp)
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
        <Image source={require('../../images/arrowback.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
      </TouchableOpacity>
      <ScrollView>
        <View style={{ flexDirection: 'row', marginTop: 40 }}>
          <Text style={{ color: '#4285F4', fontFamily: 'Poppins-SemiBold', fontSize: 28, marginLeft: 30, fontWeight: '600' }}>Verify </Text>
          <Text style={{ color: '#FB802A', fontFamily: 'Poppins-SemiBold', fontSize: 28, fontWeight: '600' }}>OTP</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: '#1212128A', marginLeft: 30, marginTop: 15, fontSize: 14 }}>OTP has been sent to</Text>
          <Text style={{ fontWeight: '800', color: '#1212128A', marginTop: 15, fontSize: 15 }}> {route.params.mobile}</Text>
        </View>
        <OTPInputView
          style={styles.otpInput}
          pinCount={6}
          code={otp}
          onCodeChanged={text => {
            setOtp(text.replace(/[^0-9]/g, ''));
          }}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20 }}>
          <Text style={{ fontWeight: '700', color: '#121212' }}> {countDown} </Text>
          <TouchableOpacity onPress={() => { resendOTPHandler() }}><Text style={{ color: '#FB802A' }}> Resend OTP</Text></TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', marginTop: 50 }}>
          {clicked ?
            <View style={{ width: '90%' }}>
              <DisableButton
                title={'Verify'}
                bgColor={COLORS.orange}
              />
            </View>
            :
            <View style={{ width: '90%' }}>
              <ButtonStyle
                title={'Verify'}
                loader={state.isLoading}
                onPress={() => {
                  verifyHandler()
                }}
              />
            </View>
          }

        </View>
      </ScrollView>
    </View>
  )
}

export default VerifyOTP

const styles = StyleSheet.create({
  crossImage: {
    marginTop: 0,
    marginLeft: 20,
    width: '10%',
    padding: 5,
    // backgroundColor:'red'
  },
  otpInput: {
    height: 60,
    marginTop: 50,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  underlineStyleBase: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: '#fff',
    borderRadius: 10,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    fontWeight: '500',
    color: '#100C08',
  },
  underlineStyleHighLighted: {
    width: 60,
    height: 60,
    borderRadius: 10,
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#fff',
  },
})