import * as React from 'react';
import 'react-native-gesture-handler';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import login from '../components/login'
import signup from '../components/signup'
import Counter from '../components/dummy/Counter';
import imageDownload from '../components/imageDownload';
import apiData from '../components/dummy/apiData'
import community from '../components/community/community'
import exploreScreen from '../components/explore/exploreScreen'
import home from '../components/home/home'
import practiceScreen from '../components/practice/practiceScreen'
import learn from '../components/learn/learn'
const Stack = createStackNavigator();
const Auth = createStackNavigator();
const Tab = createBottomTabNavigator();
function MyTabs() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }} tabBarOptions={{
        activeTintColor: 'black',
      }}>
        <Tab.Screen name="home" component={home}   options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="home"
                color={color}
                size={size}
              />
            ),
          }}   />
        <Tab.Screen name="practiceScreen" component={practiceScreen} options={{
            tabBarLabel: 'Practice',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="yoga"
                color={color}
                size={size}
              />
            ),
          }}  />
        <Tab.Screen name="learn" component={learn} options={{
            tabBarLabel: 'Learn',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="school"
                color={color}
                size={size}
              />
            ),
          }}  />
        <Tab.Screen name="exploreScreen" component={exploreScreen} options={{
            tabBarLabel: 'Explore',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="book-search"
                color={color}
                size={size}
              />
            ),
          }}/>
        <Tab.Screen name="community" component={community}  options={{
            tabBarLabel: 'Community',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="earth"
                color={color}
                size={size}
              />
            ),
          }}/>
      </Tab.Navigator>
    );
  }
  
const AppNavigation=(isSignedIn) =>{
  console.log("ggggisSignedIn--55->", isSignedIn.isSignedIn);
    return (
        <NavigationContainer >
           <Stack.Navigator  screenOptions={{ headerShown: false }} initialRouteName={login}>
          
           <Stack.Screen name="signup" component={signup} />
           <Stack.Screen name="login" component={login} />
           <Stack.Screen
          name="MyTabs"
          component={MyTabs}
           />
           <Stack.Screen  name="imageDownload" component={imageDownload} />
           <Stack.Screen name="Counter" component={Counter} />
           <Stack.Screen name="apiData" component={apiData} />
           <Stack.Screen name="home" component={home} />
           <Stack.Screen name="practiceScreen" component={practiceScreen} />
           <Stack.Screen name="learn" component={learn} />
           <Stack.Screen name="exploreScreen" component={exploreScreen} />
           <Stack.Screen name="community" component={community} />
           </Stack.Navigator>
           
        
            </NavigationContainer>


    )

}
export default AppNavigation;``
