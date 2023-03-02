import React, {useState, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../views/Login';
import Home from '../views/Home';
import {MainContext} from '../contexts/MainContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeelLucky from '../views/FeelLucky';
import Profile from '../views/Profile';
import LottieIcons from '../components/LottieIcons';
import Register from '../views/Register';
import AddRecipe from '../views/AddRecipe';
import Recipe from '../views/Recipe';
import { black, brightred, red } from '../utils/Colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={TabScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Recipe" component={Recipe}/>
          <Stack.Screen name="AddRecipe" component={AddRecipe}/>
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
};

const TabScreen = () => {
  return (
    <Tab.Navigator

      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          return <LottieIcons iconName={route.name} focused={focused} />;
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {padding: 4, backgroundColor: brightred,borderTopColor: black, borderTopWidth: 2,},
      })}

    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="FeelLucky" component={FeelLucky} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
