import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { COLORS } from '../Constant/Colors';

const SearchBar = ({navigation}) => {
    const GOOGLE_PLACES_API_KEY = 'AIzaSyDMfsTk4NHW07RutlBqQ9hl95QtELwvCWk'
  return (
    <View style={{flexDirection:'row'}}>
        <GooglePlacesAutocomplete
        placeholder="Search"
        //   keyboardShouldPersistTaps='handled'
        query={{
            key: GOOGLE_PLACES_API_KEY,
            language: 'en', // language of the results
        }}
        renderRightButton={()=>{<View><Image style={{width:24, height:24, marginRight:10}}  source={require('../images/locationicon.png')}/></View>}}
      styles={{
        container:{
            flex:1,
            marginHorizontal:10,
            backgroundColor:'transparent'
        },
        textInput: {
            height: 42,
            //   color: '#000',
            borderColor:COLORS.lightGray,
            borderWidth:1,
            paddingVertical:10,
            backgroundColor: 'transparent',
            fontSize: 16,
        },
    
        }}
        // enablePoweredByContainer={false}
        onPress={(data, details = null) => navigation.navigate("Home") }
        onFail={(error) => console.error(error)}
    // this in only required for use on the web. See https://git.io/JflFv more for details.
    />
    </View>   
  )
}

export default SearchBar

const styles = StyleSheet.create({})