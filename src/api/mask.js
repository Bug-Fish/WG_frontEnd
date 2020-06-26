import request from '@/utils/request'

export default {
  getMask(searchObj){
    return request({
      url: `/epi/keymaskDraw/${searchObj.provinceName}/${searchObj.month}`,
      method: 'get'
    })
  }
}
