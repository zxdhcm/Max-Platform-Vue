import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import {VueAxios} from './axios'
import notification from 'ant-design-vue/es/notification'
import {ACCESS_TOKEN} from "@/store/mutation-types"

// 创建 axios 实例
const service = axios.create({
  baseURL: '', // api base_url
  timeout: 20000 // 请求超时时间
})

const err = (error) => {
  if (error) {
    let message = '未知错误'
    let description = ''
    let handleClose = () => {
    }
    const token = Vue.ls.get(ACCESS_TOKEN)
    let falg = !!error.response && !!error.response.data.error
    if (error.response.status === 403) {
      message = '拒绝访问'
      description = falg && !!error.response.data.error.message ? error.response.data.error.message : '无权限，拒绝访问'
    } else if (error.response.status === 401) {
      message = '未授权'
      description = falg && !!error.response.data.error.message ? error.response.data.error.message : '授权验证失败'
      if (token) {
        handleClose = () => {
          store.dispatch('Logout').then(() => {
            window.location.reload()
          })
        }
      }
    } else if (falg) {
      if (error.response.data.error.message) {
        message = error.response.data.error.message
      }
      if (error.response.data.error.details) {
        description = error.response.data.error.details
      }
    }
    notification.error({message: message, description: description, onClose: handleClose})
  }
  return Promise.reject(error)
};

// request 拦截器
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  config.headers['Abp.TenantId'] = '1'
  return config
}, err)

// response 拦截器
service.interceptors.response.use((response) => {
  return response.data
}, err)

const installer = {
  vm: {},
  install(Vue, router = {}) {
    Vue.use(VueAxios, router, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}