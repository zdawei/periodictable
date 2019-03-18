
const arr = {
    isArray (o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    },
    inArray (arr, val) {
        return arr.includes(val);
    }
};

export {arr};