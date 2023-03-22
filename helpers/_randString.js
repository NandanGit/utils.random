const _randArrElem = require('./_randArrElem');

const CHAR_POOL = {
	lowerCase: 'abcdefghijklmnopqrstuvwxyz'.split(''),
	upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
	digits: '0123456789'.split(''),
};

const __getPool = (options) => {
	const EXTENDED_POOL = {
		...CHAR_POOL,
		specialCharacters: options.availableSpecialCharacters,
	};
	let filteredCharPool = [];
	for (const charType in EXTENDED_POOL) {
		if (options[charType]) {
			filteredCharPool = filteredCharPool.concat(EXTENDED_POOL[charType]);
		}
	}
	return filteredCharPool;
};

const _randSting = (length, options) => {
	const charPool = __getPool(options);
	let acc = '';
	for (ind = 0; ind < length; ind++) {
		acc += _randArrElem(charPool);
	}
	return acc;
};

module.exports = _randSting;
