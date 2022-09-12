import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import { COLORS } from '../../Constant/Colors'
import BookingHistoryMessages from './BookingHistoryMessages'
import BookingHistoryCalls from './BookingHistoryCalls'

const BookingHistory = ({navigation}) => {
    const [active, setActive] = useState('message')
    const [data, setData] = useState([
        {key:1, value: 'Messages'},
        {key:2, value: 'Calls'},
    ])
    const [select, setSelect] = useState(0)
  return (
    <View style={{flex:1, backgroundColor:'#F5F5F5'}}>
    <StatusBar barStyle="dark-content"  backgroundColor="#F5F5F5"/>
        <View style={{ flexDirection: 'row', marginBottom:30 }}>
            <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
                <Image source={require('../../images/arrowback.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
            </TouchableOpacity>
            <Image source={require('../../images/bookinghistory.png')} style={{ marginTop: 0, marginLeft: 10, width: 150, height: 40, alignSelf: 'center', resizeMode: 'contain' }} />
        </View>
        {/* <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity style={{backgroundColor:COLORS.blue, width:'40%', justifyContent:'center', alignItems:'center', marginHorizontal:10, paddingVertical:16, borderRadius:10}}>
                <Text style={{color:COLORS.white, fontSize:18, fontWeight:'700'}}>Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:COLORS.white, width:'40%', justifyContent:'center', alignItems:'center', marginHorizontal:10, paddingVertical:16, borderRadius:10}}>
                <Text style={{color:COLORS.black, fontSize:18, fontWeight:'700'}}>Calls</Text>
            </TouchableOpacity>
        </View> */}
        <View>
        <FlatList
            numColumns={2}
            // keyExtractor={item => item.id}
            data={data}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{width:'45%', marginHorizontal:10, marginBottom:30}}
                onPress={() => setSelect(index)}>
                <View
                  style={{
                    backgroundColor: index == select ? COLORS.blue:COLORS.white , 
                    justifyContent:'center', 
                    alignItems:'center',
                    marginHorizontal:5, 
                    paddingVertical:16,
                    borderRadius:10
                    }}
                  >
                  <Text
                    style={{
                      fontFamily: 'Poopins',
                      fontSize: 18,
                      fontWeight: '900',
                      color: index == select ? COLORS.white : COLORS.black,
                      textAlign: 'center',
                    }}>
                    {item.value}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        
          <ScrollView>
            {select === 0 ? <BookingHistoryMessages/>: <BookingHistoryCalls/>}
          </ScrollView>
    </View>
  )
}

export default BookingHistory

const styles = StyleSheet.create({
    crossImage: {
        marginTop: 0,
        marginLeft: 20,
        width: '10%',
        padding: 5,
        // backgroundColor:'red'
        padding: 5,
        backgroundColor:'#FFF',
        borderRadius:10
      },
})