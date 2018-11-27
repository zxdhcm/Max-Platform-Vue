import {axios} from '@/utils/request'

export function getAllRole(parameter) {
  return axios({
    url: '/api/services/app/Role/GetAll',
    method: 'get',
    params: parameter
  })
}

export function createRole(data) {
  return axios({
    url: '/api/services/app/Role/Create',
    method: 'post',
    data: data
  })
}

export function updateRole(data) {
  return axios({
    url: '/api/services/app/Role/Update',
    method: 'put',
    data: data
  })
}

export function deleteRole(id) {
  return axios({
    url: '/api/services/app/Role/Delete?Id=' + id,
    method: 'delete'
  })
}

export function getRole(data) {
  return axios({
    url: '/api/services/app/Role/Get?Id=' + id,
    method: 'get'
  })
}

export function getAllPermissions() {
  return axios({
    url: '/api/services/app/Role/getAllPermissions',
    method: 'get'
  })
}

