import * as React from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useContext, useState} from 'react';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {Controller, useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appId} from '../utils/Variables';
import {
  Text,
  Image,
  ScrollDiv,
  Button,
  Dropdown,
  Input,
} from 'react-native-magnus';
import {Div} from 'react-native-magnus';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {black, dark, red} from '../utils/Colors';

const AddRecipe = ({navigation, route}) => {
  const [mediafile, setMediafile] = useState({});
  const [loading, setLoading] = useState(false);
  const {update, setUpdate} = useContext(MainContext);
  const {postTag} = useTag();
  const {postMedia} = useMedia();
  const dropdownSteps = React.createRef();
  const {
    control,
    handleSubmit,
    formState: {errors},
    trigger,
    reset,
    getValues,
  } = useForm({
    defaultValues: {title: '', description: '', steps: '', ingredients: ''},
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
    console.log(getValues('steps'));

    const recipeData = {
      description: getValues('description'),
      steps: getValues('steps'),
      ingredients: getValues('ingredients'),
    };
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
                uri:
                  mediafile.uri ||
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQCAYAAAByNR6YAAAAAXNSR0IArs4c6QAAIABJREFUeF7t3QnUPu9fD/BP2ZfsZDlOx3JIIlspFCEUEsdaIWTPkpQsldJiz1I5VBIiyxFRyBYSQqikSMghJCpFWcp59505pvnfy9z3/Xme73X9f685p3P+/Z77O/fnfl3XzLznmmtmXqOqvqosBAgQIECAAAECbQKvIWC1WVoRAQIECBAgQOCrBQQsHYEAAQIECBAg0CwgYDWDWh0BAgQIECBAQMDSBwgQIECAAAECzQICVjOo1REgQIAAAQIEBCx9gAABAgQIECDQLCBgNYNaHQECBAgQIEBAwNIHCBAgQIAAAQLNAgJWM6jVESBAgAABAgQELH2AAAECBAgQINAsIGA1g1odAQIECBAgQEDA0gcIECBAgAABAs0CAlYzqNURIECAAAECBAQsfYAAAQIECBAg0CwgYDWDWh0BAgQIECBAQMDSBwgQIECAAAECzQICVjOo1REgQIAAAQIEBCx9gAABAgQIECDQLCBgNYNaHQECBAgQIEBAwNIHCBAgQIAAAQLNAgJWM6jVESBAgAABAgQELH2AAAECBAgQINAsIGA1g1odAQIECBAgQEDA0gcIECBAgAABAs0CAlYzqNURIECAAAECBAQsfYAAAQIECBAg0CwgYDWDWh0BAgQIECBAQMDSBwgQIECAAAECzQICVjOo1REgQIAAAQIEBCx9gAABAgQIECDQLCBgNYNaHQECBAgQIEBAwNIHCBAgQIAAAQLNAgJWM6jVESBAgAABAgQELH2AAAECBAgQINAsIGA1g1odAQIECBAgQEDA0gcIECBAgAABAs0CAlYzqNURIECAAAECBAQsfYAAAQIECBAg0CwgYDWDWh0BAgQIECBAQMDSBwgQIECAAAECzQICVjOo1REgQIAAAQIEBCx9gAABAgQIECDQLCBgNYNaHQECBAgQIEBAwNIHCBAgQIAAAQLNAgJWM6jVESBAgAABAgQELH2AAAECBAgQINAsIGA1g1odAQIECBAgQEDA0gcIECBAgAABAs0CAlYzqNURIECAAAECBAQsfYAAAQIECBAg0CwgYDWDWh0BAgQIECBAQMDSBwgQIECAAAECzQICVjOo1REgQIAAAQIEBCx9gAABAgQIECDQLCBgNYNaHQECBAgQIEBAwNIHCBAgQIAAAQLNAgJWM6jVESBAgAABAgQELH2AAAECBAgQINAsIGA1g1odAQIECBAgQEDA0gcIECBAgAABAs0CAlYzqNURIECAAAECBAQsfYAAAQIECBAg0CwgYDWDWh0BAgQIECBAQMDSBwgQIECAAAECzQICVjOo1REgQIAAAQIEBCx9gAABAgQIECDQLCBgNYNaHQECBAgQIEBAwNIHCBAgQIAAAQLNAgJWM6jVESBAgAABAgQELH2AAAECBAgQINAsIGA1g1odAQIECBAgQEDA0gcIECBAgAABAs0CAlYzqNURIECAAAECBAQsfYAAAQIECBAg0CwgYDWDWh0BAgQIECBAQMDSBwgQIECAAAECzQICVjOo1REgQIAAAQIEBCx9gAABAgQIECDQLCBgNYNaHQECBAgQIEBAwNIHCBAgQIAAAQLNAgJWM6jVESBAgAABAgQELH2AAAECBAgQINAsIGA1g1odAQIECBAgQEDA0gcIECBAgAABAs0CAlYzqNURIECAAAECBAQsfYAAAQIECBAg0CwgYDWDWh0BAgQIECBAQMDSBwgQIECAAAECzQICVjOo1REgQIAAAQIEBCx9gAABAgQIECDQLCBgNYNaHQECBAgQIEBAwNIHCBAgQIAAAQLNAgJWM6jVESBAgAABAgQELH2AAAECBAgQINAsIGA1g1odAQIECBAgQEDA0gcIECBAgAABAs0CAlYzqNURIECAAAECBAQsfYAAAQIECBAg0CwgYDWDWh0BAgQIECBAQMDSBwgQIECAAAECzQICVjOo1REgQIAAAQIEBCx9gAABAgQIECDQLCBgNYNaHQECBAgQIEBAwNIHCBAgQIAAAQLNAgJWM6jVESBAgAABAgQELH2AAAECBAgQINAsIGA1g1odAQIECBAgQEDA0gcIECBAgAABAs0CAlYzqNURIECAAAECBAQsfYAAAQIECBAg0CwgYDWDWh0BAgQIECBAQMDSBwgQIECAAAECzQICVjOo1REgQIAAAQIEBCx9gAABAgQIECDQLCBgNYNaHQECBAgQIEBAwNIHCBAgQIAAAQLNAgJWM6jVESBAgAABAgQELH2AAAECBAgQINAsIGA1g1odAQIECBAgQEDA0gcIECBAgAABAs0CAlYzqNURIECAAAECBAQsfYAAAQIECBAg0CwgYDWDWh0BAgQIECBAQMDSBwgQIECAAAECzQICVjOo1REgQIAAAQIEBCx9gAABAgQIECDQLCBgNYNaHQECBAgQIEBAwNIHCBAgQIAAAQLNAgJWM6jVESBAgAABAgQELH2AAAECBAgQINAsIGA1g1odAQIECBAgQEDA0gcIECBAgAABAs0CAlYzqNURIECAAAECBAQsfYAAAQIECBAg0CwgYDWDWh0BAgQIECBAQMDSBwgQIECAAAECzQICVjOo1REgQIAAAQIEBCx9gAABAgQIECDQLCBgNYNaHQECBAgQIEBAwNIHCBAgQIAAAQLNAgJWM6jVESBAgAABAgQELH2AAAECBAgQINAsIGA1g1odAQIECBAgQEDA0gcIECBAgAABAs0CAlYzqNURIECAAAECBAQsfYAAAQIECBAg0CwgYDWDWh0BAgQIECBAQMDSBwgQIECAAAECzQICVjOo1REgQIAAAQIEBCx9gAABAgQIECDQLCBgNYNaHQECBAgQIEBAwNIHCBAgQIAAAQLNAgJWM6jVESBAgAABAgQELH2AAAECBAgQINAsIGA1g1odAQIECBAgQEDA0gcIECBAgAABAs0CAlYzqNURIECAAAECBAQsfYAAAQIECBAg0CwgYDWDWh0BAgQIECBAQMDSBwgQIECAAAECzQICVjOo1REgQIAAAQIEBCx9gAABAgQIECDQLCBgNYNaHQECBAgQIEBAwNIHCBAgQIAAAQLNAgJWM6jVESBAgAABAgQELH2AAAECBAgQINAsIGA1g1odAQIECBAgQEDA0gcIECBAgAABAs0CAlYzqNURIECAAAECBAQsfYAAAQIECBAg0CwgYDWDWh0BAgQIECBAQMDSBwgQIECAAAECzQICVjOo1REgQIAAAQIEBCx9gAABAgQIECDQLCBgNYNaHQECBAgQIEBAwNIHCBAgQIAAAQLNAgJWM6jVESBAgAABAgQELH2AAAECBAgQINAsIGA1g1odAQIECBAgQEDA0gcIECBAgAABAs0CAlYzqNURIECAAAECBIYIWN+2qn5IVf34qnqjqnrdTbt8VlV9SlX92ar661X1xQfb7HtU1V+sqtdZPv/zquoPHvy31z72Q6vqEzcfunfd32D5vT+mqt68qt6gqr7+st7/WFWfWlWfsPz2z6uqr7pWWFV9q6r6C1X1A5fP/paqevcD/277kdesqp9TVb+vqr7O8of/XVW/sqr+QFX9nxvXl4/v6/pjVfXzq+p/3LGuo/7777zjq17ln5zz3Nd0y3f9t6r6V1X1D6rqr9zQz39uVX34LV905bP/tqresqr++R3rfArrtYyjfTg7s29XVT+yqn5CVb3ehX3J36yq/3rH7+z6J9k+09avtazwPyz2n3bHF9xjn/1L9il/v6r+fFX93ar60hu++57+nn355y+/O/uo9LN79iVHyrynvqw3NX5uVaV//Jnlf3/llS/cb4c/bPn3R+rcfuYbVtWHVtXbLv8xbfPjquq/3Liir1tVP2A5nr5ZVeVY+M2XdWRf8+lV9ZeW48QtbfCbq+rX3FjLkY/f8ju/RVWlbd+mqr7vsn2vx6h/XVX/uKr+XFX91aWvHTlmHqnx3s+8tICVL/6eVfUbq+qtNwfySz/ky6vqA6vqd1TVF175xSMHrOwQf1FV/apNx7/WgB9XVb+hqv7JlQ8+GrCeIlwJWNda92v+PQe/d6mqj66qSzt3AeuFW/Yl2dm+T1X92IPUOWH4qKr6TctB9OA/a/lY6v11VfW+u7Vl+37/gydS2396T8Da/5AceH97Vf3uqvqyA7/y3gCzXXUO9Dlg/+Ur/fxAOa/ykY76stKc2GdbTOg6t4wSsL7Rclz51VWVQYsjy+dU1XsuYfIrrvyDlxmwvnNVvUdVvd3BrJCfkmNmfltC18sKWi8lYKUjBCsBY02fRzrD+pl/toyw5Iz/3DJiwEp4SZjMyNDRDWD7+xIwM4qUUYtzZ36PBKx0hneoqt+/G7n6xVX1EQ/uBI1g3dLDqxIAfmFV/aELOwcBq+rRfUm2qQSbD6qqaweY21rw/Ke//XKWnVGG7fIPl5G3jGbdsnQErPX7crXgZ1XVZ18poCvA5Gt+T1X9+htH0K75dNaXkd2fWVV/+8yXvuyAlf12RkQ/bBm0uGZz6u/5bdnP59h6bnkZAevrVVV8f+fm6s4tvy/70Q9ZgtaX3PIPmz777AHr2yyXmTKEv11yNpODeIaqc7aQM/cMmX6fqvpJVfXTdsA5y3/7qvprZyBGC1hfewlHOUPdhsqcOX7kMmSb4dpcMksQ+25V9SOqKpcfv+PmN6bD5Mw36zkVsu4NWOfC1bWD/NF+OELA+hvL6OcjB9L0u8848aP3O/RfXlV//ABO+kL66o+qql+wG9FM3/iJFy437HfsOWHJdnTvkv6Uy9L37IiyI3zDAzvB9OefvhT4n6vq1y6Xqi7VfM783L4kn499pgikrbLNxPn1q+qtqupnnxg5zr4nJy/3/PZbvTMl4GOXmjJ6k8s3mRqR5WcsI5e3rHO/bWXk89Kl46+1HIgzJSH9bn+yl4PsT62qz7xQxL6/X+t7uRSa73uTqsplq3UqxPoVqTf+t1ymvGR0a31Z1+rywxeX7X767ywmp8LvywxY2W/n2JgQsV4GzG9Jn/+kqspUjBxT/9OC9dpLGyREv+kOMNtN/nsur50a8cn2c21g4HstYWhddUZF08cvLTnJyWDJfr/8javq/aoq+9Ltkv1iRhbzf7mic+2YmX+bqTbvWFX/7pYNq+GzzxqwAvbBSyOutWeIMoDXholz1ve7quqnbH50dgQJapm/sl9GClinwks6VS5PXBuSz4HrnZZQte6UsvFkqPRPnfjd9wSsc/UlXP2RpuHVEQLWI/O+rm1rR+eFXVpPdn7p42sAyWczb/CXnBld6dqxX/ttnX/fngU/Mufr1L4kB4hceks7XwrRGfXKgSQ77+1B6Q9X1S9tPMifcsv2nINh2i7LO1dVgmKCZpZ7+ug92/xaW078fvSyX17nq64HpIS9c/PU9v39lnlH33TZ5+cqxjbExCDz7Tou5zxSX/aHb7yMHudEd11ynMpI576+ru3wnjlYOQnPcWDbj49c1lyn6GR73F5WT3jJMfbcwMW1fUHHfjDfkX6Z/pFLfOtyyzEzJ1KZTrTt05lXlz6deYDPtTxbwMoX5Xr7B2x+WX5whl6PpspTO9UElFxz3o/mjBSwsrF+/G6iYRo6qfrIzuRUAMp15YTLvd2tO9usO22Qy4JrgEtH7gxXaXIB69gmndHKTNLMnKIsl0JI1479WGU9n+oIWKd2vrkBJmeomeh6dMlllYSq7UG08yB/qo7vsuwL8p05UcpoSUZOMuE9YeOeye63bvOn6sp82EzqPhIo8u8fCTD596f2afntudEpo6iPLo/Wl+/fh5f0sYSPfejs2g5vDVj7NjsyhWTvmhut3ruq3nXzh0sDF9fapSNgneobR6YF7Wv7TssAwQ/e/CHHuV/xjNMBni1gfb/lbpWMRGU5FxCuNeD+AHRuhzRKwMrZWubR5K6HLNmp5rJPJuDdsuSgkuHWdI51ydl2zoa3yy0721PDyzmDyYjJnzgY/o7+BgHrqNSLUZiMrqxL7iQ61V+6duzHK3v8kx0BKzvxj9mcsDxyZro/SHUe5E9pZdvKKH6WXLrJSdL/XUYhEray3DrZ/ZZt/lIL7gPFpX10R4A5FZTPnTDf2vM66tuPNuaSdi7vxmW7dG2HtwSsfDb9KHNmsxyZs3nOsLMdOgJWniKQk8w17P+LZZrQpflh535b7irOdIHUtTrdc/y9tf+tn3+WgJUGzNBvrtOvP/LcJa4jP2TfoTNBMnOStssoAWs73yL1PZKg978pZ72ZK/FFmx9+dGf7nOEq5QlYR3r2i89kyD63sa/LuceAdO3Yj1f2+CcfDVj7g15OCHI54O/dWVq2gzhmgvC6ZEJtRtu7HyGQeUi55L7OP12/JwFre1fhrZPdj27z14iyn36vJeCtnz03J6wjwOQ7MqcnJ3OZl5UlB9O056lpH9fq3/69q76c0Oay/brkESD7y2dd2+EtAesHLfN218d8PHJcyW/LwMefrKp1tOeekdSs59GAtb/D9tJ0mKP9IZfAcxl1tcpIbeZhds33u1THswSsDNXlDDwBIcu5odajYN9hmRieSZiZu5U7X/KskO3lthECVp5Hkmv2ed5Tlv++nAF98tEfuvtcdoA5QOWW1Ty75m8tl5C2B4IjO9s0eu5mzMTe7fNR8uyrTL49ctny1p8gYB0XE7DOW33vZfL6OhJ+aY7aUfE8Wyc74HUEqesgv//+7UExB45sg3keUZb9c7Fumex+ZJs/arH3PTcnrCvApK7tqF7+/3ufK/gUAWsfnk7V9twBaz9g8ehxZXXL3M/tjTm3jqR2BKz9HbaPZoXUtD8p6/I6sk09S8DaHzBOjTgdKfaWz4wQsBIEMxKROyGznBpxuuU3HfnstZ3tywhXqVvAOtJ6Lz7jEuF5q/2IwrnLp8e1X3xyv97MtfnTt67kwuez3eWy7zqZfX/gyPzS3E2cO6az3HKWfW2bv+Vn5AaA3NGXO9Oy5C6tGP/73Uo6A1Yu0+aOz/Vu6d+7XO14ZASxq759eBphBGt/XMnltMyjTXB4ZOk4Xj06grXPCrmzNJeNH11eRgZJzc8SsHK3XNLwupzqpI8C7v/9CAErT6fPjnS9UyZzqN7tiUaI1t9/aWebxs5t2TlL2Y5c3TLh/t52ErCOye3nGF4aTek6cz5WWc+nHrlEuB8RzmNNsuO8ZWL7uV+RmwoympQ7+rJ0HOS337U/Mz81OrAdybnlLLszYKXm7f46dbzF8sT37e/pCjBZZ0YQM3K+Xp7qOBHtqC8jRbmM+8uWH37Ooms7PHqJcD/a2TVgsf+95+acXdoTPBqwtieX57zv2RM9VSi9VsuTB6zcmZbrw7ktOkuurecaew4cT7mMELByVpG7lNYlBpmD8ZTLpZ3tfhJrOnDOVHNgeYrLgtvfKWBdb/VvskxczfPd1uXSpN+uHfv1yvo+8UjAeooD8frLEqwyjWF9+GfXqMC6/p+8eazKuQPX9g7D/Lujl2i6A9a+X50azesIMKvNPlh0BOeO+vbHkPWmhC/YbQ5d2+HRgLU/rnSOtmY6S16Hti63jhA/ErD2WaGjH6y/4+jIbN+e7sWanjxgfbNl8lzOgrLc8t6hR37sCAFrf6nnlmfF3Pvbz+1sTz0vJd/x1Lelr7+j82nTe5tzcza6v/PSO/Hu3bFkp5o6M7KYidXfdfPjchKSCdF5P9qppfNJ7o88k+qWvvpIwMpdRXncSYJIlnueGXWu1v0OuHM/tZ8Dcu7y3/5zRye7dwesI325I8Bs2+KRfnGqTR+t79RDbM8F3s7tcPtbzvXB/RWhzuNKjhN50Oi63Dof7kjfObcN7k+gOrfBBJ3fujzSKd//XPu7Jw9Y+42/Y/j3yA59hIC13Wl0Dnde+v2ndrYx3z+Mbl3How+WO9IW+Ux32Nl+74gB66jLuc9dez1H/l3njv25djiPHEj32/TRl0AfaYv96EGnx37i+KWD1n6uyJHJ7k8dsE7Ng3k0wOzbZNsv7rk0tV/fPfWlD+S2/owI5XLt9g0al54N1bkdHglYj2xD17aFvdut29gjAavzKsep37l/1U9nMD3n+uwBq/Os81JnGS1gde6wbwlYmZ+Sh8mtrzjIqEguCea9U+vcsEuvgbi2QR79u4B1TCp3l2WIPmep6+stzv3Lzh37c/XPRw4Oswas7dyqa3co7udqHZns/tQB69RB9p4Ac2kL6D747es7tvWd/tS1k9DO7VDAenFHbZburNDdx470qWcPWJ3DfjMFrNT6HIn5UpDJzj3zwHJnUOb25Gnt65KHoebBpXmv01Ms+7oeeS/g/n1XR0ewHvnOmJx7J17+9sgOPSE4L1vNKy7y0MxzryfZt0vnuwgfeQ/hLf3llRaw9o+A+NDl1Vf/6wza/jlARya7P3XAyjsyU/d2ecqAlbdTvOWVFw9f63OPbI/bdWebz+/P3eDn5ql2bYe5RPwuVfXmSwHnjpWPbEO3uhnBuiZ2+e9PHrCecm7D6AFrP2HwZQasNVxlo82yv1vtkScBH+mCncO/R4ehO7/z2m/c13TuZc95sn/uos3rndb5VjlDzvyAhN7/ee2LNn/vmlx7w1c+/NFHDg77EazOO/32lwgz/ymX63K56pHl0rOvzq13/xDJaw8+7Q5YR57D1hmw9nevdYymPhqw/tHynMA/WlVffKUDdG2HRye5d19OvRScT4XrSxxH982n1rHvx903mmzdOkL8kf3Ckwesp9h4jvywES4RHtlRHfktt3zm1AjWPlyt69s/4fYpXxPSGXaObsSd33mtDY7WtK4ndwzmCdF5uOu6ZIeSHdrRg3rXjv3ab+v8+yMBa9+eeQJ4Ri+/rKHAp5grun8g5L1lXrubqjtgHbmTrDNgPcUdXvv68haRT7/SADnJzL4ygeqWkfyu7fBowDrybK57+9qRO0ifKmA91UlO6n2KO1WPGD95wEoRR143cKTYWz4zQsDaP1vnZTwH61y4iuW5l+ZmYu3Rg/zRNukMO0fDTOd3XvudR2varufUy8tzxpxLtV9y7QtPTHJ/jhHSA2Vd/MgjAespb+N+iudg7Z+984jdpcnunQFrf7fVuQnnnQHrKR6R0VnftXZ77oC1f77iq9NzsI48g+1ae5z6+6vtc7DyY5+iQ+RadR5Ml1fGfOJy2+VXbmRHCFhP8dyeN6yq37a8IigPMc2LR7fzOW7d2e5fhhnC91kmWT/yJOV9J+8MO0fDTOd3Xtuoj9a0X8/+HWD5+wdU1XseeBde14792m/r/PsjASt17F+rcutzes79lv16O54ttH/1yCOOlya737rNX6pj/1idc5dKOwPM/sGZHSeinfVda7eu7fDoCNb+RoiuS2n79d5zx/+9+8HVeP/u3q4nue/X2xVKr/WNZxnB+tbL27HfZKnm0fcL7SeOnrpmP0LA2r8e48iE1UsNtp8Am8/uJ3jfs7PNRvExm6e7Z6i8+43jnWHn6Ebc+Z3XNqSjNZ1az/4ZZfF/x91Dak/9u64d+7Xf1vn3RwPWU72LMG83yLPIsly70++Ix6mDZR4Qmfl2R5bc4ZugnZfSZrm077hnmz9Xw37+17l5bl0B5tQ+rSM0d9V3pK26tsOjAeup3kWYk4qP2txdfvRBt1ujR/aDWc9TvYtwe1PXo8fhI31i/cyzBKzuN2RnblMCwfqYgVMvfB0hYAW5863nR16jcs/ONu2Th1xmh74uOcjkvWh5/kvH0hl2jm7End95zeBoTafWc+pS7bWHjGY9XTv2a7+t8++PBqzcabXfWebAkJe+37vkztoP2+xPrk0qP/I9+yB4z8Fq+/T3fOe5uu7Z5s/1w4weZUpHlv0LqS8dSO+9PL3fpx19uOq1Nnh1Dlj57W+8PHR3feXZR1dV5s596TWYM3/PZdqcZKwvPM983NzJ+Wk3ru+R/WC+6tSxKCebOcbf+7aR/QDCkUef3Pizz378WQJWvn0feHJpK0+pzmz+W5b9Ja1zO4FRAtb+rOTe0aFTB+FTO9x7d7a5uy2PanibTWPkNT+ZD3TvRrtt186wc3Qj7vzOa330aE3n1nPqUm1eMZWD3Vec+UevxIB16uDyyMlAXjScHW6eEp+l60aP/TvVconik691ot3f92fz50bW7t3m9+XsR1IvXWnoCDCn9mn3BNFTrB31HW2uru3w6AhW6tqfaOS/3Tu141Q7XHpF1yWXR/eDWXfe1JDLntk2s1x7Dtmlek7lhe6rM5e+/9kC1qlk+gnLpZCjIevUpOBzDyMbJWCdOiDk2So5a84rCY6k8ti9w/JOx3XU7tytzI/sbF9/ed7L62x6TNerdDrDztGNuPM7r+1sj9Z0aT37uzqvhfGuHfu139b590dHsFJLDggJMO+9KexTlm3qs28oNqNMecPBGq7yTzv6+34Kwz1zWVLLfopB/ltOeD5k9xsf2ebXVe2DZvre223en7hnfTTAnNqnXXpa+g3N+tUffbS+W76vazu8JWClvtddgsjaf9Nm2S5yd/LR+bMJagm1+b91eaQdOvaDqWM/qnzkzRb7NsvoaN79m5rW5dpJ6y3tfuSzzxawUsx+GDL/7XOqKs8MyhD/dpL6tvgUmU6UHcs6hJm/XzpzHSlgnTogfPkykTxnCpduM8/IUnb6uc14DVeXnln1yM721E7vkbOHbRt2hp2jG3Hnd17bmI7WdGk96SfbSzT57KWn7Hft2K/9ts6/dwSs1HPqZCsnLjnA5KTr3Khf/m3ebPC2y80i6yWW/PeuEdvOibr7KQanJjQ/ss3HIncovt/mbQ9HLB4JMBmZSzvlkSRH9mn39L9H6rv1+7q2w1sDVuo89Y7ZPLA4N4F97oUfkn19nsP3gcvz3taPPrq/79gPppZTo2pHj5n5tzlZ/eCq2g4W5CHO6euff2sDP/D5Zw1YqfO7LzuyN9oVnWeUfMTyROt/s/wt4SJvt8/k0ExAXTfG/PlaR9gHrBy47pmncerp3fd0ohwQshNLmNwu+R0fuVxP/4xNPw3eAAAO6ElEQVRl3kN+Z0aT3mqZ5Lo9COTfXhoKfmRne+7A1fEqnc6wc9R//52PPsl9bbd/WlVfsGvHozVd21b3w+P5/HtV1fufOCvteoL0tqYvWp70f/QM+Nrv2f+9K2Blvd+yqj6oqnK33nbJiPiHL/uSPEMqJyTrNpV5JdnJrq+OWv9d5rC8U1V94a0/aPf5/QTke+eyrKt9reUsPNMpspyaoLvv5/kt+f3nloxavMGyb83cqf3+5ciBaN/frz1nKm2VR2G82fK92335tX3aPU3ySglYOYC/9XLs3LZj+nyuEGUEJ8eV9bVbr11VudksJxi5u39/TM1z+T724JWVU+3StR/MuhP+M0r9rrsvWo+ZeeVbtu88s+w1l0GYBM78tu2odP55jmHJEXlrxnMuzx6w8uNyBpPRqHWncesPzqhXOsInXfiH+4B163esnz/yHq6jbxzPji1zat5317GP1pYEnzO/3Nlz7gD4aMBKLfuh5/y3R1+lM0LAOup87XOnJvR27lj2w+PZoWTeQA582+Up3oHW/f6vvWVnwFp3wu9cVe9RVXlO1q3LelacM/lbnqJ/7nsSkD9+s4PvmFC7f4TEfu7lftu61WD7+aPTNvb9/d7vTBDIiWf6xaVRx1vX/0oJWKvL919Go970Vqjl83lVV7ajPMH+kaVzP5g6csLy9ssNWPuToiN1ru92zUnqoydPR75v/5mXErBSRMJGziQzGrN9a/mlH5GdYXaEuax27UW4Iwas/LaAZ1QuO5Tt5c5rjfdxy7ORcnPApXlbHQErtexv2X30VToC1rUW/v9/z2hn3v22HZnJgS/by/Y9hQLWC7P1ckfugs3Z/H505JR8+nNuSc+DDS9dSjneai8+uW+Toydfl75nH9r2k907AlZG/fLstdxJdiTodASsTKJ/96rKnYNH5qLe0havtIAVm4z4ZJ+RUZ+jx9QMVqTdcyJwpN2vtUF3wFq/L4My77a8P/foidTRY+a13/TI319awFqLTkJNGMqzT95i+d/bpPpZVZUJrLmunA3y2nuh1vWOGrDW+gKfOxzyXrqM5L3eMnK0/j2XJj91GebNb/+8gzuhroB1aj7QI3dYCVi3baanbjjI5eVcElsPRgLWq5pm35HpBPttKoEq+5KcoNz6Uu2jLZdgnMv9ebxJlo7naWU9ORnNiH/ae122k93vCVi5VJKpGJmAn5tt4nLLZeFbA9bq/y+XG2myLz+6Tzvqv/3cKzFgbY+pOYnPNpBLsjkWrpcPc1zJZbW0e15gnf99S7tfa4unCljr92baUAYmcrd7Ljnnast6QpXt+zOXif/p05lr1R3cr/3+/d9fesC6tWCfJ0CAAAECBAiMLiBgjd5C6iNAgAABAgSmExCwpmsyBRMgQIAAAQKjCwhYo7eQ+ggQIECAAIHpBASs6ZpMwQQIECBAgMDoAgLW6C2kPgIECBAgQGA6AQFruiZTMAECBAgQIDC6gIA1egupjwABAgQIEJhOQMCarskUTIAAAQIECIwuIGCN3kLqI0CAAAECBKYTELCmazIFEyBAgAABAqMLCFijt5D6CBAgQIAAgekEBKzpmkzBBAgQIECAwOgCAtboLaQ+AgQIECBAYDoBAWu6JlMwAQIECBAgMLqAgDV6C6mPAAECBAgQmE5AwJquyRRMgAABAgQIjC4gYI3eQuojQIAAAQIEphMQsKZrMgUTIECAAAECowsIWKO3kPoIECBAgACB6QQErOmaTMEECBAgQIDA6AIC1ugtpD4CBAgQIEBgOgEBa7omUzABAgQIECAwuoCANXoLqY8AAQIECBCYTkDAmq7JFEyAAAECBAiMLiBgjd5C6iNAgAABAgSmExCwpmsyBRMgQIAAAQKjCwhYo7eQ+ggQIECAAIHpBASs6ZpMwQQIECBAgMDoAgLW6C2kPgIECBAgQGA6AQFruiZTMAECBAgQIDC6gIA1egupjwABAgQIEJhOQMCarskUTIAAAQIECIwuIGCN3kLqI0CAAAECBKYTELCmazIFEyBAgAABAqMLCFijt5D6CBAgQIAAgekEBKzpmkzBBAgQIECAwOgCAtboLaQ+AgQIECBAYDoBAWu6JlMwAQIECBAgMLqAgDV6C6mPAAECBAgQmE5AwJquyRRMgAABAgQIjC4gYI3eQuojQIAAAQIEphMQsKZrMgUTIECAAAECowsIWKO3kPoIECBAgACB6QQErOmaTMEECBAgQIDA6AIC1ugtpD4CBAgQIEBgOgEBa7omUzABAgQIECAwuoCANXoLqY8AAQIECBCYTkDAmq7JFEyAAAECBAiMLiBgjd5C6iNAgAABAgSmExCwpmsyBRMgQIAAAQKjCwhYo7eQ+ggQIECAAIHpBASs6ZpMwQQIECBAgMDoAgLW6C2kPgIECBAgQGA6AQFruiZTMAECBAgQIDC6gIA1egupjwABAgQIEJhOQMCarskUTIAAAQIECIwuIGCN3kLqI0CAAAECBKYTELCmazIFEyBAgAABAqMLCFijt5D6CBAgQIAAgekEBKzpmkzBBAgQIECAwOgCAtboLaQ+AgQIECBAYDoBAWu6JlMwAQIECBAgMLqAgDV6C6mPAAECBAgQmE5AwJquyRRMgAABAgQIjC4gYI3eQuojQIAAAQIEphMQsKZrMgUTIECAAAECowsIWKO3kPoIECBAgACB6QQErOmaTMEECBAgQIDA6AIC1ugtpD4CBAgQIEBgOgEBa7omUzABAgQIECAwuoCANXoLqY8AAQIECBCYTkDAmq7JFEyAAAECBAiMLiBgjd5C6iNAgAABAgSmExCwpmsyBRMgQIAAAQKjCwhYo7eQ+ggQIECAAIHpBASs6ZpMwQQIECBAgMDoAgLW6C2kPgIECBAgQGA6AQFruiZTMAECBAgQIDC6gIA1egupjwABAgQIEJhOQMCarskUTIAAAQIECIwuIGCN3kLqI0CAAAECBKYTELCmazIFEyBAgAABAqMLCFijt5D6CBAgQIAAgekEBKzpmkzBBAgQIECAwOgCAtboLaQ+AgQIECBAYDoBAWu6JlMwAQIECBAgMLqAgDV6C6mPAAECBAgQmE5AwJquyRRMgAABAgQIjC4gYI3eQuojQIAAAQIEphMQsKZrMgUTIECAAAECowsIWKO3kPoIECBAgACB6QQErOmaTMEECBAgQIDA6AIC1ugtpD4CBAgQIEBgOgEBa7omUzABAgQIECAwuoCANXoLqY8AAQIECBCYTkDAmq7JFEyAAAECBAiMLiBgjd5C6iNAgAABAgSmExCwpmsyBRMgQIAAAQKjCwhYo7eQ+ggQIECAAIHpBASs6ZpMwQQIECBAgMDoAgLW6C2kPgIECBAgQGA6AQFruiZTMAECBAgQIDC6gIA1egupjwABAgQIEJhOQMCarskUTIAAAQIECIwuIGCN3kLqI0CAAAECBKYTELCmazIFEyBAgAABAqMLCFijt5D6CBAgQIAAgekEBKzpmkzBBAgQIECAwOgCAtboLaQ+AgQIECBAYDoBAWu6JlMwAQIECBAgMLqAgDV6C6mPAAECBAgQmE5AwJquyRRMgAABAgQIjC4gYI3eQuojQIAAAQIEphMQsKZrMgUTIECAAAECowsIWKO3kPoIECBAgACB6QQErOmaTMEECBAgQIDA6AIC1ugtpD4CBAgQIEBgOgEBa7omUzABAgQIECAwuoCANXoLqY8AAQIECBCYTkDAmq7JFEyAAAECBAiMLiBgjd5C6iNAgAABAgSmExCwpmsyBRMgQIAAAQKjCwhYo7eQ+ggQIECAAIHpBASs6ZpMwQQIECBAgMDoAgLW6C2kPgIECBAgQGA6AQFruiZTMAECBAgQIDC6gIA1egupjwABAgQIEJhOQMCarskUTIAAAQIECIwuIGCN3kLqI0CAAAECBKYTELCmazIFEyBAgAABAqMLCFijt5D6CBAgQIAAgekEBKzpmkzBBAgQIECAwOgCAtboLaQ+AgQIECBAYDoBAWu6JlMwAQIECBAgMLqAgDV6C6mPAAECBAgQmE5AwJquyRRMgAABAgQIjC4gYI3eQuojQIAAAQIEphMQsKZrMgUTIECAAAECowsIWKO3kPoIECBAgACB6QQErOmaTMEECBAgQIDA6AIC1ugtpD4CBAgQIEBgOgEBa7omUzABAgQIECAwuoCANXoLqY8AAQIECBCYTkDAmq7JFEyAAAECBAiMLiBgjd5C6iNAgAABAgSmExCwpmsyBRMgQIAAAQKjCwhYo7eQ+ggQIECAAIHpBASs6ZpMwQQIECBAgMDoAgLW6C2kPgIECBAgQGA6AQFruiZTMAECBAgQIDC6gIA1egupjwABAgQIEJhOQMCarskUTIAAAQIECIwuIGCN3kLqI0CAAAECBKYTELCmazIFEyBAgAABAqMLCFijt5D6CBAgQIAAgekEBKzpmkzBBAgQIECAwOgCAtboLaQ+AgQIECBAYDoBAWu6JlMwAQIECBAgMLqAgDV6C6mPAAECBAgQmE5AwJquyRRMgAABAgQIjC4gYI3eQuojQIAAAQIEphMQsKZrMgUTIECAAAECowsIWKO3kPoIECBAgACB6QQErOmaTMEECBAgQIDA6AIC1ugtpD4CBAgQIEBgOgEBa7omUzABAgQIECAwuoCANXoLqY8AAQIECBCYTkDAmq7JFEyAAAECBAiMLiBgjd5C6iNAgAABAgSmExCwpmsyBRMgQIAAAQKjCwhYo7eQ+ggQIECAAIHpBASs6ZpMwQQIECBAgMDoAgLW6C2kPgIECBAgQGA6AQFruiZTMAECBAgQIDC6gIA1egupjwABAgQIEJhOQMCarskUTIAAAQIECIwuIGCN3kLqI0CAAAECBKYTELCmazIFEyBAgAABAqMLCFijt5D6CBAgQIAAgekEBKzpmkzBBAgQIECAwOgCAtboLaQ+AgQIECBAYDoBAWu6JlMwAQIECBAgMLqAgDV6C6mPAAECBAgQmE5AwJquyRRMgAABAgQIjC4gYI3eQuojQIAAAQIEphMQsKZrMgUTIECAAAECowsIWKO3kPoIECBAgACB6QQErOmaTMEECBAgQIDA6AL/D1YcgZfO3uVcAAAAAElFTkSuQmCC',
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
                  color="black"
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
              <Div
                row
                flexWrap="wrap"
                justifyContent="space-evenly"
                bg={black}
                p="lg"
                w={'30%'}
                rounded="xl"
              >
                <Button
                  mt="xs"
                  p="xs"
                  bg="transparent"
                  borderBottomColor="green500"
                  color="white"
                  fontWeight="10"
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
