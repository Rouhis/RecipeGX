import * as React from "react";
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Text, Image, Div} from 'react-native-magnus';
import {uploadsUrl} from '../utils/Variables';


const ListItem = ({singleMedia, navigation}) => {
  const item = singleMedia;
  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate('Recipe',item);
    }}>
      <Div w={'100%'} flex={1} alignItems={'center'} justifyContent={'center'}>
        <Div
          w={'90%'}
          flex={1}
          alignItems={'center'}
          justifyContent={'center'}
          bg='gray700'
          rounded="lg"
          m={10}
        >
          <Image
            h={200}
            w={325}
            m={10}
            rounded="lg"
            source={{uri: uploadsUrl + item.thumbnails?.w160}}
          ></Image>

          <Text
          color='gray100'
          >{item.title}</Text>
          <Text
          color='gray100'>{item.description}</Text>
        </Div>
      </Div>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
