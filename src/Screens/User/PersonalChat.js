import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
import React,{useRef} from 'react'
import { COLORS } from '../../Constant/Colors'
import { useEffect,useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { LocalStorage } from '../../services/Api'
import firestore from '@react-native-firebase/firestore'
import Toast from 'react-native-simple-toast';

const PersonalChat = ({navigation,route}) => {
  const flatList = useRef();
  const [messages, setMessages] = useState([]);
  const [EachMessages, setEachMessages] = useState('');
  const [userID, setUserID] = useState();
  useEffect(()=>{
    getUser()
    
    // alert(JSON.stringify(route.params,null,2))
  },[])

  useEffect(() => {
    if(userID) {
      getUserChat()
    }
  }, [userID])

  const getUser = async () => {
    const user = (await LocalStorage.getUserDetail() || '')
    const newUser = JSON.parse(user)
    setUserID(newUser.id)
  }
  const getUserChat = async() => {
    const docId = route.params.userDetail.user_id > userID ? userID+"-"+ route.params.userDetail.user_id : route.params.userDetail.user_id+"-"+userID 
    // alert(docId)
    const ruffchats = await firestore().collection('chatroom').doc(docId).collection('messages').orderBy('createdAt','asc').get()
      const chats = ruffchats.docs.map((item)=> {
        return {
          ...item.data(),
          createdAt:item.data().createAt.toDate()
        }
      })
      // alert(JSON.stringify(chats,null,2))
      console.log(chats)
      setMessages(chats) 
  }

  const sendMessage = async() => {
    if(!EachMessages){
      Toast.show("Write your message")
      return
    }
    const msg = {
      'message' : EachMessages,
      'sendBy' :  userID,
      'sendTo': route.params.userDetail.user_id,
      'createdAt' : new Date()
    }
    setEachMessages('')
    setMessages(prevState => [...prevState, msg])
    const docId = route.params.userDetail.user_id > userID ? userID+"-"+ route.params.userDetail.user_id : route.params.userDetail.user_id+"-"+userID 
    firestore().collection('chatroom').doc(docId).collection('messages').add({...msg, createAt:firestore.FieldValue.serverTimestamp()})
  }

  function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }


  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{ flexDirection: 'row', justifyContent:'space-between', marginTop: 0, alignItems: 'center' , width:'100%'}}>
              <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
                  <Image source={require('../../images/Add.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
              </TouchableOpacity>
              <Text style={{color:COLORS.orange, fontSize:20, fontWeight:'700', width:'100%', textAlign:'left', }}><Text style={{color:COLORS.blue}}>Chat</Text> with {route.params.userDetail.business_name}</Text>
          </View>
          <FlatList
              data={messages}
              ref={flatList}
              onContentSizeChange={() => flatList?.current?.scrollToEnd({ animated: true })}
              renderItem={({item})=> (
                <View>
                  {/* <View style={{alignItems:'center', }}>
                    <Text style={{color:'gray',backgroundColor:'#FFF', padding:5, borderRadius:5}}>{new Date(item.createAt.seconds * 1000).toLocaleDateString("en-IN")}</Text> 
                  </View> */}
                  {item.sendBy === userID?
                    (
                      <View style={{fontFamily:'Poppins', alignItems:'flex-end',}}>
                        <Text style={{color:'white',  backgroundColor:COLORS.blue, paddingHorizontal:20, paddingVertical:10, marginHorizontal:10, marginVertical:5, borderRadius:10}}>{item.message}</Text>
                        {/* <Text style={{color:'gray',marginHorizontal:10, fontSize:10}}>{tConvert(new Date(item.createAt.seconds * 1000).toLocaleTimeString("en-IN"))}</Text> */}
                      </View>
                    ) :
                    (
                      <View style={{fontFamily:'Poppins', alignSelf:'flex-start',}}>
                        <Text style={{color:'black',  backgroundColor:'lightgray', paddingHorizontal:20, paddingVertical:10, margin:10, borderRadius:10}}>{item.message}</Text>
                        {/* <Text style={{color:'gray',marginHorizontal:10, fontSize:10}}>{item.createAt.seconds}</Text> */}
                      </View>
                    )
                  }  
                </View>
              )}
            />
          <View style={{ flexDirection: 'row', marginVertical:10, marginHorizontal:10, }}>
            <TextInput
             style={styles.textInput}
             value={EachMessages}
              onChangeText={text => setEachMessages(text)} 
              placeholder={'Write your message here...'}
              placeholderTextColor='lightgray'
            ></TextInput>
            <TouchableOpacity onPress={()=>{sendMessage()}}>
              <Image source={require('../../images/sendorange.png')} style={{ width: 48, height: 48, marginRight:10 }} />
            </TouchableOpacity>
          </View> 
    </SafeAreaView>
  )
}

export default PersonalChat

const styles = StyleSheet.create({
  crossImage: {
    // marginTop: StatusBar.currentHeight,
    marginLeft: 20,
    alignItems:'center',
    marginRight:15,
    width: '10%',
    padding: 5,
    backgroundColor:'#FFF',
    borderRadius:10
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
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    flex:2,
    backgroundColor: '#fff',
    borderColor: 'grey',
    color: '#000'
  },
})