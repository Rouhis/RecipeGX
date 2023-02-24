import * as React from 'react';
import { View } from 'react-native';
import { Text, Image } from 'react-native-magnus';
import { Div } from 'react-native-magnus';
import { SafeAreaView } from 'react-native-web';
import PropTypes from 'prop-types';

const Recipe = ({navigation, route}) => {
    console.log(route.params);
    const {title, description, filename, time_added: timeAdded} = route.params;
    return (
      <SafeAreaView style={styles.container}>
        <Text>{title}</Text>
        <Image style={styles.image} source={{uri: uploadsUrl + filename}} />
        <Text>{timeAdded}</Text>
        <Text>{description}</Text>
      </SafeAreaView>
    );
  };
  
 
 Recipe.propTypes = {
    route: PropTypes.object,
  };

 export default Recipe;