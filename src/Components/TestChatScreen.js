import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React,{useState, useEffect, useCallback} from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore'
import firebase from '@react-native-firebase/app'
import { LocalStorage } from '../services/Api'
import { COLORS } from '../Constant/Colors'

const TestChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
      useEffect(() => {
    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       // avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    // ])
    getUser()
    // getUserID()
    // const subscribe = firestore().collection('chatId').onSnapshot((snapshot)=>{
    //     snapshot.docChanges().forEach((change)=> {
    //       console.log(change)
    //         if(change.type == 'added'){
    //             let data = change.doc.data;
    //             // data.createdAt = data.createdAt.toDate()
    //             setMessages((prevMessages) => GiftedChat.append(prevMessages, data))
    //         }
    //     })
    // })
    // return()=> subscribe()

  //   const cc= firestore().collection('chatId').get().then(collectionSnapshot => {
  //     console.log('Total users: ', collectionSnapshot.size);
  //     collectionSnapshot
  //         .forEach(documentSnapshot => {
  //             console.log('User ID: ', documentSnapshot.id,
  //             documentSnapshot.data());
  //             setMessages((prevMessages) => GiftedChat.append(prevMessages, documentSnapshot.data()))
  //         });
  // });
    // console.log(cc)
    
  }, [])
  // const onSend = useCallback((messages = []) => {
  //   setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  // }, [])
    function onSend(messages = []){
      // console.log(messages)
      firestore().collection('chatId').doc(Date.now().toString()).set(messages[0])
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }

    const getUser = async() => {
      setIsLoading(true)
      const cc= firestore().collection('chatId').get().then(collectionSnapshot => {
        console.log('Total users: ', collectionSnapshot.size);
        let timestemp;
        collectionSnapshot
            .forEach(documentSnapshot => {
              // console.log(documentSnapshot.data().createAt())
                console.log('User ID: ', documentSnapshot.id,
                {...documentSnapshot.data(), createdAt : new Date(documentSnapshot.data().createdAt.seconds*1000)}
                );
                setMessages((prevMessages) => GiftedChat.append(prevMessages, documentSnapshot.data()))
            });
      });
      setIsLoading(false)
      console.log(cc)
    }
    const getUserID = async() => {
      const user = (await LocalStorage.getUserDetail()||'')
      const newUser = JSON.parse(user)
    }
    if(isLoading){
      return <ActivityIndicator size="large" color={COLORS.orange} />
    }
  return (
      <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
              _id: 1,
          }}
      />
  )
}

export default TestChatScreen

const styles = StyleSheet.create({})