
import {json} from './json';

const url = {
    parseURL (a) {
        let b = /^(?:([A-Za-z]+):(\/{0,3}))?([0-9.\-A-Za-z]+\.[0-9A-Za-z]+)?(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
        let c = ["url", "scheme", "slash", "host", "port", "path", "query", "hash"];
        let d = b.exec(a);
        let e = {};
        for(let f = 0, g = c.length ; f < g ; f += 1 ) {
            e[c[f]] = d[f] || "";
        }
        return e;
    },
    URL(sURL,args) {
        let opts = Object.assign({
            'isEncodeQuery'  : false,
            'isEncodeHash'   : false
        },args||{});
        let that = {};
        let url_json = this.parseURL(sURL);
            
            
        let query_json = json.queryToJson(url_json.query);
            
        let hash_json = json.queryToJson(url_json.hash);
            
            
        /**
         * Describe 设置query值
         * @method setParam
         * @param {String} sKey
         * @param {String} sValue
         * @example
         */
        that.setParam = function(sKey, sValue){
            query_json[sKey] = sValue;
            return this;
        };
        /**
         * Describe 取得query值
         * @method getParam
         * @param {String} sKey
         * @example
         */
        that.getParam = function(sKey){
            return query_json[sKey];
        };
        /**
         * Describe 设置query值(批量)
         * @method setParams
         * @param {Json} oJson
         * @example
         */
        that.setParams = function(oJson){
            for (let key in oJson) {
                that.setParam(key, oJson[key]);
            }
            return this;
        };
        /**
         * Describe 设置hash值
         * @method setHash
         * @param {String} sKey
         * @param {String} sValue
         * @example
         */
        that.setHash = function(sKey, sValue){
            hash_json[sKey] = sValue;
            return this;
        };
        /**
         * Describe 设置hash值
         * @method getHash
         * @param {String} sKey
         * @example
         */
        that.getHash = function(sKey){
            return hash_json[sKey];
        };
        /**
         * Describe 取得URL字符串
         * @method toString
         * @example
         */
        that.valueOf = that.toString = function(){
            let url = [];
            let query = json.jsonToQuery(query_json, opts.isEncodeQuery);
            let hash = json.jsonToQuery(hash_json, opts.isEncodeQuery);
            if (url_json.scheme != '') {
                url.push(url_json.scheme + ':');
                url.push(url_json.slash);
            }
            if (url_json.host != '') {
                url.push(url_json.host);
                if(url_json.port != ''){
                    url.push(':');
                    url.push(url_json.port);
                }
            }
            url.push('/');
            url.push(url_json.path);
            if (query != '') {
                url.push('?' + query);
            }
            if (hash != '') {
                url.push('#' + hash);
            }
            return url.join('');
        };
            
        return that;
    }
};

export {url};
