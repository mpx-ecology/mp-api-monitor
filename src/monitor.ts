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
