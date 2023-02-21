import {StyleSheet, View} from 'react-native';
import {Avatar, Button, Div, Icon, Input, Text} from 'react-native-magnus';
import {StatusBar} from 'expo-status-bar';

const App = () => {
  return (
    <Div rounded="lg" p="xl">
      <Avatar
        alignSelf="center"
        size={86}
        bg="green800"
        rounded="lg"
        shadow={1}
      >
        <Icon name="user" color="white" fontFamily="Feather" />
      </Avatar>
      <Text
        fontSize="lg"
        textAlign="center"
        fontWeight="bold"
        textTransform="uppercase"
        color="red400"
        letterSpacing={1}
        mt="lg"
        mb="lg"
      >
        ProfileName
      </Text>
      <Div bg="grey" p="lg" h={600} roundedTop="xl">
        <Div row flexWrap="wrap" justifyContent="space-evenly">
          <Button
            mt="xs"
            px="xs"
            py="xs"
            bg="transparent"
            borderBottomColor="green500"
            color="red500"
            underlayColor="red100"
          >
            My Recipes
          </Button>
          <Button
            mt="xs"
            px="xs"
            py="xs"
            bg="transparent"
            borderBottomColor="green500"
            color="red500"
            underlayColor="red100"
          >
            Favourites
          </Button>
        </Div>
      </Div>
    </Div>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
