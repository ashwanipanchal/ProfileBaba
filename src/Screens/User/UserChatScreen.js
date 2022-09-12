import { StyleSheet, Text, View, Button } from 'react-native'
import React,{useEffect, useState, useCallback } from 'react'
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat'
const UserChatScreen = () => {
    const [messages, setMessages] = useState([]);
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
     
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const customtInputToolbar = props => {
      return (
        <InputToolbar
          {...props}
          containerStyle={{

          }}
        />
      );
    };
  return (
    <GiftedChat
              messages={messages}
              renderInputToolbar={customtInputToolbar}
              onSend={messages => onSend(messages)}
              user={{
                  _id: 1,
              }}
          />
  )
}

export default UserChatScreen

const styles = StyleSheet.create({})