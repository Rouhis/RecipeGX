import * as React from 'react';
import {View} from 'react-native';
import {Button, Div} from 'react-native-magnus';
import PropTypes from 'prop-types';
import {useMedia} from '../hooks/ApiHooks';
import {black, red} from '../utils/Colors';

const FeelLucky = ({navigation}) => {
  const {mediaArray} = useMedia();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: black,
      }}
    >
      <Div>
        <Button
          bg={red}
          onPress={() => {
            navigation.navigate(
              'Recipe',
              mediaArray[Math.floor(Math.random() * mediaArray.length) + 0]
            );
          }}
        >
          Press here for random recipe
        </Button>
      </Div>
    </View>
  );
};

FeelLucky.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default FeelLucky;
