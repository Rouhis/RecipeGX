import * as React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-magnus';

const FeelLucky = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text fontSize="lg" fontWeight="bold">
        FeelLucky!
      </Text>
    </View>
  );
};

export default FeelLucky;
