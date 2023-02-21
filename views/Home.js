import * as React from "react";
import { Text, Fab , Button ,Icon , Div} from "react-native-magnus";
import { StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import List from "../components/List";
const Home = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <List />
        <Fab bg="blue600" h={50} w={50}>
          <Button p="none" bg="transparent" justifyContent="flex-end">
            <Div rounded="sm" bg="white" p="sm">
              <Text fontSize="md">Add a recipe</Text>
            </Div>
            <Icon
              name="pizza-slice"
              fontFamily="FontAwesome5"
              color="black"
              h={50}
              w={50}
              rounded="circle"
              ml="md"
              bg="white"
            />
          </Button>
        </Fab>
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
