# @mpxjs/mp-api-monitor

在小程序中对于全局API及实例API的调用同运行时性能有很大关联，首先，大部分的全局API调用都比较耗时(超过10ms)，过度调用会拖慢js本身的执行，其次，很多API调用本身就与运行时性能存在直接关系，例如实例API中的`this.setData`和全局API中的`wx.getLocation`等，不当的调用方式会在很大程度上影响到小程序的运行时性能，而这些问题往往在小程序业务开发时会被忽略掉。

为了发现解决业务代码小程序API不当调用的问题，我们设计开发了`@mpxjs/mp-api-monitor` SDK，通过该SDK我们能够监听到小程序全局API及实例API的调用，记录调用信息，生成统计摘要，便于开发者发现并定位小程序中存在的不当API调用；同时该SDK支持自定义报警配置，能够便于用户对小程序的API调用情况进行长期监控；最后SDK也在许多层面提供了自定义拓展机制，便于用户进行高度定制的API调用情况监控。

> 本SDK会对API进行代理，在调用和返回时执行统计逻辑，在一定程度上产生运行时开销，我们强烈建议仅在开发环境下作为问题排查的手段使用本SDK，而不要在生产环境下使用，可以使用Mpx提供的[`env条件编译`](https://www.mpxjs.cn/guide/advance/platform.html#%E9%80%9A%E8%BF%87-env-%E5%AE%9E%E7%8E%B0%E8%87%AA%E5%AE%9A%E4%B9%89%E7%9B%AE%E6%A0%87%E7%8E%AF%E5%A2%83%E7%9A%84%E6%9D%A1%E4%BB%B6%E7%BC%96%E8%AF%91)或者`process.env.NODE_ENV`进行环境定义与判断。

## 安装
```js
npm install --save-dev @mpxjs/mp-api-monitor
```

## 使用实例
```js
import { 
  APIMonitor, 
  getParallelismRule,
  getSizeRule
} from '@mpxjs/mp-api-monitor'

const monitor = new APIMonitor()

const error = (msg) => {
  console.error(msg)
}
// 添加报警规则：request并发数不应该超过10
monitor.addWarningRule('request', getParallelismRule({
  parallelism: 10,
  onWarning: error
}))
// 添加报警规则：setData单次发送数据不应该超过10K
monitor.addWarningRule('setData', getSizeRule({
  size: 10000,
  count: 1,
  onWarning: error
}))

monitor.startRecord()
setTimeout(()=>{
  // 也可在任意时机调用相关方法查看API调用情况
  console.log(monitor.getSummary())
}, 10000)
```

## API参考
https://github.com/mpx-ecology/mp-api-monitor/blob/master/docs/index.md

## License
[Apache-2.0](https://github.com/mpx-ecology/mp-api-monitor/blob/master/LICENSE)