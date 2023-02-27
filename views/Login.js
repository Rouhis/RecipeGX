import {useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Input, Button} from 'react-native-magnus';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const {setIsLoggedIn} = useContext(MainContext);
  console.log(setIsLoggedIn);
  const logIn = async () => {
    console.log('Login button pressed');
    setIsLoggedIn(true);
    try {
      await AsyncStorage.setItem('userToken', 'abc123');
    } catch (error) {
      console.warn('error in storing token', error);
    }
  };

  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken === 'abc123') {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log('no valid token available');
    }
  };

  useEffect(() => {
    checkToken();
  }, []);
  return (
    <View style={signin.container}>
      <Text
        fontSize={30}
        fontWeight="bold"
        textTransform="uppercase"
        fontFamily="sans-serif-condensed"
        color="red600"
        letterSpacing={2}
      >
        Recipe GX
      </Text>
      <Input
        mt={50}
        rounded={10}
        w={300}
        placeholder="Email/Username"
        p={10}
        focusBorderColor="red600"
        textAlign="center"
      />
      <Input
        mt={25}
        rounded={10}
        w={300}
        placeholder="Password"
        p={10}
        focusBorderColor="blue700"
        textAlign="center"
      />
      <Button
        title="Login"
        mt={30}
        ml={135}
        px="xl"
        bg="red600"
        color="white"
        onPress={logIn}
      />

      <Button mt={25} ml={240} bg="black" color="red600">
        Register
      </Button>
    </View>
  );
};

const signin = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
