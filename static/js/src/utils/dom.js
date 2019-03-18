
import {str} from './str';

const dom = {
    E(a) {
        if(typeof a==="string") {
            return document.getElementById(a)
        } else {
            return a
        }
    },
    C(a) {
        let b;
        a = a.toUpperCase();
        if (a == "TEXT") {
            b = document.createTextNode("");
        } else if (a == "BUFFER") {
            b = document.createDocumentFragment();
        } else {
            b = document.createElement(a);
        }
        return b;
    },
    insertHTML(node, html, where) {
        node = this.E(node) || document.body;
        html = str.trim(html);
        where = where ? where.toLowerCase(): "replace";
        if (node.insertAdjacentHTML) {
            switch (where) {
                case "beforebegin":
                    node.insertAdjacentHTML('BeforeBegin', html);
                    return node.previousSibling;
                case "afterbegin":
                    node.insertAdjacentHTML('AfterBegin', html);
                    return node.firstChild;
                case "beforeend":
                    node.insertAdjacentHTML('BeforeEnd', html);
                    return node.lastChild;
                case "afterend":
                    node.insertAdjacentHTML('AfterEnd', html);
                    return node.nextSibling;
                case "replace":
                    node.innerHTML = html;
                    return node.firstChild;
            }
            throw 'Illegal insertion point -> "' + where + '"';
        }
        else {
            let range = node.ownerDocument.createRange();
            let frag;
            switch (where) {
                case "beforebegin":
                    range.setStartBefore(node);
                    frag = range.createContextualFragment(html);
                    node.parentNode.insertBefore(frag, node);
                    return node.previousSibling;
                case "afterbegin":
                    if (node.firstChild) {
                        range.setStartBefore(node.firstChild);
                        frag = range.createContextualFragment(html);
                        node.insertBefore(frag, node.firstChild);
                        return node.firstChild;
                    }
                    else {
                        node.innerHTML = html;
                        return node.firstChild;
                    }
                    break;
                case "beforeend":
                    if (node.lastChild) {
                        range.setStartAfter(node.lastChild);
                        frag = range.createContextualFragment(html);
                        node.appendChild(frag);
                        return node.lastChild;
                    }
                    else {
                        node.innerHTML = html;
                        return node.lastChild;
                    }
                    break;
                case "afterend":
                    range.setStartAfter(node);
                    frag = range.createContextualFragment(html);
                    node.parentNode.insertBefore(frag, node.nextSibling);
                    return node.nextSibling;
                case "replace":
                    node.innerHTML = html;
                    return node.firstChild;
            }
            throw 'Illegal insertion point -> "' + where + '"';
        }
    },
    builder (outer) {
        let resArr = this.sizzle('[node-type]', outer);
        let res = {};
        for(let k in resArr) {
            if(this.isNode(resArr[k])) {
                let name = resArr[k].getAttribute('node-type');
                res[name] = resArr[k];
            }
        }
        return res;
    },
    sizzle (selector, context) {
        return context.querySelectorAll(selector);
    },
    isNode (node) {
        return (node != undefined) && Boolean(node.nodeName) && Boolean(node.nodeType);
    },
    addClassName (node, className) {
        className = str.trim(className);
        if(node.nodeType === 1){
            if (!this.hasClassName(node,className)) {
                node.className += (' ' + className);
            }
        }
    },
    hasClassName (node, className) {
        className = str.trim(className);
        return (new RegExp("(^|\\s)"+className+"($|\\s)")).test(node.className);
    },
    removeClassName (node, className) {
        className = str.trim(className);
        if(node.nodeType === 1){
            if(this.hasClassName(node,className)){
                node.className = node.className.replace(new RegExp('(^|\\s)' + className + '($|\\s)'),' ');
            }
        }
    },
    contains (parent, node) {
        if (parent === node) {
            return false;
 
        } else if (parent.compareDocumentPosition) {
            return ((parent.compareDocumentPosition(node) & 16) === 16);
 
        } else if (parent.contains && node.nodeType === 1) {
            return   parent.contains(node);
 
        }else {
            while (node = node.parentNode) {
                if (parent === node){
                    return true;
                }
            }
        }
        return false;
    },
    winSize (_target) {
        let w, h;
        let target;
        if (_target) {
            target = _target.document;
        }
        else {
            target = document;
        }
         
        if(target.compatMode === "CSS1Compat") {
            w = target.documentElement[ "clientWidth" ];
            h = target.documentElement[ "clientHeight" ];
        }else if (self.innerHeight) { // all except Explorer
            if (_target) {
                target = _target.self;
            }
            else {
                target = self;
            }
            w = target.innerWidth;
            h = target.innerHeight;
             
        }else if (target.documentElement && target.documentElement.clientHeight) { // Explorer 6 Strict Mode
            w = target.documentElement.clientWidth;
            h = target.documentElement.clientHeight;
                 
        }else if (target.body) { // other Explorers
            w = target.body.clientWidth;
            h = target.body.clientHeight;
        }
        return {
            width: w,
            height: h
        };
    }
    
};

export {dom};