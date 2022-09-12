import { StyleSheet, Text, View, Dimensions, Image, PermissionsAndroid, Alert, StatusBar } from 'react-native'
import React, { useEffect , useRef} from 'react'
import {  StatusBarLight } from '../Custom/CustomStatusBar';
import * as Progress from 'react-native-progress';
import ProgressBar from 'react-native-progress/Bar'
import { LocalStorage } from '../services/Api';
import { _SetAuthToken } from '../services/ApiSauce';
import Lottie from 'lottie-react-native';
const { height } = Dimensions.get('window');

const Splash = ({navigation}) => {
  const animationRef = useRef()
  useEffect(()=>{
    checkPermission()
    
    // navigationHandle()
    // timeForBar()
    setTimeout(()=>{
      animationRef.current?.play()

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(0, 100);
    },2000)
  },[])

  const checkPermission = async () => {

    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      // downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission Required',
            message:
              'Application needs access to your location to better experience',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          navigationHandle()
          console.log('Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++" + err);
      }
    }
  };

  const navigationHandle = async() => {
    const token = (await LocalStorage.getToken()) || '';
    console.log(token)
    if (token.length !== 0) {
      _SetAuthToken(token);
      setTimeout(()=>{
        navigation.replace('DrawerNavigator')
      },3000)
    }else{
      setTimeout(()=>{
        navigation.replace('GetStarted')
      },3000)
    }
  }

  function counter() {
    var i = 0.2;
    // This block will be executed 100 times.
    setInterval(function() {
      if (i <= 1) clearInterval(this);
      else console.log('Currently at ' + (i++));
    }, 500);
  } // End
  
  counter()

  return (
    <View style={{flex:1, backgroundColor:'#fff'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Image style={styles.image} source={require('../images/logo.png')} />
      {/* <ProgressBar
            progress={0.2}
            width={48}
            height={4}
            color={'#4285F4'}
            animated={true}
            indeterminateAnimationDuration={1000}
            animationType={'timing'}
            style={{
              borderColor: 'rgba(66, 133, 244,0)',
              backgroundColor: 'rgba(66, 133, 244, 0.3)',
              alignSelf: 'center',
              marginTop: 20,
            }}
          /> */}
        <Lottie
              ref={animationRef}
              autoplay
              style={{ height:4, alignSelf: 'center'}}
              source={require('../images/progress.json')}
            />
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  image: {
    marginTop: height / 5,
    width: '60%',
    height: '50%',
    resizeMode: 'contain',
    alignSelf: 'center',
    // backgroundColor:'red'
  },
})