import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {baseUrl, appId} from '../utils/Variables';

const doFetch = async (url, options) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    const message = json.error
      ? `${json.message}: ${json.error}`
      : json.message;
    throw new Error(message || response.statusText);
  }
  return json;
};

const useMedia = (myFilesOnly) => {
  const [mediaArray, setMediaArray] = useState([]);
  const {user} = useContext(MainContext);

  const loadMedia = async () => {
    try {
      const response = await fetch(baseUrl + 'tags/' + appId);
      let json = await response.json();
      if (myFilesOnly) {
        // json = json.filter((file) => file.user_id === user.user_id);
      }
      const media = await Promise.all(
        json.map(async (file) => {
          const fileResponse = await fetch(baseUrl + 'media/' + file.file_id);
          return await fileResponse.json();
        })
      );

      setMediaArray(media);
    } catch (error) {
      console.error('List, loadMedia', error);
    }
  };

  const postMedia = async (fileData, token) => {
    const options = {
      method: 'post',
      headers: {
        'x-access-token': token,
        'Content-Type': 'multipart/form-data',
      },
      body: fileData,
    };
    try {
      return await doFetch(baseUrl + 'media', options);
    } catch (error) {
      throw new Error('postUpload: ' + error.message);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return {mediaArray, postMedia};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    // call https://media.mw.metropolia.fi/wbma/docs/#api-User-CheckUserName
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    try {
      return await doFetch(baseUrl + 'users/user', options);
    } catch (error) {
      throw new Error('checkUser: ' + error.message);
    }
  };
  return {getUserByToken};
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      return await doFetch(baseUrl + 'tags/' + appId);
    } catch (error) {
      console.error('getFilesByTag, useTag', error);
    }
  };

  const postTag = async (data, token) => {
    const options = {
      method: 'post',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      return await doFetch(baseUrl + 'tags', options);
    } catch (error) {
      throw new Error('postTag: ' + error.message);
    }
  };

  return {getFilesByTag, postTag};
};

export {useMedia, useUser, useTag};
