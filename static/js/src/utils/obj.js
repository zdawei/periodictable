
const obj = {
	merge (a,b,isDepth) {
		// isDepth是否深拷贝
		for (let k in a) {
			if(k in b) {
				if(isDepth) {
					if(obj.isObject(a[k])) {
						obj.merge(a[k], b[k]);
					} else {
						a[k] = b[k];
					}
				} else {
					a[k] = b[k];
				}
            }
		}
	},
	isEmpty (o,isprototype) {
		for(var k in o){
			if(isprototype || o.hasOwnProperty(k)){
				return false;
			}
		}
		return true;
	},
	isObject (o) {
		return Object.prototype.toString.call(o) === '[object Object]';
	}
};

export {obj};