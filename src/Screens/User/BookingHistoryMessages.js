import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React,{useState} from 'react'
import { COLORS } from '../../Constant/Colors'

const BookingHistoryMessages = () => {
    const [data, setData] = useState([
        {
            name: 'Raj Verma',
            category: 'Plumber',
            address: 'Noida Sector 40',
            message:'Deal Completed',
            time:'12:50 PM',
            image: require('../../images/avatar1.png'),
            icon: require('../../images/mailicon.png')
        },
        {
            name: 'Nihar Verma',
            category: 'Plumber',
            address: 'Noida Sector 40',
            message:'Follow up you',
            time:'12:50 PM',
            image: require('../../images/avatar3.png'),
            icon: require('../../images/message.png')
        },
        {
            name: 'Sarover Verma',
            category: 'Plumber',
            address: 'Noida Sector 40',
            message:'Not Intrested',
            time:'12:50 PM',
            image: require('../../images/avatar2.png'),
            icon: require('../../images/whatsappicon.png')
        },
        {
            name: 'Sarover Verma',
            category: 'Plumber',
            address: 'Noida Sector 40',
            message:'Not Intrested',
            time:'12:50 PM',
            image: require('../../images/avatar2.png'),
            icon: require('../../images/mailicon.png')
        },
        {
            name: 'Sarover Verma',
            category: 'Plumber',
            address: 'Noida Sector 40',
            message:'Not Intrested',
            time:'12:50 PM',
            image: require('../../images/avatar2.png'),
            icon: require('../../images/mailicon.png')
        },
        {
            name: 'Sarover Verma',
            category: 'Plumber',
            address: 'Noida Sector 40',
            message:'Not Intrested',
            time:'12:50 PM',
            image: require('../../images/avatar2.png'),
            icon: require('../../images/whatsappicon.png')
        },
        {
            name: 'Sarover Verma',
            category: 'Plumber',
            address: 'Noida Sector 40',
            message:'Not Intrested',
            time:'12:50 PM',
            image: require('../../images/avatar2.png'),
            icon: require('../../images/whatsappicon.png')
        },
        {
            name: 'Sarover Verma',
            category: 'Plumber',
            address: 'Noida Sector 40',
            message:'Not Intrested',
            time:'12:50 PM',
            image: require('../../images/avatar2.png'),
            icon: require('../../images/mailicon.png')
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
                            {/* <Text style={{color:'#000', color: COLORS.orange, fontSize:15, marginBottom:5}}>{item.category} <Text style={{color:'gray'}}>• {item.address}</Text> </Text> */}
                            <Text style={{color:'gray', fontSize:15}}>{item.message}</Text>
                        </View>
                        </View>
                        <View style={{paddingVertical:20, alignItems:'flex-end', marginRight:20}}>
                        <Text style={{color:'gray', marginBottom:10}}>{item.time}</Text>
                        <Image source={item.icon} style={{width:20, height:20, resizeMode:'contain'}}/>
                        </View>
                    </View>
                )}
            />
    </View>
  )
}

export default BookingHistoryMessages

const styles = StyleSheet.create({})