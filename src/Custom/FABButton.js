import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FABButton = () => {
  return (
    <View style={styles.container}>
      <Text>FABButton</Text>
    </View>
  )
}

export default FABButton

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})