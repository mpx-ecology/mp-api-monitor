const monitors = /* @__PURE__ */ new Set();
const preDataGenerator = /* @__PURE__ */ new Map();
const postDataGenerator = /* @__PURE__ */ new Map();
function addMonitor(monitor) {
  monitors.add(monitor);
}
function removeMonitor(monitor) {
  monitors.delete(monitor);
}
function addRecordData(recordData) {
  monitors.forEach((monitor) => {
    if (monitor.isActive) {
      monitor.addRecordData(recordData);
    }
  });
}
function updateMeta(type, updater) {
  monitors.forEach((monitor) => {
    if (monitor.isActive) {
      monitor.updateMeta(type, updater);
    }
  });
}
function checkWarningRules(type, stage = "pre") {
  monitors.forEach((monitor) => {
    if (monitor.isActive) {
      monitor.checkWarningRules(type, stage);
    }
  });
}
function setDataGenerator(type, dataGen, stage = "pre") {
  const dataGeneratorMap = stage === "pre" ? preDataGenerator : postDataGenerator;
  const dataGens = dataGeneratorMap.get(type) || [];
  if (!dataGeneratorMap.has(type))
    dataGeneratorMap.set(type, dataGens);
  dataGens.push(dataGen);
}
function getDataGenerators(type, stage = "pre") {
  const dataGeneratorMap = stage === "pre" ? preDataGenerator : postDataGenerator;
  return dataGeneratorMap.get(type);
}

const env$3 = getEnv();
function byteLength(str) {
  let s = str.length;
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);
    if (code > 127 && code <= 2047)
      s++;
    else if (code > 2047 && code <= 65535)
      s += 2;
    if (code >= 56320 && code <= 57343)
      i--;
  }
  return s;
}
function getPageInfo(context) {
  const currentPages = getCurrentPages();
  if (env$3 === "ali") {
    const currentPage = context.$page || context;
    return {
      index: currentPages.indexOf(currentPage),
      route: currentPage.route
    };
  } else {
    for (let i = 0; i < currentPages.length; i++) {
      if (context.getPageId() === currentPages[i].getPageId()) {
        return {
          index: i,
          route: currentPages[i].route
        };
      }
    }
  }
}
function getContextInfo(context) {
  return {
    is: context.is,
    pageInfo: getPageInfo(context)
  };
}
function getEnvObj() {
  if (typeof wx !== "undefined" && typeof wx.canIUse === "function")
    return wx;
  if (typeof my !== "undefined" && typeof my.canIUse === "function")
    return my;
}
function getEnv() {
  if (typeof wx !== "undefined" && typeof wx.canIUse === "function")
    return "wx";
  if (typeof my !== "undefined" && typeof my.canIUse === "function")
    return "ali";
}
function filterTrue() {
  return true;
}
function groupByType(recordData) {
  return recordData.type;
}
function sortByCount(groupData) {
  return groupData.count;
}

let proxyed$1 = false;
const env$2 = getEnv();
const type = "setData";
function doProxy(context) {
  const setDataRaw = context.setData;
  context._lastTime = 0;
  context._lastCallback = null;
  context._setting = 0;
  context.setData = function(...args) {
    const data = args[0];
    let recordData = {
      type,
      startTime: +/* @__PURE__ */ new Date(),
      size: data ? byteLength(JSON.stringify(data)) : 0,
      contextInfo: getContextInfo(context)
    };
    const preDataGens = getDataGenerators(type);
    if (preDataGens) {
      for (const preDataGen of preDataGens) {
        Object.assign(recordData, preDataGen(args, recordData));
      }
    }
    addRecordData(recordData);
    updateMeta(type, (meta) => {
      meta.parallelism++;
    });
    checkWarningRules(type);
    const callbackRaw = args[1];
    args[1] = function(...args2) {
      recordData.endTime = +/* @__PURE__ */ new Date();
      recordData.duration = recordData.endTime - recordData.startTime;
      const postDataGens = getDataGenerators(type, "post");
      if (postDataGens) {
        for (const postDataGen of postDataGens) {
          Object.assign(recordData, postDataGen(args2, recordData));
        }
      }
      updateMeta(type, (meta) => {
        meta.parallelism--;
      });
      checkWarningRules(type, "post");
      recordData = null;
      return callbackRaw && callbackRaw.apply(this, args2);
    };
    setDataRaw.apply(this, args);
  };
}
function proxySetData() {
  if (proxyed$1)
    return;
  proxyed$1 = true;
  const PageRaw = Page;
  const proxyPage = function(...args) {
    const options = args[0];
    const onLoadRaw = options.onLoad;
    options.onLoad = function(...args2) {
      doProxy(this);
      onLoadRaw && onLoadRaw.apply(this, args2);
    };
    return PageRaw.apply(null, args);
  };
  Page = proxyPage;
  const ComponentRaw = Component;
  const proxyComponent = function(...args) {
    const options = args[0];
    if (env$2 === "wx") {
      const behavior = Behavior({
        created() {
          doProxy(this);
        }
      });
      const rawBehaviors = options.behaviors;
      options.behaviors = rawBehaviors ? [behavior].concat(rawBehaviors) : [behavior];
    } else if (env$2 === "ali") {
      const mixinObj = {
        onInit() {
          doProxy(this);
        }
      };
      const mixin = Mixin ? Mixin(mixinObj) : mixinObj;
      const rawMixins = options.mixins;
      options.mixins = rawMixins ? [mixin].concat(rawMixins) : [mixin];
    }
    return ComponentRaw.apply(null, args);
  };
  Component = proxyComponent;
}

const envObj = getEnvObj();
const env$1 = getEnv();
const syncList = [
  "clearStorage",
  "hideToast",
  "hideLoading",
  "drawCanvas",
  "canIUse",
  "stopRecord",
  "pauseVoice",
  "stopVoice",
  "pauseBackgroundAudio",
  "stopBackgroundAudio",
  "showNavigationBarLoading",
  "hideNavigationBarLoading",
  "createAnimation",
  "createAnimationVideo",
  "createSelectorQuery",
  "createIntersectionObserver",
  "hideKeyboard",
  "stopPullDownRefresh",
  "createWorker",
  "pageScrollTo",
  "reportAnalytics",
  "getMenuButtonBoundingClientRect",
  "reportMonitor",
  "createOffscreenCanvas",
  "reportEvent",
  "nextTick"
];
const syncListMap = syncList.reduce((acc, cur) => {
  acc[cur] = true;
  return acc;
}, {});
function isSync(key) {
  return syncListMap[key] || /^get\w*Manager$/.test(key) || // 获取manager的api
  /^create\w*Context$/.test(key) || // 创建上下文相关api
  /^(on|off)/.test(key) || // 以 on* 或 off开头的方法
  /\w+Sync$/.test(key) || // 以Sync结尾的方法
  customSyncList && customSyncList.includes(key);
}
function __call_trace(depth) {
  const result = [];
  try {
    throw new Error();
  } catch (e) {
    if (e.stack) {
      const stacks = e.stack.split("\n");
      let start = -1;
      for (let i = 0; i < stacks.length; i++) {
        const info = stacks[i].trim();
        if (start === -1) {
          if (info.includes("__call_trace"))
            start = i;
          continue;
        } else {
          if (depth && i - start > depth)
            break;
          if (info)
            result.push(info);
        }
      }
    }
  }
  return result;
}
let proxyed = false;
let stackConfig = null;
function setStackConfig(config) {
  if (config) {
    console.warn("Recording stack info will increase performance overhead, do not enable it unless necessary!");
    stackConfig = config === true ? {} : config;
  } else {
    stackConfig = null;
  }
}
let customSyncList = null;
function setCustomSyncList(list) {
  customSyncList = list;
}
function proxyAPI() {
  if (!envObj || proxyed)
    return;
  Object.keys(envObj).forEach((type) => {
    const original = envObj[type];
    if (typeof original !== "function")
      return;
    const sync = isSync(type);
    const value = function(...args) {
      let stackInfo = [];
      if (stackConfig) {
        if (stackConfig.include && !stackConfig.include.includes(type) || stackConfig.exclude && stackConfig.exclude.includes(type)) ; else {
          stackInfo = __call_trace(stackConfig.depth);
        }
      }
      let recordData = {
        type,
        startTime: +/* @__PURE__ */ new Date()
      };
      if (stackInfo.length)
        recordData.stack = stackInfo;
      const preDataGens = getDataGenerators(type);
      if (preDataGens) {
        for (const preDataGen of preDataGens) {
          Object.assign(recordData, preDataGen(args, recordData));
        }
      }
      addRecordData(recordData);
      if (sync) {
        checkWarningRules(type);
        const result = original.apply(this, args);
        recordData.endTime = +/* @__PURE__ */ new Date();
        recordData.duration = recordData.endTime - recordData.startTime;
        const postDataGens = getDataGenerators(type, "post");
        if (postDataGens) {
          for (const postDataGen of postDataGens) {
            Object.assign(recordData, postDataGen([result], recordData));
          }
        }
        checkWarningRules(type, "post");
        return result;
      } else {
        updateMeta(type, (meta) => {
          meta.parallelism++;
        });
        checkWarningRules(type);
        const opt = args[0] || {};
        const successRaw = opt.success;
        const failRaw = opt.fail;
        opt.success = function(...args2) {
          recordData.endTime = +/* @__PURE__ */ new Date();
          recordData.duration = recordData.endTime - recordData.startTime;
          const postDataGens = getDataGenerators(type, "post");
          if (postDataGens) {
            for (const postDataGen of postDataGens) {
              Object.assign(recordData, postDataGen(args2, recordData));
            }
          }
          updateMeta(type, (meta) => {
            meta.parallelism--;
          });
          checkWarningRules(type, "post");
          recordData = null;
          successRaw && successRaw.apply(this, args2);
        };
        opt.fail = function(...args2) {
          const res = args2[0];
          if (env$1 === "ali") {
            recordData.errno = res.error;
            recordData.errMsg = res.errorMessage;
          } else {
            recordData.errno = res.errno;
            recordData.errMsg = res.errMsg;
          }
          recordData.endTime = +/* @__PURE__ */ new Date();
          recordData.duration = recordData.endTime - recordData.startTime;
          updateMeta(type, (meta) => {
            meta.parallelism--;
          });
          checkWarningRules(type, "post");
          recordData = null;
          failRaw && failRaw.apply(this, args2);
        };
        args[0] = opt;
        return original.apply(this, args);
      }
    };
    Object.defineProperty(envObj, type, {
      value,
      writable: false,
      configurable: true,
      enumerable: true
    });
  });
  proxyed = true;
}

const env = getEnv();
function initDataGen() {
  setDataGenerator("request", (args) => {
    const config = args[0];
    return {
      url: config.url,
      size: byteLength(config.url + JSON.stringify(config.data) + JSON.stringify(config.header || config.headers))
    };
  }, "pre");
  setDataGenerator("request", (args) => {
    const res = args[0];
    return {
      resultSize: byteLength(JSON.stringify(res.data) + JSON.stringify(res.header || res.headers))
    };
  }, "post");
  setDataGenerator("setStorage", (args) => {
    const opt = args[0];
    return {
      size: byteLength(opt.key) + byteLength(JSON.stringify(opt.data))
    };
  }, "pre");
  setDataGenerator("setStorageSync", (args) => {
    const key = env === "ali" ? args[0].key : args[0];
    const data = env === "ali" ? args[0].data : args[1];
    return {
      size: byteLength(key) + byteLength(JSON.stringify(data))
    };
  }, "pre");
  setDataGenerator("getStorage", (args) => {
    const res = args[0];
    return {
      resultSize: byteLength(JSON.stringify(res.data))
    };
  }, "post");
  setDataGenerator("getStorageSync", (args) => {
    const data = env === "ali" ? args[0].data : args[0];
    return {
      resultSize: byteLength(JSON.stringify(data))
    };
  }, "post");
}

function getCountRule(countCfg) {
  return function(recordData) {
    const now = +/* @__PURE__ */ new Date();
    for (let i = recordData.length - 1; i >= 0; i--) {
      const item = recordData[i];
      if (countCfg.duration && now - item.startTime > countCfg.duration)
        break;
      if (recordData.length - i > countCfg.count) {
        const msg = `${item.type} api invoking exceeded count limit ${countCfg.count}${countCfg.duration ? ` in ${countCfg.duration}ms` : ""}, please check!`;
        countCfg.onWarning(msg, recordData);
        break;
      }
    }
  };
}
function getParallelismRule(parallelismCfg) {
  return function(recordData) {
    const item = recordData[recordData.length - 1];
    if (recordData.meta.parallelism > parallelismCfg.parallelism) {
      const msg = `${item.type} api invoking exceeded parallelism limit ${parallelismCfg.parallelism}, please check!`;
      parallelismCfg.onWarning(msg, recordData);
    }
  };
}
const routeTypes = [
  "switchTab",
  "reLaunch",
  "redirectTo",
  "navigateTo",
  "navigateBack"
];
function getRouteParallelismRule(parallelismCfg) {
  return function(recordData, monitor) {
    let parallelism = 0;
    const item = recordData[recordData.length - 1];
    for (const type of routeTypes) {
      const routeRecordData = monitor.getRecordData(type);
      if (routeRecordData)
        parallelism += routeRecordData.meta.parallelism;
      if (parallelism > parallelismCfg.parallelism) {
        const msg = `${item.type} api invoking exceeded route parallelism limit ${parallelismCfg.parallelism}, please check!`;
        parallelismCfg.onWarning(msg, recordData);
        break;
      }
    }
  };
}
function getErrorRule(errorCfg) {
  const rule = function(recordData) {
    const item = recordData[recordData.length - 1];
    if (errorCfg.errno ? errorCfg.errno === item.errno : item.errno !== void 0) {
      const msg = `${item.type} api invoking with errno ${item.errno}, please check!`;
      errorCfg.onWarning(msg, recordData);
    }
  };
  rule.stage = "post";
  return rule;
}
function getSizeRule(sizeCfg) {
  return function(recordData) {
    const now = +/* @__PURE__ */ new Date();
    let size = 0;
    for (let i = recordData.length - 1; i >= 0; i--) {
      const item = recordData[i];
      size += item.size || 0;
      if (sizeCfg.count && recordData.length - i > sizeCfg.count)
        break;
      if (sizeCfg.duration && now - item.startTime > sizeCfg.duration)
        break;
      if (size > sizeCfg.size) {
        const msg = `${item.type} api invoking exceeded size limit ${sizeCfg.size}${sizeCfg.duration ? ` in ${sizeCfg.duration}ms` : ""}, please check!`;
        sizeCfg.onWarning(msg, recordData);
        break;
      }
    }
  };
}
function getResultSizeRule(sizeCfg) {
  const rule = function(recordData) {
    const now = +/* @__PURE__ */ new Date();
    let size = 0;
    for (let i = recordData.length - 1; i >= 0; i--) {
      const item = recordData[i];
      size += item.resultSize || 0;
      if (sizeCfg.count && recordData.length - i > sizeCfg.count)
        break;
      if (sizeCfg.duration && now - item.startTime > sizeCfg.duration)
        break;
      if (size > sizeCfg.size) {
        const msg = `${item.type} api invoking exceeded resultSize limit ${sizeCfg.size}${sizeCfg.duration ? ` in ${sizeCfg.duration}ms` : ""}, please check!`;
        sizeCfg.onWarning(msg, recordData);
        break;
      }
    }
  };
  rule.stage = "post";
  return rule;
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
initDataGen();
class APIMonitor {
  constructor(config) {
    /** @internal */
    __publicField(this, "recordData", /* @__PURE__ */ new Map());
    /** @internal */
    __publicField(this, "preWarningRules", /* @__PURE__ */ new Map());
    /** @internal */
    __publicField(this, "postWarningRules", /* @__PURE__ */ new Map());
    /** @internal */
    __publicField(this, "config");
    /** @internal */
    __publicField(this, "dataCount", 0);
    /** @internal */
    __publicField(this, "isActive", false);
    this.config = Object.assign({
      recordSetData: true,
      recordAPI: true
    }, config);
    addMonitor(this);
    if (this.config.recordSetData) {
      proxySetData();
    }
    if (this.config.recordAPI) {
      proxyAPI();
    }
  }
  /**
   * 开始录制，传递 {clear} 为true会先执行 {@link clearData}
   */
  startRecord(clear) {
    if (clear)
      this.clearData();
    this.isActive = true;
  }
  /**
   * 结束录制
   */
  endRecord() {
    this.isActive = false;
  }
  /** @internal */
  checkWarningRules(type, stage = "pre") {
    const warningRules = this.getWarningRules(type, stage);
    const recordData = this.getRecordData(type);
    if (warningRules && recordData) {
      warningRules.forEach((warningRule) => {
        warningRule(recordData, this);
      });
    }
  }
  /**
   * 添加报警规则，报警规则可以通过 {@link getCountRule} 等帮助函数快速生成，也可以基于recordData完全自定义。
   * @example
   * ```ts
   * // getLocation 和 getSystemInfoSync 100ms 内不应该调用超过2次
   * monitor.addWarningRule([
   *   'getLocation',
   *   'getSystemInfoSync'
   * ], getCountRule({
   *   count: 2,
   *   duration: 100,
   *   onWarning(msg, recordData) {
   *     console.error(msg, recordData)
   *   }
   * }))
   * ```
   */
  addWarningRule(types, rule, stage = "pre") {
    if (typeof types === "string")
      types = [types];
    types.forEach((type) => {
      const warningRulesMap = (rule.stage || stage) === "pre" ? this.preWarningRules : this.postWarningRules;
      const rules = warningRulesMap.get(type) || [];
      if (!warningRulesMap.has(type))
        warningRulesMap.set(type, rules);
      rules.push(rule);
    });
  }
  /** @internal */
  getWarningRules(type, stage = "pre") {
    const warningRulesMap = stage === "pre" ? this.preWarningRules : this.postWarningRules;
    return warningRulesMap.get(type);
  }
  /** @internal */
  filterRecordData(data) {
    const type = data.type;
    if (type === "setData") {
      return !!this.config.recordSetData;
    }
    const recordAPI = this.config.recordAPI;
    if (recordAPI) {
      const config = typeof recordAPI === "boolean" ? {} : recordAPI;
      if (config.include && !config.include.includes(type) || config.exclude && config.exclude.includes(type)) ; else {
        return true;
      }
    }
    return false;
  }
  /** @internal */
  addRecordData(data) {
    if (!this.filterRecordData(data))
      return;
    if (this.config.dataLimit) {
      this.dataCount++;
      if (this.dataCount > this.config.dataLimit)
        this.clearData();
    }
    const dataQueue = this.recordData.get(data.type) || [];
    if (!this.recordData.has(data.type)) {
      this.recordData.set(data.type, dataQueue);
      dataQueue.meta = {
        parallelism: 0
      };
    }
    dataQueue.push(data);
  }
  /** @internal */
  updateMeta(type, updater) {
    const recordData = this.getRecordData(type);
    if (recordData)
      updater(recordData.meta);
  }
  /**
   * 返回当前录制的全量recordData
   */
  getAllRecordData() {
    return this.recordData;
  }
  /**
   * 返回当前录制的全量recordData的类型数组，可传入 {exclude} 过滤特定类型
   */
  getAllRecordDataTypes(exclude = []) {
    return [...this.recordData.keys()].filter((key) => !exclude.includes(key));
  }
  /**
   * 返回类型为 {type} 的recordData
   */
  getRecordData(type) {
    if (!type)
      throw new Error("Arg [type] must be passed, such as monitor.getRecordData('request'), you can also check valid type string by monitor.getAllRecordDataTypes().");
    return this.recordData.get(type);
  }
  /**
   * 根据传入的 {types} 数组对recordData进行分组统计，可以通过第二个参数自定义统计的过滤、分组和排序逻辑
   * @example
   * ```ts
   * // 对setData进行分组统计，根据所属组件进行分组，根据发送数据大小进行排序
   * const info = monitor.getStatistics(['setData'], {
   *   groupBy: (data) => data.contextInfo?.is || 'unknown',
   *   sortBy: (data) => data.size
   * })
   * console.log(info)
   * ```
   */
  getStatistics(types = [], {
    filter = filterTrue,
    groupBy = groupByType,
    sortBy = sortByCount
  } = {}) {
    const groupMap = /* @__PURE__ */ new Map();
    types.forEach((type) => {
      const recordData = this.getRecordData(type);
      if (recordData) {
        recordData.forEach((data) => {
          if (!filter(data))
            return;
          const key = groupBy(data);
          const groupData = groupMap.get(key) || {
            key,
            count: 0,
            size: 0,
            resultSize: 0,
            duration: 0
          };
          if (!groupMap.has(key))
            groupMap.set(key, groupData);
          groupData.count++;
          groupData.duration += data.duration || 0;
          groupData.size += data.size || 0;
          groupData.resultSize += data.resultSize || 0;
        });
      }
    });
    return [...groupMap.values()].sort((a, b) => sortBy(b) - sortBy(a));
  }
  /**
   * 在内部调用 {@link getStatistics} 分别对setData、request和其余API进行分组统计获取数据摘要
   */
  getSummary() {
    const { config } = this;
    const summary = {};
    if (config.recordSetData) {
      summary.setData = this.getStatistics(["setData"], {
        groupBy: (data) => {
          var _a;
          return ((_a = data.contextInfo) == null ? void 0 : _a.is) || "unknown";
        },
        sortBy: (data) => data.size
      });
    }
    if (config.recordAPI) {
      if (this.getRecordData("request")) {
        summary.request = this.getStatistics(["request"], {
          groupBy: (data) => {
            if (!data.url)
              return "unknown";
            const idx = data.url.indexOf("?");
            return idx === -1 ? data.url : data.url.slice(0, idx);
          }
        });
      }
      const otherTypes = this.getAllRecordDataTypes(["setData", "request"]);
      summary.api = this.getStatistics(otherTypes);
    }
    return summary;
  }
  /**
   * 清除全量recordData
   */
  clearData() {
    this.recordData.clear();
  }
  /**
   * 销毁monitor实例
   */
  destroy() {
    this.clearData();
    this.preWarningRules.clear();
    this.postWarningRules.clear();
    this.isActive = false;
    removeMonitor(this);
  }
}

export { APIMonitor, byteLength, getCountRule, getErrorRule, getParallelismRule, getResultSizeRule, getRouteParallelismRule, getSizeRule, setCustomSyncList, setDataGenerator, setStackConfig };
