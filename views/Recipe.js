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

const Recipe = ({navigation, route}) => {
  console.log(route.params);
  const dropdownComments = React.createRef();
  const dropdownSteps = React.createRef();
  const {title, description, filename, time_added: timeAdded} = route.params;
  return (
    <ScrollDiv nestedScrollEnabled={true}>
      <Div>
        <Div bg="gray600" h={'100%'} roundedTop={35}>
          <Image
            source={{uri: uploadsUrl + filename}}
            h={250}
            roundedTop={35}
          ></Image>

          <Div
            bg="gray700"
            roundedTop={35}
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
              color="red400"
              letterSpacing={1}
              mt="lg"
              mb="lg"
            >
              {title}
            </Text>
            <ScrollDiv h={260}>
              <Text fontSize="lg" textAlign="center">
                {description}
              </Text>
            </ScrollDiv>

            <Div bg="gray500" p="lg" h={103} w={'100%'} roundedTop={35}>
              <Div row flexWrap="wrap" justifyContent="space-evenly">
                <Button
                  mt="xs"
                  px="xs"
                  py="xs"
                  bg="transparent"
                  borderBottomColor="green500"
                  color="red400"
                  underlayColor="red100"
                  onPress={() => dropdownSteps.current.open()}
                >
                  Steps
                </Button>
                <Button
                  mt="xs"
                  px="xs"
                  py="xs"
                  bg="transparent"
                  borderBottomColor="green500"
                  color="red400"
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
                  placeholder="Comment"
                  p={10}
                  focusBorderColor="red400"
                  style={{position: 'absolute', bottom: 20}}
                ></Input>
              </Div>
            </Dropdown>
          </Div>
        </Div>
      </Div>
    </ScrollDiv>
  );
};

Recipe.propTypes = {
  route: PropTypes.object,
};

export default Recipe;
