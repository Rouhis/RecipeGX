import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import {Text, Input, Button} from 'react-native-magnus';

export default function App() {
  return (
    <View style={login.container}>
      <Text
        fontSize={30}
        fontWeight="bold"
        textTransform="uppercase"
        color="red600"
        letterSpacing={2}
      >
        Recipe GX
      </Text>
      <Input
        mt={50}
        rounded={10}
        w={300}
        placeholder="Username"
        p={10}
        focusBorderColor="blue700"
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
        mt="lg"
        ml="lg"
        px="xl"
        py="lg"
        bg="red500"
        color="white"
        underlayColor="red600"
      >
        Contact Us
      </Button>
    </View>
  );
}

const login = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
