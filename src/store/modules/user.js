import Vue from 'vue'
import {login, getInfo, getAbpBase} from "@/api/login"
import {ACCESS_TOKEN, EncrptedAuthToken} from "@/store/mutation-types"
import {welcome} from "@/utils/util"
import _ from "lodash"

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: {},
    session: {},
    info: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, {name, welcome}) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = '/avator/' + avatar
    },
    SET_Session: (state, session) => {
      state.session = session
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
  },

  actions: {
    // 登录
    Login({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        login({
          userNameOrEmailAddress: userInfo.username,
          password: userInfo.password,
          rememberMe: userInfo.remember_me
        }).then(response => {
          const result = response.result
          let tokenExpireDate = userInfo.remember_me ? result.expireInSeconds * 1000 : null
          Vue.ls.set(ACCESS_TOKEN, result.accessToken, tokenExpireDate)
          Vue.ls.set(EncrptedAuthToken, result.encryptedAccessToken, tokenExpireDate)
          commit('SET_TOKEN', result.accessToken)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({commit}) {
      return new Promise((resolve, reject) => {
        getAbpBase().then(response => {
          const result = response.result
          commit('SET_Session', result.session)

          const role = result.auth
          if (role && role.grantedPermissions && role.allPermissions) {
            role.permissionList = ['dashboard', 'form', 'table']
            _.mapKeys(role.grantedPermissions, function (value, key) {
              if (value === 'true') {
                role.permissionList.push(key + '')
              }
            })
            commit('SET_ROLES', role)

          } else {
            reject('getInfo: roles must be a non-null array !')
          }

          getInfo().then(res => {
            let result = res.result
            commit('SET_INFO', result.user)
            commit('SET_NAME', {name: result.user.name, welcome: welcome()})
            commit('SET_AVATAR', result.user.avator)
            resolve(role)
          }).catch(error => {
            reject(error)
          })

        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout({commit, state}) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', {})
        Vue.ls.clear()
        resolve()
      })
    },

  }
}

export default user