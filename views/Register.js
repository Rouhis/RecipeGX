import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

import PropTypes from 'prop-types';
import RegisterForm from '../components/RegisterForm';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Register.propTypes = {
  navigation: PropTypes.object,
};

export default Register;
