import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import {Text, Input, Button} from 'react-native-magnus';

const signup = () => {
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
        Register
      </Text>
      <Input
        mt={50}
        rounded={10}
        w={300}
        placeholder="Username"
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
        mt={30}
        ml={135}
        px="xl"
        bg="red500"
        color="white"
        backgroundColor="red600"
      >
        sign up
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

export default signup;
