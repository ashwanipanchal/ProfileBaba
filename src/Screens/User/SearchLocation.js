import { StyleSheet, Text, TouchableOpacity, View, StatusBar, Image, ScrollView,Dimensions, FlatList, Modal,} from 'react-native'
import React, { useState } from 'react'
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import { ButtonStyle } from '../../Custom/CustomView'
import { COLORS } from '../../Constant/Colors'
import Geocoder from 'react-native-geocoding';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { LocalStorage } from '../../services/Api'
const {height} = Dimensions.get('window');
import Dialog from "react-native-dialog";
import SearchBar from '../../Components/SearchBar'

const SearchLocation = ({navigation,route}) => {
    const GOOGLE_PLACES_API_KEY = 'AIzaSyDMfsTk4NHW07RutlBqQ9hl95QtELwvCWk'
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState()
    const showDialog = () => {
      setVisible(true);
    };
    const handleOK = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        // console.log(selected)
        // alert(JSON.stringify(selected,null,2))
        // getLocation(selected.structured_formatting)
        // setSelected('')
        setVisible(false);
        navigation.goBack()
      };
    const [coords , setCoords] = useState({})
    const [data, setData] = useState([
        {
            icon: require('../../images/locationicon.png'),
            title: 'Delhi'
        },
        {
            icon: require('../../images/locationicon.png'),
            title: 'Delhi NCR'
        },
        {
            icon: require('../../images/locationicon.png'),
            title: 'New Delhi'
        },
        {
            icon: require('../../images/locationicon.png'),
            title: 'Greater Noida'
        },
        {
            icon: require('../../images/locationicon.png'),
            title: 'Gurugram'
        },
        {
            icon: require('../../images/locationicon.png'),
            title: 'Ghaziabad'
        },
        {
            icon: require('../../images/locationicon.png'),
            title: 'Faridabad'
        },
        {
            icon: require('../../images/locationicon.png'),
            title: 'Noida'
        },
        {
            icon: require('../../images/locationicon.png'),
            title: 'Punjab'
        },
        {
            icon: require('../../images/locationicon.png'),
            title: 'Haryana'
        },
        {
            icon: require('../../images/locationicon.png'),
            title: 'Chandigarh'
        },
    ])

    // useEffect(()=>{
    //     Geocoder.init("AIzaSyAUA0Tr4oFc_BNL9DEeVWayBDUcd2GeYxw");
        
    //     Geocoder.from("New Delhi")
    //         .then(json => {
    //             var location = json.results[0].geometry.location;
    //             console.log(location);
    //         })
    //         .catch(error => console.warn(error));
    // },[])

    const getLocation = async(item) => {
        Geocoder.init("AIzaSyAUA0Tr4oFc_BNL9DEeVWayBDUcd2GeYxw");
        const location = await Geocoder.from(item.title)
        // const location = await loc.json()
        setCoords(location.results[0].geometry.location)
        route.params.onSelect(location.results[0].geometry.location, item.title)
        // route.params.onSelectName(item.title)
        navigation.goBack()
           
    }

  return (
    <View style={{flex:1, backgroundColor:'#E5E5E5'}}>
          <StatusBar barStyle="dark-content"  backgroundColor="#E5e5e5"/>
          <View style={{ flexDirection: 'row', marginBottom: 20, marginTop: 0 }}>
              <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
                  <Image source={require('../../images/Add.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
              </TouchableOpacity>
              <Image source={require('../../images/searchlocation.png')} style={{ marginLeft: 10, width: 200, height: 40, resizeMode: 'contain' }} />
          </View>
          <View style={{ flexDirection: 'row' }}>
              <GooglePlacesAutocomplete
                  placeholder="Search"
                  //   keyboardShouldPersistTaps='handled'
                  query={{
                      key: GOOGLE_PLACES_API_KEY,
                      language: 'en', // language of the results
                  }}
                  // renderRightButton={()=>{<View><Image style={{width:24, height:24, marginRight:10}}  source={require('../images/locationicon.png')}/></View>}}
                  styles={{
                      container: {
                          flex: 1,
                          marginHorizontal: 10,
                          backgroundColor: 'transparent'
                      },
                      textInput: {
                          height: 42,
                          //   color: '#000',
                          borderColor: COLORS.lightGray,
                          borderWidth: 1,
                          paddingVertical: 10,
                          backgroundColor: 'transparent',
                          fontSize: 16,
                      },

                  }}
                  // enablePoweredByContainer={false}
                  onPress={(data, details = null) => {
                    getLocation({
                        title: data.description
                    })
                }}
                  onFail={(error) => console.error(error)}
              // this in only required for use on the web. See https://git.io/JflFv more for details.
              />
          </View>
          {/* <SearchBar/> */}
           {/* <TouchableOpacity onPress={()=>{}} style={{alignItems:'center', borderColor:'gray', borderWidth:1, flexDirection:'row', justifyContent:'space-between', marginHorizontal:10, paddingVertical:10, borderRadius:10, marginBottom:10}}>
             <Text style={{marginLeft:10}}>Search</Text>
             <Image style={{width:24, height:24, marginRight:10}}  source={require('../../images/locationicon.png')}/> 
           </TouchableOpacity> */}
           <TouchableOpacity onPress={()=>navigation.goBack()} style={{flexDirection:'row', marginLeft:20, alignItems:'center', paddingVertical:10}}>
                  <Image source={require('../../images/currentlocationicon.png')} style={{width:26, height:26}}/>
                  <Text style={{color:COLORS.blue, marginLeft:10, fontSize:16}}>Use my Current Location</Text>
              </TouchableOpacity>
            <ScrollView style={{marginLeft:20}}>
              <Text style={{color:COLORS.lightBlack, fontSize:20}}>All Cities</Text>
              <FlatList
                  data={data}
                  renderItem={({item})=>(
                      <TouchableOpacity onPress={()=> {getLocation(item)}} activeOpacity={0.7} style={{flexDirection:'row', marginTop:20, alignItems:'center', marginBottom:10}}>
                          <Image source={item.icon} style={{width:28, height:28}}/>
                          <Text style={{color:COLORS.profileBlackText, fontSize:16, marginLeft:10}}>{item.title}</Text>
                      </TouchableOpacity>
                  )}
              />
            </ScrollView>
        </View>  
  )
}

export default SearchLocation

const styles = StyleSheet.create({
    crossImage: {
        // marginTop: StatusBar.currentHeight,
        marginLeft: 20,
        width: '10%',
        padding: 5,
        backgroundColor:'#fff',
        borderRadius:10
      },
      textInput: {
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        paddingHorizontal: 15,
        marginHorizontal: 20,
        // marginTop: 10,
        marginBottom: 10,
        fontSize: 16,
        fontFamily: 'Poppins-Semi',
        fontWeight: '600',
        backgroundColor: 'red',
        borderColor: 'grey',
        color: '#000'
      },
      phoneImage: {
         width: 20,
        height: 20,
        resizeMode: 'contain',
        alignItems: 'center',
        margin: 5,
        marginTop: 15,
        // color:'lightgray',
        marginLeft:'auto'
        },
    container2Box: {
        borderRadius: 10,
        borderWidth: 2,
        paddingHorizontal: 15,
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
        borderColor: 'gray',
        flexDirection: 'row',
        },
    modal_View: {
        backgroundColor: '#000000aa',
        flex: 1,
        },
        modelMainBox: {
        padding:10,
        flex:'auto',
        backgroundColor: '#FFFFFF',
        marginTop: height / 3,
        marginHorizontal: 20,
        borderRadius: 20,
        },
        text: {
        fontFamily: 'Muli-Bold',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#1E1F20',
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 25,
        },
    container: {
        // flex: 1,
        width:300,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        },
})