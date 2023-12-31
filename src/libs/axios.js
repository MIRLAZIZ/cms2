import Vue from 'vue'
import axios from 'axios'
import configs from '../../axios.config'

// axios

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: configs.baseURL,
  timeout: 20000,
  // headers: {'X-Custom-Header': 'foobar'}
})
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

Vue.prototype.$http = axiosIns

export default axiosIns
