import {
    View,
    TouchableOpacity,
  } from 'react-native';
import PropTypes from 'prop-types';
import { Text, Image } from 'react-native-magnus';
import { uploadsUrl } from '../utils/Variables';
  
  const ListItem = ({singleMedia}) => {
    const item = singleMedia;
    return (
      <TouchableOpacity>
        <Image
           h={100}
           w={100}
           m={10}
           rounded="circle"
          source={{uri: uploadsUrl + item.thumbnails?.w160}}
        ></Image>
        <View>
          <Text>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  ListItem.propTypes = {
    singleMedia: PropTypes.object,
  };
  
  export default ListItem;
