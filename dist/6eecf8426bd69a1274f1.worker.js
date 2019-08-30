!function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}__webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.d=function(exports,name,getter){__webpack_require__.o(exports,name)||Object.defineProperty(exports,name,{enumerable:!0,get:getter})},__webpack_require__.r=function(exports){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})},__webpack_require__.t=function(value,mode){if(1&mode&&(value=__webpack_require__(value)),8&mode)return value;if(4&mode&&"object"==typeof value&&value&&value.__esModule)return value;var ns=Object.create(null);if(__webpack_require__.r(ns),Object.defineProperty(ns,"default",{enumerable:!0,value:value}),2&mode&&"string"!=typeof value)for(var key in value)__webpack_require__.d(ns,key,function(key){return value[key]}.bind(null,key));return ns},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function(){return module.default}:function(){return module};return __webpack_require__.d(getter,"a",getter),getter},__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)},__webpack_require__.p="/dist/",__webpack_require__(__webpack_require__.s=0)}([
/*!************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib?cacheDirectory!./packages/webviz-core/src/players/UserNodePlayer/worker/index.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(module,exports,__webpack_require__){"use strict";(function(global){var obj,_userNodeRegistry=__webpack_require__(/*! ./userNodeRegistry */2),_Rpc=(obj=__webpack_require__(/*! webviz-core/src/util/Rpc */3))&&obj.__esModule?obj:{default:obj};if(!(global.postMessage&&"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope))throw new Error("Not in a WebWorker.");const rpc=new _Rpc.default(global);rpc.receive("registerNode",_userNodeRegistry.registerNode),rpc.receive("processMessage",_userNodeRegistry.processMessage)}).call(this,__webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/global.js */1))},
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(module,exports){var g;g=function(){return this}();try{g=g||new Function("return this")()}catch(e){"object"==typeof window&&(g=window)}module.exports=g},
/*!************************************************************************************!*\
  !*** ./packages/webviz-core/src/players/UserNodePlayer/worker/userNodeRegistry.js ***!
  \************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.processMessage=exports.registerNode=void 0;let nodeCallback=()=>{};exports.registerNode=(({nodeUserCode:nodeUserCode})=>{nodeCallback=new Function(nodeUserCode)()});exports.processMessage=(({message:message})=>nodeCallback(message))},
/*!**********************************************!*\
  !*** ./packages/webviz-core/src/util/Rpc.js ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(module,exports,__webpack_require__){"use strict";function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.defineProperty(exports,"__esModule",{value:!0}),exports.createLinkedChannels=function(){const local={onmessage:void 0,postMessage(data,transfer){const ev=new MessageEvent("message",{data:data});remote.onmessage&&remote.onmessage(ev)}},remote={onmessage:void 0,postMessage(data,transfer){const ev=new MessageEvent("message",{data:data});local.onmessage&&local.onmessage(ev)}};return{local:local,remote:remote}},exports.default=void 0;const RESPONSE="$$RESPONSE",ERROR="$$ERROR";class Rpc{constructor(channel){if(_defineProperty(this,"_channel",void 0),_defineProperty(this,"_messageId",0),_defineProperty(this,"_pendingCallbacks",{}),_defineProperty(this,"_receivers",new Map),_defineProperty(this,"_onChannelMessage",ev=>{const{id:id,topic:topic,data:data}=ev.data;if(topic===RESPONSE)return this._pendingCallbacks[id](ev.data),void delete this._pendingCallbacks[id];new Promise((resolve,reject)=>{const handler=this._receivers.get(topic);if(!handler)throw new Error(`no receiver registered for ${topic}`);resolve(handler(data))}).then(result=>{if(!result)return this._channel.postMessage({topic:RESPONSE,id:id});const transferrables=result[Rpc.transferrables];delete result[Rpc.transferrables];const message={topic:RESPONSE,id:id,data:result};this._channel.postMessage(message,transferrables)}).catch(err=>{const message={topic:RESPONSE,id:id,data:{[ERROR]:!0,name:err.name,message:err.message,stack:err.stack}};this._channel.postMessage(message)})}),this._channel=channel,this._channel.onmessage)throw new Error("channel.onmessage is already set. Can only use one Rpc instance per channel.");this._channel.onmessage=this._onChannelMessage}send(topic,data,transfer){const id=this._messageId++,message={topic:topic,id:id,data:data},result=new Promise((resolve,reject)=>{this._pendingCallbacks[id]=(info=>{if(info.data&&info.data[ERROR]){const error=new Error(info.data.message);error.name=info.data.name,error.stack=info.data.stack,reject(error)}else resolve(info.data)})});return this._channel.postMessage(message,transfer),result}receive(topic,handler){if(this._receivers.has(topic))throw new Error(`Receiver already registered for topic: ${topic}`);this._receivers.set(topic,handler)}}exports.default=Rpc,_defineProperty(Rpc,"transferrables","$$TRANSFERRABLES")}]);