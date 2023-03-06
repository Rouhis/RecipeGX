import * as React from 'react';

import PropTypes from 'prop-types';
import {Text, Div} from 'react-native-magnus';
import {dark} from '../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';

const ListItem = ({singleMedia, navigation}) => {
  const {getUserById} = useUser();
  const [commentUser, setCommentUser] = React.useState('');
  const getUsername = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const user = await getUserById(item.user_id, token);
      console.log('Kommentin lisääjä   ' + user.username);
      setCommentUser(user);
    } catch (error) {
      console.error('Username fetch failed', error.message);
    }
  };

  const item = singleMedia;

  React.useEffect(() => {
    getUsername();
  }, []);

  return (
    <Div w={'100%'} flex={1} alignItems={'center'} justifyContent={'center'}>
      <Div
        w={'90%'}
        flex={1}
        alignItems={'flex-start'}
        justifyContent={'center'}
        bg={dark}
        rounded="lg"
        m={10}
      >
        <Text fontSize={20} color="red">
          {commentUser.username}
        </Text>
        <Text color="gray200">{'    ' + item.comment}</Text>
      </Div>
    </Div>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
