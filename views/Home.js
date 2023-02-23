import {StyleSheet, SafeAreaView, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <List />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
