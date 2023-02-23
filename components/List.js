import {FlatList, StyleSheet, View} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from './ListItem';
import {Div} from 'react-native-magnus';
const List = () => {
  const {mediaArray} = useMedia();
  return (
    <FlatList
      style={styles.center}
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    width: '100%',
    flex: 1,
  },
});
export default List;
