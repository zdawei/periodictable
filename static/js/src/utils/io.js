
import {url} from './url';
import {json} from './json';
/* aj请求
 */
const io = {
    ajax (spec) {
        const conf = {
            url : '',
            timeout : 30 * 1000,
            args : {},
            method : 'get',
            isAsync : true,
            header : {},
            responseType : 'text',
            isEncode : false,
        };
        Object.assign(conf, spec);
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            let data = {};
            xhr.responseType = conf.responseType;
            xhr.onload = () => {
                if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    let resType = conf.responseType.toLocaleLowerCase();
                    if(resType == 'blob' || resType == 'arraybuffer') {
                        data.resData = xhr.response;
                    } else {
                        try {
                            data.resData = xhr.responseText ? JSON.parse(xhr.responseText) : {};
                        } catch(e) {
                            data.resData = xhr.responseText;
                        }
                    }
                    data.__xhrStatus__ = xhr.status;
                    resolve(data);
                } else {
                    reject(data);
                }
            };
            xhr.onerror = () => {
                data.__xhrStatus__ = -1;
                reject(data);
            };
            xhr.ontimeout = () => {
                data.__xhrStatus__ = 0;
                reject(data);
            };
            xhr.timeout = conf.timeout;
            if(conf.method.toLocaleLowerCase() == 'get') {
                let _url = url.URL(conf.url, {
                    isEncodeQuery : conf.isEncode
                });
                _url.setParams(conf.args);
                xhr.open(conf.method, _url, conf.isAsync);
                try{
                    for(let k in conf.header){
                        xhr.setRequestHeader(k, conf.header[k]);
                    }
                }catch(err){}
                xhr.send(null);
            } else {
                xhr.open(conf.method, conf.url, conf.isAsync);
                try{
                    for(let k in conf.header){
                        xhr.setRequestHeader(k, conf.header[k]);
                    }
                }catch(err){}
                xhr.send(json.jsonToQuery(conf.args));
            }
            return xhr;
        });
    }
};

export {io};