import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../views/Login';
import Home from '../views/Home';
import {MainContext} from '../contexts/Maincontext';
import React, {useContext} from 'react';

const Stack = createNativeStackNavigator();

const StackScreen = () => {
  const [isLoggedIn] = useContext(MainContext);
  return (
    <Stack.Navigator>
      {isLoggedIn} ? (
      <Stack.Screen name="Tabs" component={TabScreen} />
      <Stack.Screen name="Home" component={Home} />
      ) : (
      <Stack.Screen name="Login" component={Login} />)
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
        tabBarItemStyle: {padding: 4},
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
