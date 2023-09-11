import type { ComponentIns, PageInfo, ContextInfo, RecordData, GroupData, IAnyObject } from '../types'

const env = getEnv()
/**
 * 传入字符串获取字节长度
 */
export function byteLength (str: string) {
  let s = str.length
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

function getPageInfo (context: ComponentIns): PageInfo | undefined {
  const currentPages = getCurrentPages()
  if (env === 'ali') {
    const currentPage = context.$page || context as unknown as WechatMiniprogram.Page.Instance<IAnyObject, IAnyObject>
    return {
      index: currentPages.indexOf(currentPage),
      route: currentPage.route
    }
  } else {
    for (let i = 0; i < currentPages.length; i++) {
      if (context.getPageId() === currentPages[i].getPageId()) {
        return {
          index: i,
          route: currentPages[i].route
        }
      }
    }
  }
}

export function getContextInfo (context: ComponentIns): ContextInfo {
  return {
    is: context.is,
    pageInfo: getPageInfo(context)
  }
}

export function getEnvObj () {
  if (typeof wx !== 'undefined' && typeof wx.canIUse === 'function') return wx
  if (typeof my !== 'undefined' && typeof my.canIUse === 'function') return my
}

export function getEnv () {
  if (typeof wx !== 'undefined' && typeof wx.canIUse === 'function') return 'wx'
  if (typeof my !== 'undefined' && typeof my.canIUse === 'function') return 'ali'
}

export function filterTrue () {
  return true
}

export function groupByType (recordData: RecordData) {
  return recordData.type
}

export function sortByCount (groupData: GroupData) {
  return groupData.count
}



