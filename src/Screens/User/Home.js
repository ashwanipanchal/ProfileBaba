import { Image, StyleSheet, Text, TouchableOpacity, View, StatusBar, FlatList, ImageBackground, TextInput, Alert, ScrollView, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { DrawerActions } from '@react-navigation/native';
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS } from '../../Constant/Colors';
import { Api, LocalStorage } from '../../services/Api';
import { _RemoveAuthToken } from '../../services/ApiSauce';
import Toast from 'react-native-simple-toast';
import { FloatingAction } from "react-native-floating-action";
import BottomSheet from '@gorhom/bottom-sheet';
import ChatScreen from '../../Components/ChatScreen';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import { GiftedChat } from 'react-native-gifted-chat'
import { BASE_URL } from '../../services/Config';
import Loader from '../../services/Loader';


const Home = ({ navigation }) => {
  const [coords, setCoords] = useState()
  const [loading, setLoading] = useState(false)
  const [bottomSheetIndex, setBottomSheetIndex] = useState()
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  // ref
    const refRBSheet = useRef();
  // const bottomSheetRef = useRef();
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['13%', '70%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    setBottomSheetIndex(index)
    console.log('handleSheetChanges', index);
  }, []);

  const [data, setData] = useState([])

  useEffect(() => {
    // Geolocation.getCurrentPosition(info => console.log(info));
    getCategory()
      Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            setCoords(position)
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
  }, [])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const getCategory = async () => {
    setLoading(true)
    const response = await Api.categoryList()
    const { success, data } = response;
    setLoading(false)
    if (success) {
      setData(data)
    }
  }

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  const actions = [
    {
      text: "Accessibility",
      icon: require("../../images/homebell.png"),
      name: "bt_accessibility",
      position: 2
    },
    {
      text: "Language",
      icon: require("../../images/homebell.png"),
      name: "bt_language",
      position: 1
    },
    {
      text: "Location",
      icon: require("../../images/homebell.png"),
      name: "bt_room",
      position: 3
    },
    {
      text: "Video",
      icon: require("../../images/homebell.png"),
      name: "bt_videocam",
      position: 4
    }
  ];

  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <StatusBar barStyle="dark-content"  backgroundColor="#F5F5F5"/>
      <Loader status = {loading}/>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 0, alignItems: 'center', }}>
        <TouchableOpacity onPress={() => {
          navigation.openDrawer()
        }} style={styles.crossImage}>
          <Image source={require('../../images/homemenu.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
        </TouchableOpacity>
          <Image source={require('../../images/homelogo.png')} style={{ width: 129, height: 40, resizeMode: 'contain' }} />
        <TouchableOpacity onPress={() => { navigation.navigate('Notification') }} style={styles.crossImage}>
          <Image source={require('../../images/homebell.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ marginTop: 20, }}>
          <FlatList
            data={data}
            numColumns={4}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => { 
                navigation.navigate("VendorList", {
                  vendor: item,
                  coords: coords
                })
               }} style={{ backgroundColor: '#FFF', width: '25%', height: 90, justifyContent: 'center', alignItems: 'center' }}>
                <ImageBackground source={require('../../images/ellipse.png')}>
                  <Image source={{ uri:item.icon.toString()}} style={{ width: 36, height: 36 }} />
                </ImageBackground>
                <Text style={{ color: '#000', marginTop: 5, fontFamily: 'Poppins' , fontSize:12 }}>{item.title}</Text>
                {/* <Text style={{color:'#000', marginTop:5, fontFamily:'Poppins'}}>{item.title}</Text> */}
              </TouchableOpacity>
            )}
          />
        </View>

        <LinearGradient
          colors={['#F55B54', '#FAAD3A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            padding: 10,
            marginHorizontal: 10,
            height: 170,
            borderRadius: 10,
            marginTop: 15,
          }}>
          <View>
            <Text style={{ fontSize: 24, fontWeight: '800', color: '#fff' }}>Grow your Business</Text>
            <Text style={{ fontSize: 16, color: '#fff', marginTop: 5 }}>List your business for FREE with India's leading local search engine</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
              {/* <FloatingAction
                        color={COLORS.blue}
                        position='right'
                        floatingIcon={require('../../images/fabicon.png')}
                        iconWidth={30}
                        buttonSize={70}
                        iconHeight={30}
                        actions={actions}
                        onPressItem={name => {
                            console.log(`selected button: ${name}`);
                        }}
                    /> */}
              <TouchableOpacity style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 8 }}><Text style={{ color: '#fff' }}>Call Us</Text></TouchableOpacity>
              <TouchableOpacity style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#FFF', borderRadius: 8, marginLeft: 10 }} onPress={() => { }}><Text style={{ color: '#F7754C' }}>Sign Up for Free</Text></TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
        {/* <View style={{backgroundColor:'#fff',  paddingVertical:20, borderTopLeftRadius:30, borderTopRightRadius:30, position:'absolute', bottom:0, width:'100%'}}>
                <TouchableOpacity onPress={()=>{refRBSheet.current.open()}}>
                    <View style={{height:5,width:'10%', alignSelf:'center',borderRadius:5, backgroundColor:'black', marginBottom:10, marginHorizontal:30}}></View>
                </TouchableOpacity> */}
        {/* <TextInput
                // value={state.mobile}
                // onChangeText={text => setState({ ...state, mobile: text.replace(/[^0-9]/g, '') })}
                style={{
                    borderRadius: 6,
                    borderColor: COLORS.lightGray,
                    borderWidth: 1,
                    marginHorizontal:10
                }}
                placeholder={'Mobile No.'}
                placeholderTextColor={'lightgray'}
                keyboardType={'number-pad'}
                // error={hasEmailErrors}
                maxLength={10}
                /> */}
        {/* <TouchableOpacity style={{backgroundColor:'#FB802A', width:}}>
                  <Image source={require('../../images/send.png')}/>
                </TouchableOpacity> */}
        {/* </View> */}
        <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={600}
                animationType={'fade'}
                minClosingHeight={10}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent",
                    },
                    draggableIcon: {
                        backgroundColor: "lightgray",
                        width:70
                    },
                    container:{
                        borderTopRightRadius:20,
                        borderTopLeftRadius:20,
                        minHeight:80
                    }
                }}>
                    <View style={{flexDirection:'row', borderBottomColor:'lightgray', borderBottomWidth:0.5, padding:10}}>
                      <Image style={{width:48, height:48}} source={require('../../images/executive.png')}/>
                      <View>
                        <Text style={{color:COLORS.profileBlackText}}>Mr. Kristin Watson</Text>
                        <Text style={{color:COLORS.lightGray}}>Profile Baba Executive</Text>
                      </View>
                    </View>
                    <ChatScreen/>
                    <View style={{flexDirection:'row', position: 'absolute',bottom: 0, marginBottom: 10, justifyContent:'space-between',marginHorizontal:10 }}>
                      <TextInput style={styles.textInput}></TextInput>
                      <Image source={require('../../images/sendorange.png')} style={{ width: 48, height: 48 }} />
                    </View>  
            </RBSheet>
        {/* <View style={styles.container}> */}
      </ScrollView>
      {/* <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        {(bottomSheetIndex === 0 &&
          <KeyboardAvoidingView style={styles.contentContainer}>
            <View style={{ flexDirection: 'row', flex: 1, borderColor: 'lightgray', borderWidth: 1, marginRight: 10, padding: 1, borderRadius: 10, alignItems: 'center' }}>
              <TextInput
                style={{ flex: 1, color: COLORS.lightBlack, fontFamily: 'Poppins-Medium' }}
                placeholder='Write your message'
                placeholderTextColor='lightgray'
              />
              <Image source={require('../../images/attachment.png')} style={{ width: 28, height: 28, marginRight: 10 }} />
              <TouchableOpacity onPress={() => { navigation.navigate('SearchLocation') }}>
                <Image source={require('../../images/bluelocation.png')} style={{ width: 28, height: 28, marginRight: 10 }} />
              </TouchableOpacity>
            </View>
            <Image source={require('../../images/sendorange.png')} style={{ width: 48, height: 48 }} />
          </KeyboardAvoidingView>
        )}

        <GiftedChat
          messages={messages}
          style={{ color: 'red' }}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </BottomSheet> */}
      {/* </View> */}
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  crossImage: {
    // marginTop: StatusBar.currentHeight,
    marginLeft: 20,
    alignItems: 'center',
    marginRight: 20,
    width: '10%',
    padding: 5,
    backgroundColor: '#FFF',
    borderRadius: 10
  },
  textInput: {
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
    // width: '80%',
    // paddingHorizontal: 15,
    // marginHorizontal: 10,
    // marginTop: 10,
    // position: 'absolute',
    // bottom: 0,
    // marginBottom: 10,
    marginRight:10,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    flex:2,
    backgroundColor: '#fff',
    borderColor: 'grey',
    color: '#000'
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
})