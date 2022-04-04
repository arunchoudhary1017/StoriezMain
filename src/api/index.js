import axios from 'axios';

// import { PrintLog } from '../Components/PrintLog';

const axiosInstance = axios.create();

const getApiRequest = async (url, successCallback, errorCallback) => {
  axiosInstance
    .get(url)
    .then(response => {
      successCallback(response);
    })
    .catch(error => {
      errorCallback(error.message);
    });
};

const postApiRequest = async (url, params, successCallback, errorCallback) => {
  axiosInstance
    .post(url, params)
    .then(response => {
      successCallback(response);
    })
    .catch(error => {
      errorCallback(error);
    });
};

export {getApiRequest, postApiRequest};
