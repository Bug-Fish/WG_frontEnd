import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/wg/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/wg/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}



// export default {
//   submitLoginUser(userInfo){
//     return request({
//       url: '/epi/login',
//       method: 'post',
//       data: userInfo
//     })
//   },
//
//   getLoginUserInfo(){
//     return request({
//       url: '/epi/getMemberInfo',
//       method: 'get'
//     })
//   }

//}
