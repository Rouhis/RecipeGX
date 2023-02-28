import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useMedia, useTag} from '../hooks/ApiHooks';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import {Div} from 'react-native-magnus';

const List = ({navigation, myFilesOnly = false}) => {
  const {mediaArray} = useMedia(myFilesOnly);
  return (
    <FlatList
      style={styles.center}
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <ListItem navigation={navigation} singleMedia={item} />
      )}
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
  myFilesOnly: PropTypes.bool,
};
export default List;
