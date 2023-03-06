import * as React from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
import List from '../components/ListComment';
import {useForm} from 'react-hook-form';
import {async} from 'q';
import {black, dark, gray} from '../utils/Colors';
import {useComment} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Recipe = ({navigation, route}) => {
  const dropdownComments = React.createRef();
  const [text, setText] = React.useState('');
  const dropdownSteps = React.createRef();
  const {
    title,
    description,
    file_id,
    filename,
    time_added: timeAdded,
  } = route.params;
  const fileId = file_id;
  const {handleSubmit} = useForm({
    defaultValues: {title: '', description: ''},
    mode: 'onChange',
  });
  const {getCommentsByFileId, postComment} = useComment();

  const uploadComment = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const data = text;
      if (!data) {
        Alert.alert('Comment', 'Comment cannot be empty!');
      } else {
        await postComment(fileId, data, token);
        alert('Comment posted!');
      }
    } catch (error) {
      console.error('uploadComment ', error);
    }
  };
  return (
    <ScrollDiv nestedScrollEnabled={true} h={'100%'} bg={black}>
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
          <Div>
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
