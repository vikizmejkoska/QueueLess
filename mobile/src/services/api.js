import axios from 'axios';

// За Android emulator најчесто се користи 10.0.2.2
// За физички телефон стави ја IP адресата од твојот компјутер, пример 192.168.1.5
const API_BASE_URL = 'http://192.168.1.35:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api; 