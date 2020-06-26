import request from '@/utils/request'

export default {
  getSen(){
    return request({
      url: '/epi/sense',
      method: 'get'
    })
  }
}
