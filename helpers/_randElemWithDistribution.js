const _randArrElem = require('./_randArrElem');

const _randElemWithDistribution = (
	poolsObj,
	distribution,
	selective = true
) => {
	const distrCopy = { ...distribution };
	distribution = {};
	for (poolName in poolsObj) {
		distribution[poolName] = 1;
	}
	distribution = { ...distribution, ...distrCopy };
	// console.log(distribution);
	const primaryPool = [];
	Object.keys(distribution).forEach((poolName) => {
		for (i = 0; i < distribution[poolName]; i++) {
			primaryPool.push(poolName);
		}
	});
	return _randArrElem(poolsObj[_randArrElem(primaryPool)]);
};

module.exports = _randElemWithDistribution;
