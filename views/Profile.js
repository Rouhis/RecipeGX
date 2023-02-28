import {useContext, useEffect, useState} from 'react';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import {Avatar, Button, Div, Fab, Icon, Text} from 'react-native-magnus';
import {useTag, useUser} from '../hooks/ApiHooks';
import {tempToken, uploadsUrl} from '../utils/Variables';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import List from '../components/List';

const Profile = ({navigation}) => {
  const {getFilesByTag} = useTag();
  const {getUserByToken} = useUser();
  const {user, setUser} = useContext(MainContext);
  const [avatar, setAvatar] = useState('');


  const loadAvatar = async () => {
    console.log(user);
    try {
      const avatarArray = await getFilesByTag('avatar_2725');
//      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      setAvatar(avatarArray.pop().filename);
      console.log('avatar info ' + avatar);
    } catch (error) {
      console.error('avatar fetch failed', error.message);
    }
  };

  useEffect(() => {
    loadAvatar();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Div p={15}></Div>
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
          size={100}
          bg="green800"
          shadow={1}
          //source={require('../assets/nalle.jpg')}
          source={{uri: uploadsUrl + avatar}}
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
          //  {user.username}
        >
          ProfileName
        </Text>

        <Div p="lg" h={'10%'}>
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
        <Div bg="gray700" p="lg" h={'70%'} roundedTop={35}>
          <Div row flexWrap="wrap" justifyContent="space-evenly">
            <Button
              mt="xs"
              p="xs"
              bg="transparent"
              borderBottomColor="green500"
              color="red400"
              underlayColor="red100"
            >
              My Recipes
            </Button>
            <Button
              mt="xs"
              p="xs"
              bg="transparent"
              borderBottomColor="green500"
              color="red400"
              underlayColor="red100"
            >
              Favourites
            </Button>
          </Div>
          <List navigation={navigation} myFilesOnly={true}></List>
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

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
