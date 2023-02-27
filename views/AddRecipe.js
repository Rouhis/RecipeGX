import * as React from 'react';
import {FlatList, ScrollView, TextInput, View} from 'react-native';
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
  const dropdownRef = React.createRef();
  return (
    <ScrollDiv nestedScrollEnabled={true}>
      <Div>
        <Div
          bgImg={require('../assets/nalle.jpg')}
          bg="gray700"
          h={250}
          roundedTop={35}
        ></Div>
        <Div bg="gray700" roundedTop={35} h={250}>
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
            RecipeName
          </Text>
          <ScrollDiv h={260}>
            <Text fontSize="lg" textAlign="center">
              test1
            </Text>
          </ScrollDiv>
        </Div>
      </Div>
    </ScrollDiv>
  );
};

Recipe.propTypes = {
  route: PropTypes.object,
};

export default Recipe;
