
const json = {
    jsonToQuery(JSON, isEncode) {
        let queryString = [];
        let encodeStr = (str) => {
            return isEncode ? encodeURIComponent(str) : str;
        };
        for (let k in JSON) {
            if (k === '$nullName') {
                queryString = queryString.concat(encodeStr(JSON[k]));
                continue;
            }
            if (JSON[k] instanceof Array) {
                for(let i = 0, len = JSON[k].length; i < len; i++){
                    queryString.push(encodeStr(k) + "=" + encodeStr(JSON[k][i]));
                }
            } else {
                if (typeof JSON[k] != 'function') {
                    queryString.push(encodeStr(k) + "=" + encodeStr(JSON[k]));
                }
            }
        }
        return queryString.join("&");
    },
    queryToJson(query) {
        let _Qlist = query.split("&");
        let _json  = {};
        for(let i = 0, len = _Qlist.length; i < len; i++){
            if(_Qlist[i]){
                let _hsh = _Qlist[i].split("=");
                let _key = _hsh[0];
                let _value = _hsh[1];
                
                // 如果只有key没有value, 那么将全部丢入一个$nullName数组中
                if(_hsh.length < 2){
                    _value = _key;
                    _key = '$nullName';
                }
                // 如果缓存堆栈中没有这个数据
                if(!_json[_key]) {
                    _json[_key] = _value;
                }
                // 如果堆栈中已经存在这个数据，则转换成数组存储
                else {
                    _json[_key] = [].concat(_json[_key]).concat(_value);
                }
            }
        }
        return _json;
    }
};

export {json};