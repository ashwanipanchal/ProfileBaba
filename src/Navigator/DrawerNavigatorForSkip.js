import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../Screens/User/CustomDrawer';
import Home from '../Screens/User/Home'
import Notification from '../Screens/User/Notification';
import SkipHome from '../Screens/User/SkipHome';
import CustomDrawerForSkip from '../Screens/User/CustomDrawerForSkip';
const Drawer = createDrawerNavigator();
const DrawerNavigator = ({route}) => (
  // console.log("====== DrawerNAvigation Page route ",route)
  <Drawer.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="SkipHome"
    drawerStyle={{width: '70%'}}
    drawerContent={props => <CustomDrawerForSkip {...props} />}
    >
    <Drawer.Screen name="SkipHome" component={SkipHome}/>
  </Drawer.Navigator>
);
export default DrawerNavigator;
