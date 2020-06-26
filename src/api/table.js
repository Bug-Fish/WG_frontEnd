import request from '@/utils/request'

export default {
  getCity(current,limit,genQuery){
    return request({
      url: '/epi/pageGenCondition/'+current+'/'+limit,
      method: 'post',
      data: genQuery
    })
  }
}
