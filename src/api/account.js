import {axios} from '@/utils/request'

export function getAllBookmarkClass() {
  return axios({
    url: '/api/services/app/BookmarkClass/GetAll',
    method: 'get',
    params: {SkipCount: 0, MaxResultCount: 1000}
  })
}

export function getAllBookmarkChannel(id) {
  return axios({
    url: '/api/services/app/BookmarkChannel/GetAll',
    method: 'get',
    params: {SkipCount: 0, MaxResultCount: 1000, ClassId: id}
  })
}

export function getAllBookmark(id, keyword) {
  if (!keyword) {
    keyword = ''
  }
  return axios({
    url: '/api/services/app/Bookmark/GetAll',
    method: 'get',
    params: {SkipCount: 0, MaxResultCount: 1000, ChannelId: id, KeyWord: keyword}
  })
}

export function createBookmarkClass(data) {
  return axios({
    url: '/api/services/app/BookmarkClass/Create',
    method: 'post',
    data: data
  })
}

export function updateBookmarkClass(data) {
  return axios({
    url: '/api/services/app/BookmarkClass/Update',
    method: 'put',
    data: data
  })
}

export function deleteBookmarkClass(id) {
  return axios({
    url: '/api/services/app/BookmarkClass/Delete?Id=' + id,
    method: 'delete'
  })
}

export function createBookmarkChannel(data) {
  return axios({
    url: '/api/services/app/BookmarkChannel/Create',
    method: 'post',
    data: data
  })
}

export function updateBookmarkChannel(data) {
  return axios({
    url: '/api/services/app/BookmarkChannel/Update',
    method: 'put',
    data: data
  })
}

export function deleteBookmarkChannel(id) {
  return axios({
    url: '/api/services/app/BookmarkChannel/Delete?Id=' + id,
    method: 'delete'
  })
}

export function createBookmark(data) {
  return axios({
    url: '/api/services/app/Bookmark/Create',
    method: 'post',
    data: data
  })
}

export function updateBookmark(data) {
  return axios({
    url: '/api/services/app/Bookmark/Update',
    method: 'put',
    data: data
  })
}

export function deleteBookmark(id) {
  return axios({
    url: '/api/services/app/Bookmark/Delete?Id=' + id,
    method: 'delete'
  })
}

export function getBookmarkWebSiteInfo(data) {
  return axios({
    url: '/api/services/app/Bookmark/PostWebSiteInfo',
    method: 'post',
    data: data
  })
}

export function getBaiDuSuggestion(keyword) {
  return axioss.get('https://github.com/sendya/ant-design-pro-vue')
  /*return axios({
    url: 'http://suggestion.baidu.com/su',
    method: 'get',
    params: {cb:'setDataSource',wd:keyword}
  })*/
}

export function changePassWord(data) {
  return axios({
    url: '/api/services/app/User/PostChangePassWord',
    method: 'post',
    data: data
  })
}

export function changePhoneNumber(data) {
  return axios({
    url: '/api/services/app/User/PostChangePhoneNumber',
    method: 'post',
    data: data
  })
}

export function getPhoneNumber() {
  return axios({
    url: '/api/services/app/User/GetPhoneNumber',
    method: 'get'
  })
}