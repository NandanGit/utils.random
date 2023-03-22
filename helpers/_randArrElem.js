const _randInt = require('./_randInt');

const _randArrElem = (arr) => {
	return arr[_randInt(0, arr.length - 1)];
};

module.exports = _randArrElem;
