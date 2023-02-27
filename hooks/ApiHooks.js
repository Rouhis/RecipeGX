import {useEffect, useState} from 'react';
import {baseUrl} from '../utils/Variables';
import { appId } from '../utils/Variables';
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


const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    try {
      const response = await fetch(baseUrl + 'tags/' + appId );
      const json = await response.json();
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

  useEffect(() => {
    loadMedia();
  }, []);

  return {mediaArray};
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
    throw new Error('postMedia: ' + error.message);
  }
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      return await doFetch(baseUrl + 'tags/' + appId);
    } catch (error) {
      console.error('getFilesByTag, useTag', error);
    }
  };
  return {getFilesByTag};
};

export {useMedia, useTag, postMedia};
