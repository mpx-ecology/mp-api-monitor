import { setDataGenerator } from './monitor'
import { byteLength } from './utils'

export function initDataGen () {
  setDataGenerator('request', (args) => {
    const config: RequestConfig = args[0]
    return {
      url: config.url,
      size: byteLength(config.url + JSON.stringify(config.data) + JSON.stringify(config.header || config.headers))
    }
  }, 'pre')

  setDataGenerator('request', (args) => {
    const res: RequestResult = args[0]
    return {
      resultSize: byteLength(JSON.stringify(res.data) + JSON.stringify(res.header || res.headers))
    }
  }, 'post')

  setDataGenerator('setStorage', (args) => {
    const opt = args[0]
    return {
      size: byteLength(opt.key) + byteLength(JSON.stringify(opt.data))
    }
  }, 'pre')

  setDataGenerator('setStorageSync', (args) => {
    const key = args[0]
    const data = args[1]
    return {
      size: byteLength(key) + byteLength(JSON.stringify(data))
    }
  }, 'pre')

  setDataGenerator('getStorage', (args) => {
    const res = args[0]
    return {
      resultSize: byteLength(JSON.stringify(res.data))
    }
  }, 'post')

  setDataGenerator('getStorageSync', (args) => {
    const data = args[0]
    return {
      resultSize: byteLength(JSON.stringify(data))
    }
  }, 'post')
}




