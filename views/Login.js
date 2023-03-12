/* Importing the necessary components for the Login screen. */
import {useContext, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {useUser} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();

  /*
   * If there's a token, get the user data and set the user state to the user data and set the
   * isLoggedIn state to true.
   * @returns The userData object is being returned.
   */
  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      // if no token available, do nothing
      if (userToken === null) return;
      const userData = await getUserByToken(userToken);
      console.log('checkToken', userData);

      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('checkToken', error);
    }
  };

  /* Checking if there is a token in the AsyncStorage. If there is, it will get the user data and set
  the user state to the user data and set the isLoggedIn state to true. */
  useEffect(() => {
    checkToken();
  }, []);

  /* A function that is being called in the Login.js file. */
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
        <LoginForm />
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

/* Styling the Login screen. */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/* A prop type checker. It is used to check the props that are being passed to the component. */
Login.propTypes = {
  navigation: PropTypes.object,
};

/* Exporting the Login component. */
export default Login;
