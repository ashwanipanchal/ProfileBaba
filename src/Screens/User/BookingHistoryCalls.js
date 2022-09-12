import { StyleSheet, Text, View,FlatList, Image } from 'react-native'
import React,{useState} from 'react'
import { COLORS } from '../../Constant/Colors'

const BookingHistoryCalls = () => {
    const [data, setData] = useState([
        {
            name: 'Raj Verma',
            category: 'Plumber',
            address: 'Noida Sector 40',
            message:'Deal Completed',
            time:'Apr 5, 12:50 PM',
            image: require('../../images/avatar1.png'),
            icon: require('../../images/phonedialericon.png'),
            callIcon: require('../../images/incomingcallicon.png')
        },
        {
            name: 'Nihar Verma',
            category: 'Plumber',
            address: 'Noida Sector 40',
            message:'Follow up you',
            time:'Apr 5, 12:50 PM',
            image: require('../../images/avatar3.png'),
            icon: require('../../images/numberdialericon.png'),
            callIcon: require('../../images/misscallicon.png')
        },       
        {
            name: 'Raj Verma',
            category: 'Whitewah',
            address: 'Noida Sector 40',
            message:'Deal Completed',
            time:'Apr 5, 12:50 PM',
            image: require('../../images/avatar1.png'),
            icon: require('../../images/phonedialericon.png'),
            callIcon: require('../../images/dialedcallicon.png')
        },
        {
            name: 'Nihar Verma',
            category: 'Plumber',
            address: 'Noida Sector 40',
            message:'Follow up you',
            time:'Apr 5, 12:50 PM',
            image: require('../../images/avatar3.png'),
            icon: require('../../images/numberdialericon.png'),
            callIcon: require('../../images/misscallicon.png')
        },       
    ])
  return (
    <View style={{flex:1}}>
    <FlatList
             data={data}
             renderItem={({item})=>(
                 <View style={{ flexDirection:'row', backgroundColor:'#FFF', marginBottom:2, justifyContent:'space-between' }}>
                     <View style={{ flexDirection:'row',}}>
                     <Image source={item.image} style={{width:52, height:52, resizeMode:'contain', alignSelf:'center', marginLeft:20}}/>
                     <View style={{marginLeft:15, paddingVertical:20}}>
                        <Text style={{color:'#000', fontSize:20, fontFamily:'Poppins', marginBottom:5}}>{item.name}</Text>
                        <View style={{flexDirection:'row'}}>
                        <Image source={item.callIcon} style={{width:28, height:28, resizeMode:'contain'}}/><Text style={{color:'gray', fontSize:14, marginBottom:5}}>{item.time} •<Text style={{color: COLORS.orange, }}> {item.category}</Text> </Text>
                        </View>
                         {/* <Text style={{color:'#000', fontSize:15}}>{item.message}</Text> */}
                     </View>
                     </View>
                     <View style={{paddingVertical:20, alignItems:'flex-end', marginRight:20, justifyContent:'center'}}>
                     {/* <Text style={{color:'gray', marginBottom:10}}>{item.time}</Text> */}
                     <Image source={item.icon} style={{width:28, height:28, resizeMode:'contain'}}/>
                     </View>
                 </View>
             )}
         />
 </View>
  )
}

export default BookingHistoryCalls

const styles = StyleSheet.create({})