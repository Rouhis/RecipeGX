/* Importing the components from the react-native library. */
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

import PropTypes from 'prop-types';
import RegisterForm from '../components/RegisterForm';

/*
 * The Register function returns a TouchableOpacity component that wraps a KeyboardAvoidingView
 * component that wraps a RegisterForm component
 * @return A TouchableOpacity component that wraps a KeyboardAvoidingView component that wraps a
 * RegisterForm component.
 */
const Register = ({navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => Keyboard.dismiss()}
      style={{flex: 1}}
      activeOpacity={1}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <RegisterForm />
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

/* Creating a style sheet for the Register component. */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/* Defining the propTypes for the Register component. */
Register.propTypes = {
  navigation: PropTypes.object,
};

/* Exporting the Register component so that it can be imported into other files. */
export default Register;
