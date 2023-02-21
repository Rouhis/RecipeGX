import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../views/Home';
import Profile from '../views/Profile';
import LottieIcons from '../components/LottieIcons';
import FeelLucky from '../views/FeelLucky';

const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default Navigator;