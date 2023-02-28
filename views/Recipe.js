import * as React from 'react';
import {FlatList, ScrollView, TextInput, View} from 'react-native';
import {uploadsUrl} from '../utils/Variables';
import {
  Text,
  Image,
  ScrollDiv,
  Button,
  Dropdown,
  Input,
} from 'react-native-magnus';
import {Div} from 'react-native-magnus';
import {SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import List from '../components/List';
import {black, dark, gray} from '../utils/Colors';

const Recipe = ({navigation, route}) => {
  console.log(route.params);
  const dropdownComments = React.createRef();
  const dropdownSteps = React.createRef();
  const {title, description, filename, time_added: timeAdded} = route.params;
  return (

    <ScrollDiv nestedScrollEnabled={true} h={'100%'} bg={black} >
          <Div flex={1} alignItems={'center'} marginTop={10}>
          <Div h={250} w={350}>
          <Image source={{uri: uploadsUrl + filename}} h={'100%'} w={'100%'}></Image>
          </Div>
          </Div>
          <Div
            bg={black}
            h={'75%'}
            style={{
              position: 'relative',
              top: -40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              fontSize="lg"
              textAlign="center"
              fontWeight="bold"
              textTransform="uppercase"
              color="red"
              letterSpacing={1}
              mt="lg"
              mb="lg"
            >
              {title}
            </Text>
            <ScrollDiv h={260}>
              <Div >
                <Text fontSize="lg" textAlign="center" color="white">
                  {description}
                </Text>
              </Div>
            </ScrollDiv>

            <Div bg={dark} p="lg" h={60} w={'100%'} rounded={35}>
              <Div row flexWrap="wrap" justifyContent="space-evenly">
                <Button
                  mt="xs"
                  p="xs"
                  bg="transparent"
                  borderBottomColor="green500"
                  color="red"
                  underlayColor="red100"
                  onPress={() => dropdownSteps.current.open()}
                >
                  Steps
                </Button>
                <Button
                  mt="xs"
                  p="xs"
                  bg="transparent"
                  borderBottomColor="green500"
                  color="red"
                  underlayColor="red100"
                  onPress={() => dropdownComments.current.open()}
                >
                  Comments
                </Button>
              </Div>
            </Div>
            <Dropdown
              ref={dropdownSteps}
              h={'100%'}
              w={'100%'}
              roundedTop={35}
              title={
                <Text mx="lg" color="red400" textAlign="center">
                  Steps
                </Text>
              }
            ></Dropdown>
            <Dropdown
              ref={dropdownComments}
              w="100%"
              h="100%"
              roundedTop={35}
              title={
                <Text mx="lg" color="red400" textAlign="center">
                  Comments
                </Text>
              }
            >
              <Div>
                <ScrollView
                  nestedScrollEnabled={true}
                  style={{height: '98%'}}
                ></ScrollView>
                <Input
                  placeholder="Write your comment"
                  p={10}
                  focusBorderColor="red400"
                  style={{position: 'absolute', bottom: 20}}
                ></Input>
              </Div>
            </Dropdown>
          </Div>
      
    </ScrollDiv>
  );
};

Recipe.propTypes = {
  route: PropTypes.object,
};

export default Recipe;
