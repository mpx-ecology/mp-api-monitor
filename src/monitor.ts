import type { APIMonitor } from './index'
import type { DataGen, RecordMeta, Stage, RecordData } from './types'

const monitors: Set<APIMonitor> = new Set()
const preDataGenerator = new Map<string, DataGen[]>()
const postDataGenerator = new Map<string, DataGen[]>()

export function getMonitors() {
  return monitors
}

export function addMonitor(monitor: APIMonitor) {
  monitors.add(monitor)
}

export function removeMonitor(monitor: APIMonitor) {
  monitors.delete(monitor)
}

export function addRecordData(recordData: RecordData) {
  monitors.forEach((monitor) => {
    if (monitor.isActive) {
      monitor.addRecordData(recordData)
    }
  })
}

export function updateMeta(type: string, updater: (meta: RecordMeta) => void) {
  monitors.forEach((monitor) => {
    if (monitor.isActive) {
      monitor.updateMeta(type, updater)
    }
  })
}

export function checkWarningRules(type: string, stage: Stage = 'pre') {
  monitors.forEach((monitor) => {
    if (monitor.isActive) {
      monitor.checkWarningRules(type, stage)
    }
  })
}
/**
 * 自定义recordData生成逻辑，可以为一个type设置多个dataGen，返回的数据会合并到recordData中
 * @example
 * ```ts
 * setDataGenerator('setData', (args, recordData) => {
 *   // args为原始入参数组，对于setData来说args[0]为发送的数据，args[1]为setData回调
 *   const data = args[0]
 *   // recordData为当前recordData
 *   if (recordData.size && recordData.size > 10000) {
 *     // 返回的数据会合并到recordData当中，当发送数据size大于10K时，在recordData中存储原始数据便于排查
 *     return {
 *       data
 *     }
 *   }
 * })
 * ```
 */
export function setDataGenerator(type: string, dataGen: DataGen, stage: Stage = 'pre') {
  const dataGeneratorMap = stage === 'pre' ? preDataGenerator : postDataGenerator
  const dataGens = dataGeneratorMap.get(type) || []
  if (!dataGeneratorMap.has(type)) dataGeneratorMap.set(type, dataGens)
  dataGens.push(dataGen)
}

export function getDataGenerators(type: string, stage: Stage = 'pre') {
  const dataGeneratorMap = stage === 'pre' ? preDataGenerator : postDataGenerator
  return dataGeneratorMap.get(type)
}
