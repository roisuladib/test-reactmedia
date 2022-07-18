import axios from 'axios';

const { REACT_APP_URL, TIMEOUT } = process.env;
const instance = axios.create({
   baseURL: REACT_APP_URL,
   timeout: TIMEOUT
});

export default instance;
