import * as React from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useCallback, useContext, useRef, useState} from 'react';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {Controller, useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appId, tempToken, uploadsUrl} from '../utils/Variables';
import {
  Text,
  Image,
  ScrollDiv,
  Button,
  Dropdown,
  Input,
} from 'react-native-magnus';
import {Div} from 'react-native-magnus';
import {SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import List from '../components/List';
import {MainContext} from '../contexts/MainContext';
import { dark, red } from '../utils/Colors';

const AddRecipe = ({navigation, route}) => {
  const [mediafile, setMediafile] = useState({});
  const [loading, setLoading] = useState(false);
  const {update, setUpdate} = useContext(MainContext);
  const {postTag} = useTag();
  const {postMedia} = useMedia();
  const dropdownComments = React.createRef();
  const dropdownSteps = React.createRef();
  const {
    control,
    handleSubmit,
    formState: {errors},
    trigger,
    reset,
    getValues,
  } = useForm({
    defaultValues: {title: '', description: '',steps:'', ingredients:''},
    mode: 'onChange',
  });

  const pickFile = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      console.log(result);

      if (!result.canceled) {
        setMediafile(result.assets[0]);
        // validate form
        trigger();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = async (data) => {
    // create form data and post it
    setLoading(true);
    const formData = new FormData();
    console.log(getValues("steps"))
   
    const recipeData = {
      description: getValues("description"),
      steps: getValues("steps"),
      ingredients: getValues("ingredients") 
    }
    formData.append('title', data.title);
    formData.append('description', JSON.stringify(recipeData));
    const filename = mediafile.uri.split('/').pop();
    let fileExt = filename.split('.').pop();
    if (fileExt === 'jpg') fileExt = 'jpeg';
    const mimeType = mediafile.type + '/' + fileExt;
    formData.append('file', {
      uri: mediafile.uri,
      name: filename,
      type: mimeType,
    });
    console.log('form data', formData);
    try {
      // const token = await AsyncStorage.getItem('userToken');
      const token = await AsyncStorage.getItem('userToken');
      const result = await postMedia(formData, token);

      const appTag = {
        file_id: result.file_id,
        tag: appId,
      };
      const tagResult = await postTag(appTag, token);
      console.log('tag result', tagResult);

      Alert.alert('Uploaded', 'File id: ' + result.file_id, [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            setUpdate(!update);
          },
        },
      ]);
    } catch (error) {
      console.error('file upload failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollDiv nestedScrollEnabled={true}>
      <Div>
        <Div bg="black" h={'100%'}>
          <TouchableOpacity onPress={pickFile}>
            <Image
              source={{
                uri: mediafile.uri || 'https://placekitten.com/g/200/300',
              }}
              h={250}
            ></Image>
          </TouchableOpacity>
          <Div
            bg={dark}
          
            h={'75%'}
            style={{
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'is required',
                },
                minLength: {
                  value: 3,
                  message: 'Title min length is 3 characters.',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  fontSize="lg"
                  textAlign="center"
                  fontWeight="bold"
                  textTransform="uppercase"
                  color='black'
                  letterSpacing={1}
                  mt="lg"
                  mb="lg"
                  bg="white"
                  w={'60%'}
                  borderColor="transparent"
                  
                  placeholder="Add Recipe name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.title && errors.title.message}
                ></Input>
              )}
              name="title"
            />
            <ScrollDiv>
              <Controller
                control={control}
                rules={{
                  minLength: {
                    value: 5,
                    message: 'Description min length is 5 characters.',
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    textAlign="center"
                    color="black"
                    fontSize={15}
                    placeholder="add description"
                    w={250}
                    h={100}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={
                      errors.description && errors.description.message
                    }
                  ></Input>
                )}
                name="description"
              />
            </ScrollDiv>
        
            <ScrollDiv>
              <Controller
                control={control}
                rules={{
                  minLength: {
                    value: 5,
                    message: 'Igredients min length is 5 characters.',
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    textAlign="center"
                    color="black"
                    fontSize={15}
                    placeholder="add Ingredients"
                    w={250}
                    h={100}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={
                      errors.description && errors.description.message
                    }
                  ></Input>
                )}
                name="ingredients"
              />
            </ScrollDiv>

            <ScrollDiv>
              <Controller
                control={control}
                rules={{
                  minLength: {
                    value: 5,
                    message: 'Igredients min length is 5 characters.',
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    textAlign="center"
                    color="black"
                    fontSize={15}
                    placeholder="add instructions"
                    w={250}
                    h={100}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={
                      errors.description && errors.description.message
                    }
                  ></Input>
                )}
                name="steps"
              />
            </ScrollDiv>

            <Div h={300}>
              <Div row flexWrap="wrap" justifyContent="space-evenly" bg="gray500" p="lg"w={'30%'} rounded='xl'>
     
                <Button
                  mt="xs"
                  p="xs"
                  bg="transparent"
                  borderBottomColor="green500"
                  color="red400"
                  underlayColor="red100"
                  loading={loading}
                  disabled={
                    !mediafile.uri || errors.title || errors.description
                  }
                  title="Upload"
                  onPress={handleSubmit(uploadFile)}
                >
                  Upload
                </Button>
              </Div>
            </Div>
            <Dropdown
              ref={dropdownSteps}
              h={'100%'}
              w={'100%'}
              roundedTop={35}
              title={
                <Text mx="lg" color="red400" textAlign="center">
                  Steps
                </Text>
              }
            ></Dropdown>
          </Div>
        </Div>
      </Div>
    </ScrollDiv>
  );
};

AddRecipe.propTypes = {
  route: PropTypes.object,
};

export default AddRecipe;
