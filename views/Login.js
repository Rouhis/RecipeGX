import {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Input, Button, PropTypes} from 'react-native-magnus';
import {MainContext} from '../contexts/Maincontext';

const Login = ({navigation}) => {
  const {setLoggedIn} = useContext(MainContext);

  const login = async () => {
    console.log('login button pressed');
    setLoggedIn(true);
  };
  return (
    <View style={login.container}>
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
        onPress={login}
      />

      <Button mt={25} ml={240} bg="black" color="red600">
        Register
      </Button>
    </View>
  );
};

const login = StyleSheet.create({
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
