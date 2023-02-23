import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../views/Login';
import {MainContext} from '../contexts/Maincontext';
import React, {useContext} from 'react';

const Stack = createNativeStackNavigator();

const StackScreen = () => {
  const [isLoggedIn] = useContext(MainContext);
  return (
    <Stack.Navigator>
      {isLoggedIn} ? (
      <Stack.Screen name="Tabs" component={TabScreen} />
      <Stack.Screen name="Single" component={Single} />
      ) : (
      <Stack.Screen name="Login" component={Login} />)
    </Stack.Navigator>
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
