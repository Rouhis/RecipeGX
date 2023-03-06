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
  } = useForm({
    defaultValues: {title: '', description: ''},
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
    formData.append('title', data.title);
    formData.append('description', data.description);
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
                uri: mediafile.uri || 'data:image/png;base64,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AWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFYBAWvWllNvAgQIECBAYFgBAWvYplExAgQIECBAYFaB/wdtNxqXQ8s+kQAAAABJRU5ErkJggg==',
              }}
              h={250}
            ></Image>
          </TouchableOpacity>
          <Div
            bg={dark}
            roundedTop={35}
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
                  color='white'
                  letterSpacing={1}
                  mt="lg"
                  mb="lg"
                  bg="transparent"
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
                    color="red300"
                    placeholder="add description"
                    w={250}
                    h={250}
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

            <Div bg="gray500" p="lg" h={103} w={'100%'} roundedTop={35}>
              <Div row flexWrap="wrap" justifyContent="space-evenly">
                <Button
                  mt="xs"
                  p="xs"
                  bg="transparent"
                  borderBottomColor="green500"
                  color="red400"
                  underlayColor="red100"
                  onPress={() => dropdownSteps.current.open()}
                >
                  Steps
                </Button>
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
