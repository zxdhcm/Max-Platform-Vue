import {axios} from '@/utils/request'

export function getAllUser(parameter) {
  return axios({
    url: '/api/services/app/user/GetAll',
    method: 'get',
    params: parameter
  })
}

export function createUser(data) {
  return axios({
    url: '/api/services/app/user/Create',
    method: 'post',
    data: data
  })
}

export function updateUser(data) {
  return axios({
    url: '/api/services/app/user/Update',
    method: 'put',
    data: data
  })
}

export function deleteUser(id) {
  return axios({
    url: '/api/services/app/user/Delete?Id=' + id,
    method: 'delete'
  })
}

export function getUser(id) {
  return axios({
    url: '/api/services/app/user/Get?Id=' + id,
    method: 'get'
  })
}

export function getRoles() {
  return axios({
    url: '/api/services/app/user/GetRoles',
    method: 'get'
  })
}

