
import {obj} from './obj';

const cookie = {
    /**
     * 设置cookie
     * @method set
     * @param {String} sKey
     * @param {String} sValue
     * @param {String} oOpts
        {
                'expire': {Number}, //过期时间
                'path': {String},   //路径，默认''
                'domain': {String}, //域
                'secure': {String}, //是否保护
                'encode': {Boolean} //是否编码
        }
        * @return {void}
        * @example
        */
    set (sKey, sValue, oOpts) {
        let arr = [];
        let d, t;
        let cfg = obj.merge({
            'expire': null,
            'path': '/',
            'domain': null,
            'secure': null,
            'encode': true
        }, oOpts);
            
        if (cfg.encode == true) {
            sValue = escape(sValue);
        }
        arr.push(sKey + '=' + sValue);

        if (cfg.path != null) {
            arr.push('path=' + cfg.path);
        }
        if (cfg.domain != null) {
            arr.push('domain=' + cfg.domain);
        }
        if (cfg.secure != null) {
            arr.push(cfg.secure);
        }
        if (cfg.expire != null) {
            d = new Date();
            t = d.getTime() + cfg.expire * 3600000;
            d.setTime(t);
            arr.push('expires=' + d.toGMTString());
        }
        document.cookie = arr.join(';');
    },
    /**
     * Describe 获取cookie
     * @method get
     * @param {String} sKey
     * @return {String}
     * @example
     */
    get (sKey) {
        sKey = sKey.replace(/([.[]$])/g, '\$1');
        let rep = new RegExp(sKey + '=([^;]*)?;', 'i');
        let co = document.cookie + ';';
        let res = co.match(rep);
        if (res) {
            return res[1] || "";
        }
        else {
            return '';
        }
    },
    /**
     * Describe 删除cookie
     * @method remove
     * @param {String} sKey
     * @return {void}
     * @example
     */
    remove (sKey, oOpts) {
        oOpts = oOpts || {};
        oOpts.expire = -10;
        cookie.set(sKey, '', oOpts);
    }
};

export {cookie};