import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native'
import React,{useEffect, useState} from 'react'
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { ButtonStyle } from '../../Custom/CustomView';
import { Api } from '../../services/Api';
import Toast from 'react-native-simple-toast';
import { COLORS } from '../../Constant/Colors';

const STATIC_TIME = 60;
const VerifyOTPforForgotPassword = ({navigation,route}) => {
    const [otp, setOtp] = useState('');
    const [veriryOtp, setVeriryOtp] = useState(route.params?.otp);
    const [seconds, setSeconds] = useState(STATIC_TIME);
    const [clicked, setClicked] = useState(false)
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

    useEffect(()=>{
      // alert(JSON.stringify(route.params))
    },[])

    var tempMinutes = Math.floor(seconds / 60);
    var tempSeconds = seconds - tempMinutes * 60;
    let countDown = `${tempMinutes < 10 ? `0${tempMinutes}` : tempMinutes}:${tempSeconds < 10 ? `0${tempSeconds}` : tempSeconds}`;

    const verify = async() => {
      if (!otp) {
        Toast.show('Please enter your OTP');
        return;
      }
      if (!otp.length === 6) {
        Toast.show('Please enter complete OTP');
        return;
      }
      if (otp != veriryOtp) {
        Toast.show('Please enter valid OTP');
        return;
      }
      setClicked(true)
      navigation.replace('CreatePassword',route.params)
      setClicked(false)
    }
    const resendOTPHandler = async() => {
      const body = { 
        'contact_number' : route.params.mobile,
        'verification_type' : 'forgot'
      }
      const response = await Api.resendOTP(body)
      const {success, data, message} = response;
      if(success){
        setVeriryOtp(data.otp)
        alert(data.otp)
      }
    }
  return (
    <View style={{flex:1, backgroundColor:'#fff'}}>
      <StatusBarDark/>
      <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
        <Image source={require('../../images/arrowback.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
      </TouchableOpacity>
      <ScrollView>
        <View style={{ flexDirection: 'row', marginTop: 40 }}>
            <Text style={{ color: '#4285F4', fontFamily: 'Poppins-SemiBold', fontSize: 28, marginLeft: 30, fontWeight: '600' }}>Verify </Text>
            <Text style={{ color: '#FB802A', fontFamily: 'Poppins-SemiBold', fontSize: 28, fontWeight: '600' }}>OTP</Text>
        </View>
        <View style={{flexDirection:'row', alignItems:'center', width:'100%',}}>
          <Text style={{ color: '#1212128A', marginLeft: 30, marginTop: 15, fontSize: 14 }}>OTP has been sent to</Text>
          <Text style={{width:'100%', fontWeight:'800', color: '#1212128A',marginTop: 15, fontSize: 15, }}> {route.params.mobile}</Text>
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
        <View style={{flexDirection:'row', justifyContent:'flex-end', marginRight:20}}>
        <Text style={{ fontWeight: '700', color: '#121212' }}> {countDown} </Text>
        <TouchableOpacity onPress={()=>{resendOTPHandler()}}><Text style={{color:'#FB802A'}}> Resend OTP</Text></TouchableOpacity>
        </View>
        <View style={{flexDirection:'column',alignItems:'center', justifyContent:'space-between', marginTop:50 }}>
          {clicked ?
            <DisableButton
            title={'Verify'}
            bgColor={COLORS.orange}
          />:
        <View style={{width: '90%' }}>
            <ButtonStyle
            title={'Verify'}
            loader={state.isLoading}
            onPress={() => {
              verify()
            }}
            />
        </View>
        }
          
        </View>
      </ScrollView>
    </View>
  )
}

export default VerifyOTPforForgotPassword

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
        marginTop:50,
        // width:'80%',
        marginVertical: 20,
        marginHorizontal: 10
      },
      underlineStyleBase: {
        width: 50, //60
        height: 50, //60
        borderWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: '#fff',
        borderRadius: 10,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16, //22
        fontWeight: '500',
        color: '#100C08',
      },
      underlineStyleHighLighted: {
        width: 50, //60
        height: 50, //60
        borderRadius: 10,
        fontFamily: 'Poppins',
        fontSize: 16, //24
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#fff',
      },
})