import * as React from 'react';
import { View } from 'react-native';
import { Text } from "react-native-magnus";
import {StyleSheet, SafeAreaView} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import List from '../components/List';
const Home = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <List />
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
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

  export default Home;