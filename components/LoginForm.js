import React, {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthentication} from '../hooks/ApiHooks';
import {View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {Text, Input, Button} from 'react-native-magnus';

import {useNavigation} from '@react-navigation/core';

const LoginForm = () => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {postLogin} = useAuthentication();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {username: '', password: ''},
  });

  const logIn = async (loginData) => {
    console.log('Login button pressed', loginData);
    try {
      const loginResult = await postLogin(loginData);
      console.log('logIn', loginResult);
      await AsyncStorage.setItem('userToken', loginResult.token);
      setUser(loginResult.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('logIn', error);
      // TODO: notify user about failed login attempt
    }
  };

  return (
    <View>
      <Text
        fontSize={30}
        fontWeight="bold"
        textTransform="uppercase"
        fontFamily="sans-serif-condensed"
        color="red600"
        ml={80}
        letterSpacing={2}
      >
        Recipe GX
      </Text>
      <Controller
        control={control}
        rules={{required: true, minLength: 3}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            mt={50}
            rounded={10}
            w={300}
            p={10}
            textAlign="center"
            focusBorderColor="red600"
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="username"
      />
      {errors.username?.type === 'required' && <Text>is required</Text>}
      {errors.username?.type === 'minLength' && (
        <Text color="white">min length is 3 characters</Text>
      )}
      <Controller
        control={control}
        rules={{required: true, minLength: 5}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            mt={25}
            rounded={10}
            w={300}
            p={10}
            focusBorderColor="red600"
            textAlign="center"
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text color="white">Password (min. 5 chars) is required .</Text>
      )}
      <Button
        mt={30}
        ml={110}
        px="xl"
        bg="red600"
        color="white"
        title="Sign in!"
        onPress={handleSubmit(logIn)}
      >
        Login
      </Button>
      <Button
        mt={30}
        ml={100}
        px="xl"
        bg="red600"
        color="white"
        title="Sign up!"
        onPress={() => navigation.navigate('Register')}
      >
        Register
      </Button>
    </View>
  );
};

export default LoginForm;
