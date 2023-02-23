import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import {Avatar, Button, Div, Fab, Icon, Text} from 'react-native-magnus';

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Div pt="xl">
        <Button
          position="absolute"
          bg="transparent"
          rounded="circle"
          h={50}
          w={50}
          top={10}
          right={10}
          onPress={() => Alert.alert('Trying to logout :=)?')}
        >
          <Icon name="logout" color="black"></Icon>
        </Button>

        <Avatar
          alignSelf="center"
          size={86}
          bg="green800"
          shadow={1}
          source={require('../assets/nalle.jpg')}
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
        <Div p="lg" h={100}>
          <Div row flexWrap="wrap" justifyContent="space-evenly">
            <Text
              fontSize="md"
              textAlign="center"
              fontWeight="bold"
              textTransform="uppercase"
              color="red400"
              letterSpacing={1}
              mt="lg"
              mb="lg"
            >
              Recipes
            </Text>
            <Text
              fontSize="md"
              textAlign="center"
              fontWeight="bold"
              textTransform="uppercase"
              color="red400"
              letterSpacing={1}
              mt="lg"
              mb="lg"
            >
              Favourites
            </Text>
          </Div>
        </Div>
        <Div bg="grey" p="lg" h={380} roundedTop={35}>
          <Div row flexWrap="wrap" justifyContent="space-evenly">
            <Button
              mt="xs"
              px="xs"
              py="xs"
              bg="transparent"
              borderBottomColor="green500"
              color="red400"
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
              color="red400"
              underlayColor="red100"
            >
              Favourites
            </Button>
          </Div>
        </Div>
        <Fab bg="red600" h={50} w={50}>
          <Button p="none" bg="transparent" justifyContent="flex-end">
            <Div rounded="sm" bg="white" p="sm">
              <Text fontSize="md">Add Recipe</Text>
            </Div>
            <Icon
              name="pluscircleo"
              color="blue600"
              h={50}
              w={50}
              rounded="circle"
              ml="md"
              bg="white"
            />
          </Button>
          <Button p="none" bg="transparent" justifyContent="flex-end">
            <Div rounded="sm" bg="white" p="sm">
              <Text fontSize="md">Remove Recipe</Text>
            </Div>
            <Icon
              name="pluscircleo"
              color="blue600"
              h={50}
              w={50}
              rounded="circle"
              ml="md"
              bg="white"
            />
          </Button>
        </Fab>
      </Div>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default Profile;
