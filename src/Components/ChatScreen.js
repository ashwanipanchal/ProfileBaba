import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React,{useState, useEffect, useCallback} from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { Api, LocalStorage } from '../services/Api';
import { BASE_URL } from '../services/Config';
import { FlatList } from 'react-native-gesture-handler';
import { COLORS } from '../Constant/Colors';
import moment from 'moment'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [EachMessages, setEachMessages] = useState('');
  const [userID, setUserID] = useState();

  useEffect(()=>{
    // getUserID()
    getAdminChat()
  },[])

  const getAdminChat = async () => {
    const user = (await LocalStorage.getUserDetail() || '')
    const token = (await LocalStorage.getToken() || '')
    const newUser = JSON.parse(user)
    setUserID(newUser.id)
    // alert(JSON.stringify(user,null,2))
    const btoken = `Bearer ${token}`;
    const response = await fetch(`${BASE_URL}get-admin-chat/${newUser.id}`, {
    // const response = await fetch(`${BASE_URL}get-chat-history/2`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": btoken,
      }
    })
    const res = await response.json()
    // alert(JSON.stringify(res,null,2))
    const newDate = res.data[0].history.map((i)=>{
      let date = moment(i.created_at).format('DD/MMM/yyyy')
      let time = moment(i.created_at).format('h:mm a');
      
      return {...i, time, date}
    })
    // alert(JSON.stringify(newDate,null,2))
    setMessages(newDate)
    // alert(JSON.stringify(res.data[0].history, null, 2))
    
    console.log(date)
    return
    
    const newMapData = [];
    for (let value of res.data) {
      if(value.sender_id === userID){

        newMapData.push({_id : value.sender_id, text: value.message, createdAt: value.created_at, });
      }else{
        newMapData.push({_id : userID, text: value.message, createdAt: value.created_at, });
      }
    }
    alert(JSON.stringify(newMapData, null, 2))
    // setMessages([
      
    //   ])
    // setMessages(...res.data.history, user={_id: 2})
  }

  // alert(JSON.stringify(messages, null, 2))
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  // const getUserID = async() => {
  //   const user = (await LocalStorage.getUserDetail()||'')
  //   const newUser = JSON.parse(user)
  //   setUserID(newUser.id)
  // }
  const sendChatToAdmin = async() => {
    const body = {
      "user_id":userID,
      "message":EachMessages
     }
    //  alert(JSON.stringify(messages,null,2))
    const response = await Api.sendchattoadmin(body)
    setEachMessages('')
    const {success} = response
    if(success){
      getAdminChat()
    }
  }

  return (
          // <GiftedChat
          //     messages={messages}
          //     onSend={messages => onSend(messages)}
          //     user={{
          //         _id: userID,
          //     }}
          // />
          <>
          <KeyboardAwareScrollView >
            <FlatList
              data={messages}
              renderItem={({item})=> (
                <View>
                  {/* {item.date === item.date? <Text style={{color:'black'}}>Hi</Text> : <Text style={{color:'black'}}>Hello</Text>} */}
                  {/* <View>
                    <Text style={{color:'black'}}>{item.date}</Text>
                  </View> */}
                  {item.sender === 'user'?
                    (
                      <View style={{fontFamily:'Poppins', alignItems:'flex-end',}}>
                        <Text style={{color:'white',  backgroundColor:COLORS.blue, paddingHorizontal:20, paddingVertical:10, marginHorizontal:10, marginVertical:5, borderRadius:10}}>{item.message}</Text>
                        <Text style={{color:'gray',marginHorizontal:10, fontSize:10}}>{item.time}</Text>
                      </View>
                    ) :
                    (
                      <View style={{fontFamily:'Poppins', alignSelf:'flex-start',}}>
                        <Text style={{color:'black',  backgroundColor:'lightgray', paddingHorizontal:20, paddingVertical:10, margin:10, borderRadius:10}}>{item.message}</Text>
                        <Text style={{color:'gray',marginHorizontal:10, fontSize:10}}>{item.time}</Text>
                      </View>
                    )
                  }  
                </View>
              )}
            />
            </KeyboardAwareScrollView>
          {/* <View style={{ flexDirection: 'row', marginVertical:10}}>
            <TextInput
             style={styles.textInput}
             value={EachMessages}
              onChangeText={text => setEachMessages(text)} 
              placeholder={'Write your message here...'}
              placeholderTextColor='lightgray'
            ></TextInput>
            <TouchableOpacity onPress={()=>sendChatToAdmin()}>
              <Image source={require('../images/sendorange.png')} style={{ width: 48, height: 48, marginRight:10 }} />
            </TouchableOpacity>
          </View>   */}
          </>
          
          
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
    flex:1,
    // width:'90%',
    // paddingHorizontal: 15,
    marginHorizontal: 10,
    // marginTop: 10,
    // marginBottom: 10,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    backgroundColor: '#fff',
    borderColor: 'grey',
    color: '#000'
  },
})