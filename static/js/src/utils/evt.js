
import {dom} from './dom';
import {obj} from './obj';
import {json} from './json';
import {arr} from './arr';

const checkContains = (list,el) => {
    for(let i = 0, len = list.length; i < len; i += 1){
        if(dom.contains(list[i],el)){
            return true;
        }
    }
    return false;
};

const evt = {
    addEvent (el, type, fn) {
        el = dom.E(el);
	    if (el == null) {
	        return false;
	    }
	    if (typeof fn !== "function") {
	        return false;
	    }
        if (el.addEventListener) {
            el.addEventListener(type, fn, false);
        } else if (el.attachEvent) {
            el.attachEvent('on' + type, fn);
        } else {
            el['on' + type] = fn;
        }
        return true;
    },
    removeEvent (el, type, fn) {
        el = dom.E(el);
        if (el == null) {
            return false;
        }
        if (typeof fn !== "function") {
            return false;
        }
        if (el.removeEventListener) {
            el.removeEventListener(type, fn, false);
        } else if (el.detachEvent) {
            el.detachEvent("on" + type, fn);
        }
        el['on' + type] = null;
        return true;
    },
    getEvent : (() => {
        if (document.addEventListener) {
			return () => {
				let o = arguments.callee;
				let e;
				do {
					e = o.arguments[0];
					if (e && /Event/.test(Object.prototype.toString.call(e))) {
						return e;
					}
				} while (o = o.caller);
				return e;
			};
		} else {
			return () => {
				return window.event;
			};
		}
    })(),
    fixEvent (e) {
        e = e || this.getEvent();
		//fix target
		if(!e.target){
			e.target = e.srcElement || document;
		}
		//fix pageX & pageY
		if(e.pageX == null && e.clientX != null){
			let html = document.documentElement;
			let body = document.body;
			
			e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || body && body.clientLeft || 0);
			e.pageY = e.clientY + (html.scrollTop  || body && body.scrollTop  || 0) - (html.clientTop  || body && body.clientTop  || 0);
		}
		//fix button
		if (!e.which && e.button) {
			if (e.button & 1) {e.which = 1;}      // Left
			else if (e.button & 4) {e.which = 2;} // Middle
			else if (e.button & 2) {e.which = 3;} // Right
		}
		
		//fix relatedTarget
		if (e.relatedTarget === undefined) {
			e.relatedTarget = e.fromElement || e.toElement;
		}
		
		//fix layerX & layerY(之后会去掉,为了向下兼容)
		if (e.layerX == null && e.offsetX != null){
			e.layerX = e.offsetX;
			e.layerY = e.offsetY;
		}
		return e;
    },
    delegatedEvent (actEl,expEls){
		if(!dom.isNode(actEl)){
			throw 'core.evt.delegatedEvent need an Element as first Parameter';
		}
		if(!expEls){
			expEls = [];
		}
		if(!arr.isArray(expEls)){
			expEls = [expEls];
		}
		let evtList = {};
		let bindEvent = (e) => {
			let evt = this.fixEvent(e);
			let el = evt.target;
			let type = e.type;
			doDelegated(el, type, evt);
		};
		
		let doDelegated = (el, type, evt) => {
			let actionType = null;
			let changeTarget = () => {
				let path, lis, tg;
				path = el.getAttribute('action-target');
				if(path){
					lis = dom.sizzle(path, actEl);
					if(lis.length){
						tg = evt.target = lis[0];
					}
				};
				changeTarget = () => {};
				return tg;
			};
			let checkBuble = () => {
				let tg = changeTarget() || el;
				if(evtList[type] && evtList[type][actionType]){
					return evtList[type][actionType]({
						'evt' : evt,
						'el' : tg,
						'box' : actEl,
						'data' : json.queryToJson(tg.getAttribute('action-data') || '')
					});
				}else{
					return true;
				}
			};
			if(checkContains(expEls,el)){
				return false;
			}else if(!dom.contains(actEl, el)){
				return false;
			}else{
				while(el && el !== actEl){
					if(el.nodeType === 1){
						actionType = el.getAttribute('action-type');
						if(actionType && checkBuble() === false){
							break;
						}
					}
					el = el.parentNode;
				}
				
			}
		};
		
		let that = {};
		/**
		 * 添加代理事件
		 * @method add
		 * @param {String} funcName
		 * @param {String} evtType
		 * @param {Function} process
		 * @return {void}
		 * @example
		 * 		document.body.innerHTML = '<div id="outer"><a href="###" action_type="alert" action_data="test=123">test</a><div id="inner"></div></div>'
		 * 		let a = STK.core.evt.delegatedEvent($.E('outer'),$.E('inner'));
		 * 		a.add('alert','click',function(spec){window.alert(spec.data.test)});
		 *
		 */
		that.add = (funcName, evtType, process) => {
			if(!evtList[evtType]){
				evtList[evtType] = {};
				this.addEvent(actEl, evtType, bindEvent);
			}
			let ns = evtList[evtType];
			ns[funcName] = process;
		};
		/**
		 * 移出代理事件
		 * @method remove
		 * @param {String} funcName
		 * @param {String} evtType
		 * @return {void}
		 * @example
		 * 		document.body.innerHTML = '<div id="outer"><a href="###" action_type="alert" action_data="test=123">test</a><div id="inner"></div></div>'
		 * 		let a = STK.core.evt.delegatedEvent($.E('outer'),$.E('inner'));
		 * 		a.add('alert','click',function(spec){window.alert(spec.data.test)});
		 * 		a.remove('alert','click');
		 */
		that.remove = (funcName, evtType) => {
			if(evtList[evtType]){
				delete evtList[evtType][funcName];
				if(obj.isEmpty(evtList[evtType])){
					delete evtList[evtType];
					this.removeEvent(actEl, evtType, bindEvent);
				}
			}
		};
		
		/**
		 * 添加略过节点
		 * @method pushExcept
		 * @param {Node} el
		 * @example
		 * 		document.body.innerHTML = '<div id="outer"><a href="###" action_type="alert" action_data="test=123">test</a><div id="inner"></div></div>'
		 * 		let a = STK.core.evt.delegatedEvent($.E('outer'));
		 * 		a.add('alert','click',function(spec){window.alert(spec.data.test)});
		 * 		a.pushExcept($.E('inner'));
		 */
		that.pushExcept = (el) => {
			expEls.push(el);
		};
		
		/**
		 * 移出略过节点
		 * @method removeExcept
		 * @param {Node} el
		 * @example
		 * 		document.body.innerHTML = '<div id="outer"><a href="###" action_type="alert" action_data="test=123">test</a><div id="inner"></div></div>'
		 * 		let a = STK.core.evt.delegatedEvent($.E('outer'));
		 * 		a.add('alert','click',function(spec){window.alert(spec.data.test)});
		 * 		a.pushExcept($.E('inner'));
		 * 		a.removeExcept($.E('inner'));
		 */
		that.removeExcept = (el) => {
			if(!el){
				expEls = [];
			}else{
				for(let i = 0, len = expEls.length; i < len; i += 1){
					if(expEls[i] === el){
						expEls.splice(i,1);
					}
				}
			}
			
		};
		/**
		 * 晴空略过节点
		 * @method clearExcept
		 * @example
		 * 		document.body.innerHTML = '<div id="outer"><a href="###" action_type="alert" action_data="test=123">test</a><div id="inner"></div></div>'
		 * 		let a = STK.core.evt.delegatedEvent($.E('outer'));
		 * 		a.add('alert','click',function(spec){window.alert(spec.data.test)});
		 * 		a.pushExcept($.E('inner'));
		 * 		a.clearExcept();
		 */
		that.clearExcept = (el) => {
			expEls = [];
		};
		/**
		 * 支持外调action 非基于节点的代理事件触发
		 * @method fireAction
		 * @param {string} actionType
		 * @param {string} evtType
		 * @param {Event} [evt]
		 * @param {hash} [params]
		 * @example
		 * 		document.body.innerHTML = '<div id="outer"><a href="###" action_type="alert" action_data="test=123">test</a><div id="inner"></div></div>'
		 * 		let a = STK.core.evt.delegatedEvent($.E('outer'));
		 * 		a.add('alert','click',function(spec){window.alert(spec.data.test)});
		 * 		a.fireAction('alert', 'click', null, {
		 * 			actionData : 'test1=1&test2=2'
		 * 		});
		 * 
		 */
		that.fireAction = (actionType, evtType, evt, params) => {
			let actionData = '';
			if(params && params['actionData']){
				actionData = params['actionData'];
			}
			if(evtList[evtType] && evtList[evtType][actionType]){
				evtList[evtType][actionType]({
					'evt' : evt,
					'el' : null,
					'box' : actEl,
					'data' : json.queryToJson(actionData),
					'fireFrom' : 'fireAction'
				});
			}
		};
		/**
		 * 支持外调节点 可以将某代理事件代理区域外节点的事件转嫁到该代理事件上
		 * @method fireInject
		 * @param {Element} dom
		 * @param {string} evtType
		 * @param {Event} [evt]
		 * @example
		 * 		document.body.innerHTML = '<div id="outer"><a href="###" action_type="alert" action_data="test=123">test</a><div id="inner"></div></div><button id='inject'>click me!</button>'
		 * 		let a = STK.core.evt.delegatedEvent($.E('outer'));
		 * 		a.add('alert','click',function(spec){window.alert(spec.data.test)});
		 * 		let button = STK.E('inject');
		 * 		STK.addEvent(button, 'click', function(evt) {
		 * 			a.fireInject(button, 'click', evt);
		 * 		});
		 */
		that.fireInject = (dom, evtType, evt) => {
			let actionType = dom.getAttribute('action-type');
			let actionData = dom.getAttribute('action-data');
			if(actionType && evtList[evtType] && evtList[evtType][actionType]){
				evtList[evtType][actionType]({
					'evt' : evt,
					'el' : dom,
					'box' : actEl,
					'data' : json.queryToJson(actionData || ''),
					'fireFrom' : 'fireInject'
				});
			}
		};
		
		/**
		 * 支持节点触发 解决直接fire节点的某事件不冒泡引起代理事件不生效而添加的方法
		 * @method fireDom
		 * @param {Element} dom
		 * @param {string} evtType
		 * @param {Event} [evt]
		 * @example
		 * 		document.body.innerHTML = '<div id="outer"><a href="###" action_type="alert" action_data="test=123">test</a><div id="inner"></div></div>'
		 * 		let a = STK.core.evt.delegatedEvent($.E('outer'));
		 * 		a.add('alert','click',function(spec){window.alert(spec.data.test)});
		 * 		a.fireDom(a, 'click', null);
		 */
		that.fireDom = (dom, evtType, evt) => {
			doDelegated(dom, evtType, evt || {});
		};
		/**
		 * 销毁
		 * @method destroy
		 */
		that.destroy = () => {
			for(let k in evtList){
				for(let l in evtList[k]){
					delete evtList[k][l];
				}
				delete evtList[k];
				this.removeEvent(actEl, k, bindEvent);
			}
		};
		return that;
	}
};

export {evt};