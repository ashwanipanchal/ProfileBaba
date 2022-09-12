import { DrawerContentScrollView } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  View,
  Alert,
  Share,
  FlatList,
} from 'react-native';
import { COLORS } from '../../Constant/Colors';
import { LocalStorage } from '../../services/Api';
import { _RemoveAuthToken } from '../../services/ApiSauce';
import { useIsFocused } from '@react-navigation/native';
import { BASE_URL } from '../../services/Config'
const CustomDrawer = ({ navigation, route}) => {
  const isFocus = useIsFocused()
  const [user, setUser] = useState()
  const [privacyTermsCondition, setPrivacyTermsCondition] = useState("");
  const Data = [
    {
      id: 0,
      title: 'Booking History',
      value: 'Booking History',
      source: require('../../images/menu-bookinghistory.png'),
    },
    {
      id: 1,
      title: 'Your Account',
      value: 'Your Account',
      source: require('../../images/menu-user.png')
    },
    {
      id: 2,
      title: 'Notification',
      value: 'Notification',
      source: require('../../images/menu-notification.png')
    }]

    const Data1 = [
    {
      id: 3,
      title: 'Help & FAQs',
      value: 'Help & FAQs',
      source: require('../../images/menu-help.png')
    },

    {
      id: 4,
      title: 'Privacy Policy',
      value: 'Privacy Policy',
      source: require('../../images/menu-privacy.png')
    },
    {
      id: 5,
      title: 'Terms & Condition',
      value: 'Terms & Condition',
      source: require('../../images/menu-term.png')
    },
    {
      id: 6,
      title: 'Rate Us',
      value: 'Rate Us',
      source: require('../../images/menu-user.png')
    },
    {
      id: 7,
      title: 'Share',
      value: 'Share',
      source: require('../../images/menu-share.png')
    },
    {
      id: 8,
      title: 'Logout',
      value: 'Logout',
      source: require('../../images/menu-logout.png')
    },
  ];
  //   const dispatch = useDispatch();
  //   const onLogoutHandler = () => {
  //     _RemoveAuthToken();
  //     LocalStorage.setToken('');
  //     dispatch(actions.SetLogout());
  //     navigation.reset({
  //       index: 0,
  //       routes: [{name: 'Login'}],
  //     });
  //   };

  useEffect(() => {

    
    profileName();
    // driverSealApi();
    // const profileUpdateEvent = DeviceEventEmitter.addListener("ProfileUpdate", (status) => {
    //   if (status) {
    //     // onGetProfile();
    //   }
    // });
    // return () => {
    //   profileUpdateEvent.remove();
    // }
  },[isFocus])
  const profileName = async() => {
    const user = (await LocalStorage.getUserDetail()) || '';
    const token = (await LocalStorage.getToken()||'')
    const newUser = JSON.parse(user)
    // alert(JSON.stringify(user,null,2))
    const btoken = `Bearer ${token}`;
    const response = await fetch(`${BASE_URL}user-profile/${newUser.id}`,{
      method:'GET',
      headers:{
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": btoken,
      }
    })
    const res = await response.json()
    // if(res.success){
    setUser(res.data)
    // console.log(type.name)

  }

  const driverSealApi = async () => {
    const response = await Api.fetchSettings();
    setPrivacyTermsCondition(response)
  }

  const onPressHandler = value => {
    // navigation.closeDrawer();

    switch (value) {
      
      case 'Home':
        navigation.replace('Home')
        break;
      case 'Notification':
        navigation.navigate('Notification')
        break;

      case 'Your Account':
        navigation.navigate('Account')
        break;

      case 'Booking History':
        navigation.navigate('BookingHistory')
        break;
        
      case 'Share':
        onShare()
        break;

      case 'Logout':
        Alert.alert(
          'Logout',
          `Do you want to logout.`,
          [
            {
              text: 'No',
              onPress: navigation.closeDrawer,
              style: 'cancel',
            },
            { text: 'Yes', onPress: onLogoutHandler },
          ],
          { cancelable: false },
        );
        break;

      default:
    }
  };

  const onLogoutHandler = () => {
    _RemoveAuthToken();
    LocalStorage.setToken('');
    // dispatch(actions.SetLogout());
    LocalStorage.clear()
    navigation.closeDrawer,
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
  };

  const gotoWebViewScreen = (title) => {
    let url = "";
    if (title === "Privacy Policy") {
      url = privacyTermsCondition.private_police
    } else if (title === "Terms & Condition") {
      url = privacyTermsCondition.terms_conditions
    }else if (title === "About Us") {
      url = privacyTermsCondition.about_us
    }
    navigation.navigate('WebViewScreen', {
      title: title,
      url: url
    })
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'App link',
        message: 'Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
        url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <DrawerContentScrollView>
        <View style={{flexDirection:'row', padding:15, alignItems:'center', marginLeft:5, marginBottom:20, }}>
            {(user && 
            <>
              <Image source={user.profile_pic.length > 0 ? {uri: `http://testing.profilebaba.com/uploads/users/${user.profile_pic}`} : require('../../images/default-user-image.png')} style={{ width: 60, height: 60, borderRadius: 10 }} />
              <View style={{ marginLeft: 10, width:'100%' }}>
                <Text style={{ color: '#222133', fontSize: 20, fontWeight: '800',}}>{user.name}</Text>
                <Text style={{ color: '#7C7C7A' }}>{user.email}</Text>
              </View>
            </>
            )}
        </View>
        <FlatList
          data={Data}
          renderItem={({item})=>(
            <TouchableOpacity onPress={()=>{onPressHandler(item.title)}} style={{flexDirection:'row', marginLeft:10, padding:18, alignItems:'center'}}>
              <Image source={item.source} style={{width:28, height:28}}/>
              <Text style={{color:COLORS.lightGray, fontFamily:'Poppins-Medium', fontSize:18, marginLeft:20,width:'90%'}}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
        <Text style={{color:COLORS.profileBlackText, fontFamily:'Poopins-Medium', fontSize:20, marginLeft:20, padding:10}}>Help & Privacy</Text>
        <FlatList
          data={Data1}
          renderItem={({item})=>(
            <TouchableOpacity onPress={()=>{onPressHandler(item.title)}} style={{flexDirection:'row', marginLeft:10, padding:18, alignItems:'center'}}>
              <Image source={item.source} style={{width:28, height:28}}/>
              {item.title == 'Logout' ?
              <Text style={{color:'red', fontFamily:'Poppins-Medium', fontSize:18, marginLeft:20}}>{item.title}</Text>
              :
              <Text style={{color:COLORS.lightGray, fontFamily:'Poppins-Medium', fontSize:18, marginLeft:20}}>{item.title}</Text>
              }
            </TouchableOpacity>
          )}
        />
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginHorizontal:20, marginBottom:20}}>
          <Text style={{color:COLORS.lightGray, fontFamily:'Open Sans'}}>Version 1.0</Text>
          <TouchableOpacity onPress={()=>{navigation.closeDrawer()}}>
            <Image source={require('../../images/close.png')} style={{width:52, height:52}}/>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  controlView: {
    flex: 1,
    backgroundColor: '#2574FF',
    width: '100%',
    paddingTop: 10,
  },
  image: {
    width: 74,
    height: 74,
    alignSelf: 'center',
    borderColor: '#fff',
    borderWidth: 4,
    borderRadius: 37,
    marginLeft: '10%',
    marginBottom: 20,
    marginTop: 6,
  },
  appVersion: {
    marginTop: 60,
    marginBottom: 8,
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 15,
    color: '#FFFFFF',
    opacity: 0.5,
    alignSelf: 'center',
  },
  controlView_2: {
    marginHorizontal: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  constrolViewImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  controlViewText: {
    fontFamily: 'Avenir-Heavy',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginLeft: '8%',
  },
  dnTopText: {
    fontFamily: 'Muli-Bold',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 20,
    marginLeft: 10,
    // marginHorizontal: 30,
  },
  dnTopText1: {
    fontFamily: 'Muli-SemiBold',
    fontWeight: '600',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 10,
    // marginHorizontal: 30,
    marginTop: 5,
  },
});
export default CustomDrawer;
