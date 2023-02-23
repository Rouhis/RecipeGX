import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Text, Image, Div} from 'react-native-magnus';
import {uploadsUrl} from '../utils/Variables';
import {pink} from '../utils/Colors';

const ListItem = ({singleMedia}) => {
  const item = singleMedia;
  return (
    <TouchableOpacity>
      <Div w={'100%'} flex={1} alignItems={'center'} justifyContent={'center'}>
        <Div
          w={'80%'}
          flex={1}
          alignItems={'center'}
          justifyContent={'center'}
          bg={pink}
          rounded="lg"
          m={10}
        >
          <Image
            h={100}
            w={200}
            m={10}
            roundedTop={15}
            roundedBottom={15}
            source={{uri: uploadsUrl + item.thumbnails?.w160}}
          ></Image>

          <Text>{item.title}</Text>
          <Text>{item.description}</Text>
        </Div>
      </Div>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
