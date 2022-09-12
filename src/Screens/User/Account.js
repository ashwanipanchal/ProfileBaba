import { StyleSheet, Text, TouchableOpacity, View, Image, StatusBar, ScrollView, FlatList, TextInput, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import { COLORS } from '../../Constant/Colors'
import { Button } from 'react-native-paper'
import { BASE_URL } from '../../services/Config'
import { ButtonStyle } from '../../Custom/CustomView'
import { LocalStorage } from '../../services/Api'
import Loader from '../../services/Loader'
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';


const Account = ({navigation}) => {
  const [editText1, setEditText1] = useState(false)
  const [editText2, setEditText2] = useState(false)
  const [editText3, setEditText3] = useState(false)
  const [editText4, setEditText4] = useState(false)
  const [profileImage, setProfileImage] = useState()
  const [updateName, setUpdateName] = useState('')
  const [updateEmail, setUpdateEmail] = useState('')
  const [updatePassword, setUpdatePassword] = useState('')
  const [userData, setUserData] = useState()
  const [Loading, setLoading] = useState(false)
  const [data, setData] = useState([
    {
      name: 'Name',
      value: 'Albert Flores',
    },
    {
      name: 'E-mail',
      value: 'AlbertFlores@gmail.com',
    },
    {
      name: 'Mobile Number',
      value: '1234567890',
    },
    {
      name: 'Change Password',
      value: '***********',
    },
  ])

  useEffect(()=>{
    // alert(`${BASE_URL}user-profile/5894`)
    getProfile()
  },[])

  const getProfile = async() => {
    setLoading(true)
    const user = (await LocalStorage.getUserDetail()||'')
    const token = (await LocalStorage.getToken()||'')
    const newUser = JSON.parse(user)
    // alert(JSON.stringify(newUser,null,2))
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
    if(res.success){
      setUserData(res.data)
      setLoading(false)
      // alert(JSON.stringify(res,null,2))
    }
  }

  const onImageOptionHandler = async(type) => {
 
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      })
        if(response){
          console.log("document picker response ==", response)
          const res=  response.uri.replace('content://', 'file:///data/user/0/')
         console.log(res)
          // alert(JSON.stringify(response,null,2))
          setProfileImage(response)
          // uploadImage()
        }
        setLoading(true)
        // setTimeout(()=>{
        //   uploadImage()
        // },3000)


        var formData = new FormData()
        formData.append('profile_pic',{
          uri: response.uri,
          type: response.type,
          name: response.name,
        })
        // setLoading(true)
        const user = (await LocalStorage.getUserDetail()||'')
        const newUser = JSON.parse(user)
        const token = (await LocalStorage.getToken()||'')
        const btoken = `Bearer ${token}`;
        // alert(JSON.stringify(btoken,null,2))
        // return
        const response1 = await fetch(`${BASE_URL}edit-user-profile/${newUser.id}`,{
          method:'POST',
          headers:{
            "Accept": "application/json",
            "Content-Type" : "multipart/form-data",
            "Authorization": btoken,
          },
          body: formData
        })
        const res = await response1.json()
        // alert(JSON.stringify(res,null,2))
        if(res.success){
          // setLoading(false)
          getProfile()
        }else{
          // setLoading(false)
          Toast.show("Network Error: Try Again Later")
        }

        setLoading(false)
    } catch (error) {
      console.log(error)
    }
  };

  const uploadImage= async() => {
    if(profileImage){
    // alert(JSON.stringify(profileImage,null,2))
    var formData = new FormData()
        formData.append('profile_pic',{
          uri: profileImage.uri,
          type: profileImage.type,
          name: profileImage.name,
        })
        setLoading(true)
        const user = (await LocalStorage.getUserDetail()||'')
        const newUser = JSON.parse(user)
        const token = (await LocalStorage.getToken()||'')
        const btoken = `Bearer ${token}`;
        // alert(JSON.stringify(btoken,null,2))
        // return
        const response = await fetch(`${BASE_URL}edit-user-profile/${newUser.id}`,{
          method:'POST',
          headers:{
            "Accept": "application/json",
            "Content-Type" : "multipart/form-data",
            "Authorization": btoken,
          },
          body: formData
        })
        const res = await response.json()
        // alert(JSON.stringify(res,null,2))
        if(res.success){
          setLoading(false)
          navigation.replace('Account')
        }else{
          setLoading(false)
          Toast.show("Network Error: Try Again Later")
        }
      }
  }

  const updateProfile = async(item) => {
    // if(!updateName){
    //   Toast.show('')
    // }
    setLoading(true)
    const user = (await LocalStorage.getUserDetail()||'')
    const newUser = JSON.parse(user)
    const token = (await LocalStorage.getToken()||'')
    const btoken = `Bearer ${token}`;
    let formBody = [];
    for (var property in item) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(item[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    const response = await fetch(`${BASE_URL}edit-user-profile/${newUser.id}`,{
      method:'POST',
      headers:{
        "Accept": "application/json",
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        "Authorization": btoken,
      },
      body:formBody
    })
    const res = await response.json()
    if(res.success){
      setLoading(false)
      getProfile()
    }
  }

  return (
    <View style={{flex:1, backgroundColor:'#E5E5E5'}}>
      <StatusBar barStyle="dark-content"  backgroundColor="#E5E5E5"/>
      <View style={{ flexDirection: 'row', marginBottom:30 }}>
      <TouchableOpacity onPress={() => {  navigation.goBack()}} style={styles.crossImage}>
        <Image source={require('../../images/Add.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
      </TouchableOpacity>
      <Image source={require('../../images/youraccount.png')} style={{ marginTop: 0, marginLeft: 10, width: 150, height: 40,  resizeMode: 'contain' }} />
      </View>
      <Loader status={Loading}/>
      <ScrollView>
        {(userData && 
        <View style={{marginHorizontal:20}}>
          <ImageBackground imageStyle={{resizeMode:'contain', borderRadius:20}} style={{width:'100%', height:330, resizeMode:'contain', marginHorizontal:2, alignSelf:'center', marginBottom:10,}} source={ userData.profile_pic.length > 0 ? {uri: `http://testing.profilebaba.com/uploads/users/${userData.profile_pic}`} : require('../../images/default-user-image.png')}>
            <TouchableOpacity onPress={()=> onImageOptionHandler()}>
              <Image source={require('../../images/changeprofilepic.png')} style={{width:36, height:36, position:'absolute', right:15, top:10}}/>
            </TouchableOpacity>
          </ImageBackground>
        </View> )}
        
        
        {/* <Image style={{width:28, height:28, resizeMode:'contain'}} source={require('../../images/changeprofilepic.png')}/> */}
        {(userData && <View>
          <Text style={{color:COLORS.lightBlack, fontSize:22, marginLeft:30, fontWeight:'800'}}>{userData.name} <Text style={{color:COLORS.onlineGreen,}}> •</Text></Text>
          <Text style={{color:COLORS.lightGray, fontSize:16, marginLeft:30,}}>{userData.email} </Text>
          <View style={{height:1, borderRadius:5, backgroundColor:'lightgray', marginTop:15,marginHorizontal:30}}></View>
        </View> )}
        
        <Text style={{color:COLORS.black, marginTop:16, marginLeft:30, fontSize:20, marginBottom:20}}>Account Settings</Text>
        {(userData &&
        <View>
        <View style={{ marginHorizontal: 30, backgroundColor: COLORS.white, paddingVertical: 15, paddingHorizontal: 5, borderRadius: 10, marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <View>
              <Text style={{ color: COLORS.profileBlackText, marginLeft: 10, fontSize: 18, marginBottom: 5 }}>Name</Text>
              <Text style={{ color: '#9797AA', marginLeft: 10, fontSize: 14, marginBottom: 5 }}>{userData.name}</Text>
            </View>
            <TouchableOpacity onPress={() => setEditText1(!editText1)}>
              <Image style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 5 }} source={require('../../images/editicon.png')} />
            </TouchableOpacity>
          </View>
          {editText1 ? (
                <View>
                <TextInput
                  value={updateName}
                  onChangeText={text => setUpdateName( {name: text})}
                  style={styles.textInput}
                  placeholder={'Name'}
                  placeholderTextColor={'lightgray'}
                  // keyboardType={'number-pad'}
                  // error={hasEmailErrors}
                  // maxLength={10}
                  /> 
                  <ButtonStyle
                    onPress={()=> updateProfile(updateName)}
                    title={'Update'}
                    borderRadius={10}
                  />
              </View>   
              ):null}
        </View>
        <View style={{ marginHorizontal: 30, backgroundColor: COLORS.white, paddingVertical: 15, paddingHorizontal: 5, borderRadius: 10, marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <View>
              <Text style={{ color: COLORS.profileBlackText, marginLeft: 10, fontSize: 18, marginBottom: 5 }}>Email</Text>
              <Text style={{ color: '#9797AA', marginLeft: 10, fontSize: 14, marginBottom: 5 }}>{userData.email}</Text>
            </View>
            <TouchableOpacity onPress={() => setEditText2(!editText2)}>
              <Image style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 5 }} source={require('../../images/editicon.png')} />
            </TouchableOpacity>
          </View>
          {editText2 ? (
                <View>
                <TextInput
                  value={updateEmail}
                  onChangeText={text => setUpdateEmail( {email: text})}
                  // onChangeText={text => setState({ ...state, mobile: text.replace(/[^0-9]/g, '') })}
                  style={styles.textInput}
                  placeholder={'Email'}
                  placeholderTextColor={'lightgray'}
                  keyboardType={'email-address'}
                  // error={hasEmailErrors}
                  // maxLength={10}
                  /> 
                  <ButtonStyle
                    onPress={()=> updateProfile(updateEmail)}
                    title={'Update'}
                    borderRadius={10}
                  />
              </View>   
              ):null}
        </View>
        <View style={{ marginHorizontal: 30, backgroundColor: COLORS.white, paddingVertical: 15, paddingHorizontal: 5, borderRadius: 10, marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <View>
              <Text style={{ color: COLORS.profileBlackText, marginLeft: 10, fontSize: 18, marginBottom: 5 }}>Change Password</Text>
              <Text style={{ color: '#9797AA', marginLeft: 10, fontSize: 14, marginBottom: 5 }}>*****</Text>
            </View>
            <TouchableOpacity onPress={() => setEditText4(!editText4)}>
              <Image style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 5 }} source={require('../../images/editicon.png')} />
            </TouchableOpacity>
          </View>
          {editText4 ? (
                <View>
                <TextInput
                  value={updatePassword}
                  onChangeText={text => setUpdatePassword( {password: text})}
                  // value={state.mobile}
                  // onChangeText={text => setState({ ...state, mobile: text.replace(/[^0-9]/g, '') })}
                  style={styles.textInput}
                  placeholder={'Password'}
                  placeholderTextColor={'lightgray'}
                  secureTextEntry
                  // keyboardType={'number-pad'}
                  // error={hasEmailErrors}
                  // maxLength={10}
                  /> 
                  <ButtonStyle
                    onPress={()=> updateProfile(updatePassword)}
                    title={'Update'}
                    borderRadius={10}
                  />
              </View>   
              ):null}
        </View>
        </View>
        )}
      </ScrollView>
    </View>
  )
}

export default Account

const styles = StyleSheet.create({
    crossImage: {
        marginTop: 0,
        marginLeft: 20,
        width: '10%',
        padding: 5,
        backgroundColor:'#fff',
        borderRadius:10
      },
      textInput: {
        borderRadius: 6,
        borderWidth: 1,
        padding: 10,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '600',
        backgroundColor: '#fff',
        borderColor: 'grey',
        color: '#000'
      },
})