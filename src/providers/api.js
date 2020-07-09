import axios from 'axios';
import { getToken } from './auth';

const apiRoute = 'http://localhost:8000';
const config = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'Authorization': getToken()
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${apiRoute}/login`, {
      username,
      password,
      saveLogin: true,
    }, config);

    return response.data;

  } catch ({ response }) {
    throw new Error(response.data.message);
  }
};


export const getDevices = async () => {
  try {
    const response = await axios.get(`${apiRoute}/device`, config);

    return response.data;

  } catch ({ response }) {
    throw new Error(response.data.message);
  }
};

export const getDeviceHistory = async (deviceId) => {
  try {
    const response = await axios.get(`${apiRoute}/location/history/${deviceId}`, config);

    return response.data;

  } catch ({ response }) {
    throw new Error(response.data.message);
  }
};

// I was late for deliver, please don't judge me for this monstruosity
export const getAllDevicesHistory = async () => {
  try {
    const { data: devices } = await getDevices();
    const allDevicesHistory = await Promise.all(devices.map(async (device) => {

      const { data: response } = await getDeviceHistory(device.id);
      return response;
    }));
    console.log(allDevicesHistory);
    return allDevicesHistory;

  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};