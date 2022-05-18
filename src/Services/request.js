import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const request = async (request, authentication = false) => {
  if (authentication) {
    try {
      const userToken = await AsyncStorage.getItem('SHOES_SHOP_TOKEN');
      if (userToken) {
        request.headers = {
          ...request.headers,
          Authorization: 'Bearer ' + userToken,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  return axios(request);
};

export default request;
