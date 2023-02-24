import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import {Div} from 'react-native-magnus';

const List = ({navigation}) => {
  const {mediaArray} = useMedia();
  return (
    <FlatList
      style={styles.center}
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ListItem navigation={navigation} singleMedia={item} />}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    width: '100%',
    flex: 1,
    backgroundColor: '#1a202c',
  },
});

List.propTypes = {
  navigation: PropTypes.object,
};
export default List;
