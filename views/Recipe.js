import * as React from 'react';
import {Text, Image} from 'react-native-magnus';
import {SafeAreaView} from 'react-native-web';
import PropTypes from 'prop-types';

const Recipe = ({navigation, route}) => {
    console.log(route.params);
    const {title, description, filename, time_added: timeAdded} = route.params;
    return (
     <Div><Text>{title}</Text>
     <Text>{description}</Text></Div>

    );
  };


 Recipe.propTypes = {
    route: PropTypes.object,
  };

Recipe.propTypes = {
  route: PropTypes.object,
};

export default Recipe;
