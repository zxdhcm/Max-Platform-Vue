import api from './index'
import {axios} from '@/utils/request'

/**
 * login func
 * parameter: {
 *     userNameOrEmailAddress: '',
 *     password: '',
 *     rememberMe: true
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  return axios({
    url: '/api/TokenAuth/Authenticate',
    method: 'post',
    data: parameter
  })
}

export function getSmsCaptcha(parameter) {
  return axios({
    url: '/api/services/app/Account/GetVerificationCode',
    method: 'get',
    params: parameter
  })
}

export function getInfo() {
  return axios({
    url: '/api/services/app/Session/GetCurrentLoginInformations',
    method: 'get'
  })
}

export function getAbpBase() {
  return axios({
    url: '/AbpUserConfiguration/GetAll',
    method: 'get'
  })
}

export function register(data) {
  return axios({
    url: '/api/services/app/Account/Register',
    method: 'post',
    data: data
  })
}