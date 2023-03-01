import React from 'react';
import {useUser} from '../hooks/ApiHooks';
import {View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {Button, Text, Input} from 'react-native-magnus';

const RegisterForm = () => {
  const {postUser} = useUser();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {username: '', password: ''},
  });

  const register = async (registerData) => {
    console.log('Registering: ', registerData);
    try {
      const registerResult = await postUser(registerData);
      console.log('registeration result', registerResult);
    } catch (error) {
      console.error('register', error);
      // TODO: notify user about failed registeration attempt
    }
  };

  return (
    <View>
      <Text
        fontSize={25}
        fontWeight="bold"
        textTransform="uppercase"
        color="red600"
        ml={20}
        letterSpacing={2}
      >
        Registeration Form
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
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            mt={25}
            rounded={10}
            w={300}
            p={10}
            focusBorderColor="red600"
            textAlign="center"
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email?.type === 'required' && (
        <Text color="white">is required</Text>
      )}
      <Controller
        control={control}
        rules={{minLength: 3}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            mt={25}
            rounded={10}
            w={300}
            p={10}
            focusBorderColor="red600"
            textAlign="center"
            placeholder="Full name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="full_name"
      />
      {errors.full_name?.type === 'minLength' && (
        <Text color="white">min length is 3 characters</Text>
      )}

      <Button
        mt={30}
        ml={95}
        px="xl"
        bg="red600"
        color="white"
        title="Sign up!"
        onPress={handleSubmit(register)}
      >
        Register
      </Button>
    </View>
  );
};

export default RegisterForm;
