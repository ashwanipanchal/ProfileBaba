import { StyleSheet, Text, View } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React,{useRef} from 'react'
import Splash from '../Screens/Splash';
import GetStarted from '../Screens/User/GetStarted';
import Login from '../Screens/User/Login';
import Register from '../Screens/User/Register';
import ForgotPassword from '../Screens/User/ForgotPassword';
import VerifyOTP from '../Screens/User/VerifyOTP';
import VerifyOTPforForgotPassword from '../Screens/User/VerifyOTPforForgotPassword';
import Home from '../Screens/User/Home';
import CreatePassword from '../Screens/User/CreatePassword';
import Account from '../Screens/User/Account';
import Notification from '../Screens/User/Notification';
import BookingHistory from '../Screens/User/BookingHistory';
import BookingHistoryMessages from '../Screens/User/BookingHistoryMessages';
import BookingHistoryCalls from '../Screens/User/BookingHistoryCalls';
import VendorList from '../Screens/User/VendorList';
import SearchLocation from '../Screens/User/SearchLocation';
import DrawerNavigator from './DrawerNavigator';
import DrawerNavigatorForSkip from './DrawerNavigatorForSkip';
import UserChatScreen from '../Screens/User/UserChatScreen';
import PersonalChat from '../Screens/User/PersonalChat';
import DialedCallScreen from '../Screens/User/DialedCallScreen';
import SkipHome from '../Screens/User/SkipHome';
import VendorListForSkip from '../Screens/User/VendorListForSkip';


const Stack = createStackNavigator();

const StackNavigator = () => {
    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });

    const screenOptionStyle = {
        // headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
    };

    const navigationRef = useRef();
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                initialRouteName={'Splash'}
                screenOptions={screenOptionStyle}>
                <Stack.Screen
                    name="Splash"
                    component={Splash}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="DrawerNavigator"
                    component={DrawerNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="DrawerNavigatorForSkip"
                    component={DrawerNavigatorForSkip}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="GetStarted"
                    component={GetStarted}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="VerifyOTP"
                    component={VerifyOTP}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="VerifyOTPForgotPassword"
                    component={VerifyOTPforForgotPassword}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CreatePassword"
                    component={CreatePassword}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SkipHome"
                    component={SkipHome}
                    options={{ headerShown: false }}
                />
                {/* <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                /> */}
                <Stack.Screen
                    name="Notification"
                    component={Notification}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BookingHistory"
                    component={BookingHistory}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BookingHistoryMessages"
                    component={BookingHistoryMessages}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BookingHistoryCalls"
                    component={BookingHistoryCalls}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Account"
                    component={Account}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="VendorList"
                    component={VendorList}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="VendorListForSkip"
                    component={VendorListForSkip}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SearchLocation"
                    component={SearchLocation}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="UserChatScreen"
                    component={UserChatScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PersonalChat"
                    component={PersonalChat}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="DialedCallScreen"
                    component={DialedCallScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})