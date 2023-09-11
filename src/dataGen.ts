import { setDataGenerator } from './monitor'
import { byteLength, getEnv } from './utils'
import type { RequestConfig, RequestResult } from './types'

const env = getEnv()

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
    const key = env === 'ali' ? args[0].key : args[0]
    const data = env === 'ali' ? args[0].data : args[1]
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
    const data = env === 'ali' ? args[0].data : args[0]
    return {
      resultSize: byteLength(JSON.stringify(data))
    }
  }, 'post')
}




