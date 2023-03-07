import * as React from 'react';
import {Alert, FlatList, ScrollView, TextInput, View} from 'react-native';
import {uploadsUrl} from '../utils/Variables';
import {
  Text,
  Image,
  ScrollDiv,
  Button,
  Dropdown,
  Input,
  Icon,
} from 'react-native-magnus';
import {Div} from 'react-native-magnus';
import {SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import List from '../components/List';
import {useForm} from 'react-hook-form';
import {async} from 'q';
import {black, dark, gray} from '../utils/Colors';
import {useComment, useFavourite, useUser} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from 'react-native-vector-icons';

const Recipe = ({navigation, route}) => {
  console.log(route.params);
  const dropdownComments = React.createRef();
  const [text, setText] = React.useState('');
  const dropdownSteps = React.createRef();
  const [userLikesIt, setUserLikesIt] = React.useState(false);
  const {getUserById} = useUser();
  const {user} = React.useContext(MainContext);
  const {getFavouritesByFileId, postFavourite, deleteFavourite} =
    useFavourite();
  const {
    title,
    description,
    file_id,
    filename,
    time_added: timeAdded,
  } = route.params;
  const [likes, setLikes] = React.useState([]);
  const fileId = file_id;
  const {handleSubmit} = useForm({
    defaultValues: {title: '', description: ''},
    mode: 'onChange',
  });
  const {getCommentsByFileId, postComment} = useComment();

  const getLikes = async () => {
    const likes = await getFavouritesByFileId(fileId);
    console.log(
      'likess',
      likes.user_id,
      'user',
      user,
      'useridd',
      likes.user_id,
      'useriddd',
      user.user_id
    );
    setLikes(likes);
    // check if the current user id is included in the 'likes' array and
    // set the 'userLikesIt' state accordingly
    for (const like of likes) {
      console.log(like.user_id == user.user_id);
      if (like.user_id == user.user_id) {
        setUserLikesIt(true);
        break;
      }
    }
  };

  const getComments = async () => {
    try {
      const commentsData = await getCommentsByFileId(fileId);
      const commentsSize = Object.keys(commentsData).length;
    } catch (error) {
      console.error('getComments ', error);
    }
  };

  const likeFile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await postFavourite(fileId, token);
      setUserLikesIt(true);
      getLikes();
    } catch (error) {
      // note: you cannot like same file multiple times
      // console.log(error);
    }
  };
  const dislikeFile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await deleteFavourite(fileId, token);
      setUserLikesIt(false);
      getLikes();
    } catch (error) {
      // note: you cannot like same file multiple times
      console.log(error);
    }
  };

  const uploadComment = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const data = text;
      if (!data) {
        Alert.alert('Comment', 'Comment cannot be empty!');
      } else {
        await postComment(fileId, data, token);
      }
    } catch (error) {
      console.error('uploadComment ', error);
    }
  };

  React.useEffect(() => {
    getLikes();
  }, []);
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
        {userLikesIt ? (
          <Button name="heart" color="red" onPress={dislikeFile}>
            Dont Like
          </Button>
        ) : (
          <Button name="heart" onPress={likeFile}>
            Like?
          </Button>
        )}
        <Text color="red">Total likes: {likes.length}</Text>
        <ScrollDiv h={260}>
          <Div>
            <Text fontSize="lg" textAlign="center" color="white">
              {description}
            </Text>
            <Button title="submit" onPress={getComments}>
              Hae kommentit test
            </Button>
            <Button onPress={uploadComment}>Comment teste</Button>
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
              onChangeText={(text) => setText(text)}
              value={text}
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

Recipe.propTypes = {
  route: PropTypes.object,
};

export default Recipe;
