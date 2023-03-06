import {FlatList, StyleSheet} from 'react-native';
import {useComment} from '../hooks/ApiHooks';
import ListItem from './ListItemComment';
import PropTypes from 'prop-types';
import {black} from '../utils/Colors';

const List = ({navigation, fileId}) => {
  const {commentArray} = useComment(fileId);
  console.log('Listan saama numero ' + fileId);
  return (
    <FlatList
      style={styles.center}
      data={commentArray}
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
    backgroundColor: black,
  },
});
List.propTypes = {
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
  fileId: PropTypes.number,
};
export default List;
