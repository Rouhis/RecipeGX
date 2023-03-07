import * as React from 'react';
import {Alert} from 'react-native';
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
import PropTypes from 'prop-types';
import List from '../components/ListComment';
import {black, dark} from '../utils/Colors';
import {useComment} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';


const Recipe = ({route}) => {
  const dropdownComments = React.createRef();
  const [text, setText] = React.useState('');
  const dropdownSteps = React.createRef();
  const {title, description, file_id, filename} = route.params;
  console.log(description)
  const allData = JSON.parse(description)
  console.log(allData.steps)
  console.log(allData)
  const fileId = file_id;
  const {update, setUpdate} = React.useContext(MainContext);
  
  const {postComment} = useComment();

  const uploadComment = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const data = text;
      if (!data) {
        Alert.alert('Comment', 'Comment cannot be empty!');
      } else {
        await postComment(fileId, data, token);
        alert('Comment posted!');
        setText('');
        setUpdate(!update);
      }
    } catch (error) {
      console.error('uploadComment ', error);
    }
  };
  return (
    <ScrollDiv nestedScrollEnabled={true} h={400} bg={black}>
      <Div flex={1} alignItems={'center'} marginTop={10}>
        <Div h={250} w={350}>
          <Image
            source={{uri: uploadsUrl + filename}}
            h={'100%'}
            w={'100%'}
          ></Image>
        </Div>
      </Div>
      <Div
        bg={black}
        style={{
          position: 'relative',
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
        <ScrollDiv>
          <Div >
            <Text fontSize="lg" textAlign="center" color="white"
            >
              {allData.ingredients}
            </Text>
          </Div>
        </ScrollDiv>

        <Div flex={1} flexDir='row' justifyContent="space-evenly" bg={dark} p="lg" h={60} w={'90%'} rounded='xl'>
            <Button
              mt="xs"
              p="xs"
              bg="transparent"
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
        
        <Dropdown
          ref={dropdownSteps}
          h={'100%'}
          w={'100%'}
          roundedTop={35}
          title={
            <Text mx="lg" color="red400" textAlign="center">
              {allData.steps}
            </Text>
          }
        >
          <Div>
            <Text>{allData.steps}</Text>
          </Div>
        </Dropdown>
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
          <Div style={{height: '98%'}}>
            <List fileId={fileId}></List>
            <Input
              placeholder="Write your comment"
              p={10}
              focusBorderColor="red400"
              style={{position: 'absolute', bottom: 25}}
              onChangeText={(text) => setText(text)}
              value={text}
              suffix={<Button onPress={uploadComment}>Send</Button>}
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
