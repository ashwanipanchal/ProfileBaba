import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList, Modal } from 'react-native'
import React,{useEffect, useState, useRef} from 'react'
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import Loader from '../../services/Loader'
import { COLORS } from '../../Constant/Colors'
import LinearGradient from 'react-native-linear-gradient'
import RBSheet from "react-native-raw-bottom-sheet";

const VendorListForSkip = ({navigation, route}) => {

    const GOOGLE_PLACES_API_KEY = 'AIzaSyDMfsTk4NHW07RutlBqQ9hl95QtELwvCWk'
    const [modalOpen, setModalOpen] = useState(false);
    const [placeName, setPlaceName] = useState('');
    const [modalIndex, setModalIndex] = useState('');
    const [modalOpen1, setModalOpen1] = useState(false);
    const [newData, setNewData] = useState([]);
    const [userDetail, setUserDetail] = useState();
    const [seletedIndex, setSeletedIndex] = useState(0);
    const [sub_category, setSub_Category] = useState([]);
    const [Loading, setLoading] = useState(false)
    const refRBSheet = useRef();
    const refRBSheet2 = useRef();
    const [location, setLocation] = useState({});
    const [locationName, setLocationName] = useState('');

    useEffect(()=>{
        getCityNameFromLatLon()
        checkVendorAvalibility(location)
    },[])

    const getCityNameFromLatLon = async() => {
        setLoading(true)
        Geocoder.init('AIzaSyAUA0Tr4oFc_BNL9DEeVWayBDUcd2GeYxw');
        const response = await Geocoder.from(route.params.coords.coords.latitude, route.params.coords.coords.longitude);
        const cityArray = response.results[0].formatted_address.split(',');
        const city = cityArray[cityArray.length - 3]
        setPlaceName(city)
      }

    const checkVendorAvalibility = async (loc) => {
        const user = (await LocalStorage.getUserDetail() || '')
        const newUser = JSON.parse(user)
        let lat = 28.5960683
        let lng = 76.9994036
        if(Object.keys(location).length > 0) {
            lat = loc.lat
            lng = loc.lng
        }
        const body = {
          "category_id": route.params.vendor.id,
          "location": {
            "lat": lat,
            "lng": lng,
            // "name": 'Delhi'
          },
          "user_id": newUser.id
        }
        // alert(JSON.stringify(body,null,2))
        // return
        const response = await Api.getVendorList(body)
        const { success, data } = response;
        setLoading(false)
        if (success) {
            // alert(JSON.stringify(data,null,2))
            // return
          setNewData(data)
        } else {
          handleSheetOpen(2)
        //   Toast.show("No Vendor Found")
        //   alert("No Vendor Found")
          // setBottomSheetIndex(1)
          // handleSheetChanges(1)
          // snapPoints=()=>{['70%']}
          
          refRBSheet2.current.open()
          
        }
      }
  return (
     <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
          <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
          <Loader status={Loading}/>
          <View style={{ flexDirection: 'row', justifyContent:'space-between', marginTop: 0, alignItems: 'center' , width:'100%'}}>
              <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
                  <Image source={require('../../images/Add.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
              </TouchableOpacity>
              <Text style={{color:COLORS.orange, fontSize:20, fontWeight:'700', width:'50%', textAlign:'center'}}><Text style={{color:COLORS.blue}}>{route.params.vendor.title}</Text> in {locationName?locationName: placeName}</Text>
              <TouchableOpacity onPress={() => {navigation.navigate('SearchLocation',{onSelect:onSelect},{onSearch:onSearch})}} style={{marginRight:20, justifyContent:'flex-end'}} >
                  <Image source={require('../../images/locationicon.png')} style={{ width: 28, height: 28, resizeMode: 'contain' }} />
              </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={()=> {getSubCategory()}} style={{width:'90%', height:50, backgroundColor:'#FFF', alignSelf:'center', marginTop:15, borderRadius:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
            <Text style={{color:COLORS.lightBlack, marginLeft:15, fontSize:16, fontFamily:'Poppins-Regular'}}>Sub Categories</Text>
            <Image source={require('../../images/forwardarrow.png')} style={{width:24, height:24, marginRight:15}}/>
          </TouchableOpacity>
          <ScrollView>
            <FlatList
                data={newData}
                renderItem={({item,index})=>(
                    <View style={{flexDirection:'row', justifyContent:'space-between', backgroundColor:'#FFF', padding:10, marginBottom:2, alignItems:'center'}}>
                        <View style={{flex:1, flexDirection:'row'}}>
                        <Image source={require('../../images/avatar3.png')} style={{width:52, height:52, marginTop:8,resizeMode:'contain'}}/>
                        <View style={{justifyContent:'flex-start', marginLeft:10, width:'70%'}}>
                            <Text style={{color:COLORS.black, fontSize:18,}}>{item.business_name}</Text>
                            <View style={{flexDirection:'row', alignItems:'center', }}>
                                <Text style={{color:COLORS.orange}}>{route.params.vendor.title}</Text>
                                <Text style={{color:'gray', marginLeft:5}}>•  3.5</Text>
                                <Image source={require('../../images/star.png')} style={{width:16, height:16, marginLeft:10, marginTop:5}}/>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                              <View style={{flexDirection:'row', alignItems:'center'}}> 
                                <Image source={require('../../images/graylocation.png')} style={{width:16, height:16,  marginTop:5, marginRight:5}}/>
                                <Text style={{color:'gray'}}>{item.address.slice(0, 10)}...</Text>
                              </View>
                                <Text style={{color:'gray', marginLeft:5}}>•  {Math.round(item.distance)} Kms</Text>
                            </View>
                        </View>
                        </View>
                        
                        <View style={{flexDirection:'row', marginRight:10}}>
                            <TouchableOpacity onPress={()=>openCallModal(index)}>
                                <Image source={require('../../images/call.png')} style={{width:52, height:52, marginRight:15}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>openMessageModal(item,index)}>
                                <Image source={require('../../images/messagebig.png')} style={{width:52, height:52}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

          </ScrollView>
          <LinearGradient
              colors={['#F55B54', '#FAAD3A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                padding: 10,
                marginHorizontal: 10,
                height:100,
                borderRadius: 10,
                marginTop: 15,
                marginBottom:20
              }}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:24, color:'#fff'}}>Grow your {`\n`} Business</Text>
                    <View style={{}}>
                        <TouchableOpacity style={{paddingHorizontal:15,paddingVertical:10, backgroundColor:'#FFF', borderRadius:8, marginLeft:10}}><Text style={{color:'#F7754C'}}>Sign Up for Free</Text></TouchableOpacity>
                        <TouchableOpacity style={{paddingHorizontal:15,paddingVertical:10,  borderRadius:8, alignSelf:'center'}}><Text style={{color:'#fff'}}>Call Us</Text></TouchableOpacity>
                    </View>
                </View>
              </LinearGradient>
              <RBSheet
                ref={refRBSheet}
                height={500}
                animationType={'fade'}
                minClosingHeight={10}
                closeOnPressMask={true}
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
                    <ScrollView>
                  <FlatList
                      style={{ marginBottom: 20 }}
                      data={sub_category}
                      renderItem={({ item, index }) => {
                        const isSelected = seletedIndex === index ? 'checked' : 'unchecked';
                        return (
                        <View style={{backgroundColor: '#fff', padding: 10}}>
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={() => {
                            setSeletedIndex(index);
                            // navigation.goBack();
                            // route.params.onSelect(item);
                          }}>
                          <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <View style={{marginLeft: 10}}>
                              <RadioButton
                                status={isSelected}
                                onPress={() => {
                                  setSeletedIndex(index);
                                //   navigation.goBack();
                                //   route.params.onSelect(item);
                                }}
                              />
                            </View>
                            <Text style={{color:'#000'}}>{item.title}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>)
                                // <View style={{ flexDirection: 'row', borderBottomColor: 'lightgray', borderBottomWidth: 0.5, padding: 10 , marginHorizontal:20, alignItems:'center'}}>
                                //     <Image style={{ width: 48, height: 48 }} source={require('../../images/executive.png')} />
                                //     <Text style={{ color: COLORS.profileBlackText }}>{item.title}</Text>
                                // </View>
                    }} />
                    </ScrollView> 
            </RBSheet>

            {/* <RBSheet
                ref={refRBSheet2}
                // closeOnDragDown={true}
                height={600}
                keyboardAvoidingViewEnabled={true}
                animationType={'fade'}
                minClosingHeight={10}
                // closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(255,255,255,0.4)",
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
                    <ChatScreen/> */}
                    {/* <View style={{flexDirection:'row', position: 'absolute',bottom: 0, marginBottom: 10, justifyContent:'space-between',marginHorizontal:10 }}>
                      <TextInput style={styles.textInput}></TextInput>
                      <Image source={require('../../images/sendorange.png')} style={{ width: 48, height: 48 }} />
                    </View>   */}

                    {/* <TestChatScreen/> */}
            {/* </RBSheet> */}
            
            <Modal
                visible={modalOpen}
                transparent={true}
                onRequestClose={() => setModalOpen(false)}>
                <View style={styles.modal_View}>
                    <View activeOpacity={0.8} style={styles.modelMainBox}>
                        <Text style={{color:COLORS.black, fontSize:18, marginBottom:20,marginLeft:10 , marginTop:10}}>Message via</Text>
                        <TouchableOpacity onPress={()=>{
                          setModalOpen(false)
                          navigation.navigate('PersonalChat',{userDetail, client:newData[modalIndex]})
                          }} style={{flexDirection:'row', marginVertical:15, alignItems:'center',marginLeft:10 }}>
                            <Image source={require('../../images/modalmsg.png')} style={{width:40, height:40}}/>
                            <Text style={{color:COLORS.black, fontSize:18, marginLeft:10}}>Chat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {
                          setModalOpen(false)
                          Linking.openURL(`whatsapp://send?text=hello&phone=${newData[modalIndex].contact_number}`)
                          }} style={{flexDirection:'row',marginVertical:15,alignItems:'center',marginLeft:10}}>
                            <Image source={require('../../images/modalwhatsapp.png')} style={{width:40, height:40}}/>
                            <Text style={{color:COLORS.black, fontSize:18, marginLeft:10}}>Whats App</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                          setModalOpen(false)
                          Linking.openURL(`sms:${newData[modalIndex].contact_number}?body=yourMessage`)
                          }} style={{flexDirection:'row', marginVertical:15,alignItems:'center',marginLeft:10}}>
                            <Image source={require('../../images/modalmail.png')} style={{width:40, height:40}}/>
                            <Text style={{color:COLORS.black, fontSize:18, marginLeft:10}}>Text Message</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={modalOpen1}
                transparent={true}
                key={newData.index}
                onRequestClose={() => setModalOpen1(false)}>
                <View style={styles.modal_View}>
                    <View activeOpacity={0.8} style={styles.modelMainBox}>
                        <Text style={{color:COLORS.black, fontSize:18, marginBottom:20,marginLeft:10 , marginTop:10}}>Call via</Text>
                        <TouchableOpacity onPress={()=>{
                          setModalOpen(false)
                          Linking.openURL(`tel:${newData[modalIndex].contact_number}`)
                          }} style={{flexDirection:'row', marginVertical:15, alignItems:'center',marginLeft:10 }}>
                            <Image source={require('../../images/dialerbig.png')} style={{width:40, height:40}}/>
                            <Text style={{color:COLORS.black, fontSize:18, marginLeft:10}}>Phone Dialer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                          setModalOpen(false)
                          navigation.navigate('DialedCallScreen')
                        }} style={{flexDirection:'row',marginVertical:15,alignItems:'center',marginLeft:10}}>
                            <Image source={require('../../images/callbig.png')} style={{width:40, height:40}}/>
                            <Text style={{color:COLORS.black, fontSize:18, marginLeft:10}}>Internet Call</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
      </View>
  )
}

export default VendorListForSkip

const styles = StyleSheet.create({})