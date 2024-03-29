import {useContext, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Avatar, Button, Div, Icon, Text} from 'react-native-magnus';
import {useTag} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import List from '../components/List';
import {black, dark} from '../utils/Colors';

const Profile = ({navigation}) => {
  const {getFilesByTag} = useTag();
  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('');

  const loadAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);

      setAvatar(avatarArray.pop().filename);
    } catch (error) {
      console.error('avatar fetch failed', error.message);
    }
  };
  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
  };

  useEffect(() => {
    loadAvatar();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Div p={15}></Div>
      <Div pt="xl" bg={dark}>
        <Button
          position="absolute"
          bg="transparent"
          rounded="circle"
          h={50}
          w={50}
          top={10}
          right={10}
          onPress={logout}
        >
          <Icon name="logout" color="black"></Icon>
        </Button>

        <Avatar
          alignSelf="center"
          size={100}
          bg="green800"
          shadow={1}
          //  source={{uri: uploadsUrl + avatar}}
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
          {user.username}
        </Text>

        <Div bg={black} p="lg" h={'80%'} roundedTop={35}>
          <Div row flexWrap="wrap" justifyContent="space-evenly">
            <Text
              mt="xs"
              p="xs"
              bg="transparent"
              borderBottomColor="green500"
              color="red400"
              underlayColor="red100"
            >
              My Recipes
            </Text>
          </Div>
          <List navigation={navigation} myFilesOnly={true}></List>
        </Div>
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
