
const str = {
    trim (str) {
        if(typeof str !== 'string'){
			throw 'trim need a string as parameter';
		}
		let len = str.length;
		let s = 0;
		let reg = /(\u3000|\s|\t|\u00A0)/;
		
		while(s < len){
			if(!reg.test(str.charAt(s))){
				break;
			}
			s += 1;
		}
		while(len > s){
			if(!reg.test(str.charAt(len - 1))){
				break;
			}
			len -= 1;
		}
		return str.slice(s, len);
	},
	isString (o) {
		return Object.prototype.toString.call(o) === '[object String]';
	}
}

export {str};