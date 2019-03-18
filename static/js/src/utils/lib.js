
import {evt} from './evt';
import {dom} from './dom';

const lib = {
    progress (node, cb) {
        let lock = false;
        node.addEventListener('mousedown', (e) => {
            lock = true;
        });
        node.addEventListener('mouseup', (e) => {
            lock = false;
            cb && cb(evt.fixEvent(e), 'mouseup');
        });
        node.addEventListener('mouseleave', (e) => {
            lock = false;
        });
        node.addEventListener('mousemove', (e) => {
            if(lock) {
                cb && cb(evt.fixEvent(e), 'mousemove');
            }
        });
        node.addEventListener('click', (e) => {
            // 阻止下冒泡
            e.stopPropagation();
        });
    },
    toggleLayer (node, cb) {
        /* 
            action-type="toggleLayerBtn" 切换层按钮
            node-type="toggleBtnText" 切换按钮文案写入节点
            node-type="toggleLayer" 切换层
            action-type="toggleLayerItem" 切换层选项 & 切换层时样式的切换
            action-data="" 切换层选项数据
                text : 要写入切换按钮的文案
                class : 要写入样式切换的样式名字
                其他数据的拓传
            要有文案写入时，必须同时提供，切换按钮文案写入节点 和 要写入切换按钮的文案
         */
        const nodes = dom.builder(node);
        const dEvt = evt.delegatedEvent(node);
        const handler = {
            toggleLayerBtn (spec) {
                spec.evt.stopPropagation();
                let display = nodes.toggleLayer.style.display; 
                nodes.toggleLayer.style.display = display == 'none' || display == '' ? 'block' : 'none';
            },
            toggleLayerItem (spec) {
                spec.evt.stopPropagation();
                nodes.toggleLayer.style.display = nodes.toggleLayer.style.display == 'none' ? 'block' : 'none';
                if(nodes.toggleBtnText && spec.data && spec.data.text) {
                    nodes.toggleBtnText.innerHTML = spec.data.text;
                }
                if(spec.data && spec.data.class) {
                    const toggleChangeClassNodes = dom.sizzle('[action-type=toggleLayerItem]', node);
                    toggleChangeClassNodes.forEach(element => {
                        if(element == spec.el) {
                            dom.addClassName(element, spec.data.class);
                        } else {
                            dom.removeClassName(element, spec.data.class);
                        }
                    });
                }
                cb && cb(spec);
            }
        };
        dEvt.add('toggleLayerBtn', 'click', handler.toggleLayerBtn);
        dEvt.add('toggleLayerItem', 'click', handler.toggleLayerItem);
    },
    enterLeave (node, cb) {
        evt.addEvent(node, 'mouseenter', (e) => {
            cb && cb(node, 'mouseenter');
        });
        evt.addEvent(node, 'mouseleave', (e) => {
            cb && cb(node, 'mouseleave');
        });
    }
}

export {lib};