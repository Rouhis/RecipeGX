import {MainProvider} from './contexts/Maincontext';
import Navigator from './navigators/Navigator';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './views/Home';
import Profile from './views/Profile';
import FeelLucky from './views/FeelLucky';
import Navigator from './navigators/Navigator';
import { SafeAreaView } from 'react-native';

const App = () => {

  return (
    <MainProvider>
    <Navigator />
  </MainProvider>
  )
};

export default App;
