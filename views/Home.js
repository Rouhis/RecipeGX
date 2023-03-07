import * as React from 'react';
import {Text, Fab, Button, Icon, Div} from 'react-native-magnus';
import {StyleSheet, SafeAreaView} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import List from '../components/List';
import PropTypes from 'prop-types';
import {dark, red} from '../utils/Colors';
const Home = ({navigation}) => {
<<<<<<< HEAD
=======
  console.log('perekreklreklreklrpeklrpe');
>>>>>>> LeoNew
  return (
    <>
      <SafeAreaView style={styles.container}>
        <List navigation={navigation} />

        <Fab bg="red" h={50} w={50}>
          <Button
            p="none"
            bg="transparent"
            onPress={() => {
              navigation.navigate('AddRecipe');
            }}
          >
            <Div rounded="sm" bg={dark} p="sm">
              <Text fontSize="md" color="white">
                Add a recipe
              </Text>
            </Div>
            <Icon
              name="pizza-slice"
              fontFamily="FontAwesome5"
              color="black"
              h={50}
              w={50}
              rounded="circle"
              ml="md"
              bg="red"
            />
          </Button>
        </Fab>
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
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

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
