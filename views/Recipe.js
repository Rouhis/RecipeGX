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
  Icon,
} from 'react-native-magnus';
import {Div} from 'react-native-magnus';
import PropTypes from 'prop-types';
import {black, dark} from '../utils/Colors';
import {useComment, useFavourite} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import List from '../components/ListComment';
const Recipe = ({route}) => {
  const {title, description, file_id, filename} = route.params;
  const allData = JSON.parse(description);
  const {update, setUpdate} = React.useContext(MainContext);
  const dropdownComments = React.createRef();
  const [text, setText] = React.useState('');
  const dropdownSteps = React.createRef();
  const [userLikesIt, setUserLikesIt] = React.useState(false);
  const {user} = React.useContext(MainContext);
  const {getFavouritesByFileId, postFavourite, deleteFavourite} =
    useFavourite();
  const [likes, setLikes] = React.useState([]);
  const fileId = file_id;

  const {postComment} = useComment();

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
        alert('Comment posted!');
        setText('');
        setUpdate(!update);
      }
    } catch (error) {
      console.error('uploadComment ', error);
    }
  };

  React.useEffect(() => {
    getLikes();
  }, []);
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

        <Text color="red">Total likes: {likes.length}</Text>
        <ScrollDiv>
          <Div>
            <Text textAlign="center" color="red">
              Ingredients
            </Text>
            <Text fontSize="lg" textAlign="center" color="white">
              {allData.ingredients}
            </Text>
          </Div>
        </ScrollDiv>
        <Div m={10}>
          {userLikesIt ? (
            <Button
              w={60}
              h={60}
              bg={dark}
              name="heart"
              color="red"
              onPress={dislikeFile}
              Icon
            >
              <Icon
                name="heart"
                fontFamily="FontAwesome"
                color="red"
                fontSize={30}
              />
            </Button>
          ) : (
            <Button w={60} h={60} bg={dark} name="heart" onPress={likeFile}>
              <Icon
                name="heart"
                fontFamily="Feather"
                color="white"
                fontSize={30}
              />
            </Button>
          )}
        </Div>
        <Div
          flex={1}
          flexDir="row"
          justifyContent="space-evenly"
          bg={dark}
          p="lg"
          h={60}
          w={'90%'}
          rounded="xl"
        >
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
              Instructions
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
