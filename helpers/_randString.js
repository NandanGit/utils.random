const _randArrElem = require('./_randArrElem');
const _randElemWithDistribution = require('./_randElemWithDistribution');

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

const _randSting = (length, options, selectiveDistribution = true) => {
	// console.log(options);
	const charPool = {
		...CHAR_POOL,
		specialCharacters: options.availableSpecialCharacters,
	};
	delete options.availableSpecialCharacters;
	// console.log(charPool);
	// console.log(options);
	let acc = '';
	for (ind = 0; ind < length; ind++) {
		acc += _randElemWithDistribution(charPool, options);
	}
	return acc;
};

module.exports = _randSting;
