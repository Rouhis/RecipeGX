import * as React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-magnus';
import { Div } from 'react-native-magnus';

const AddRecipe = ({navigation}) => {
    return (
        <Div
        flex={1}
        alignItems={'center'}
        >
          <Text
          fontSize="lg"
          fontWeight='bold' >
            LOL!
            </Text>
        </Div>
      );
  };

  export default AddRecipe;