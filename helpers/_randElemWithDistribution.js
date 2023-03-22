const _randArrElem = require('./_randArrElem');

const _randElemWithDistribution = (
	poolsObj,
	distribution,
	selective = true
) => {
	// console.log(`selective: ${selective}`);
	const distrCopy = { ...distribution };
	distribution = {};
	for (poolName in poolsObj) {
		distribution[poolName] = 1;
	}
	distribution = { ...distribution, ...distrCopy };
	// console.log(distribution);
	if (selective) {
		const primaryPool = [];
		Object.keys(distribution).forEach((poolName) => {
			for (i = 0; i < distribution[poolName]; i++) {
				primaryPool.push(poolName);
			}
		});
		return _randArrElem(poolsObj[_randArrElem(primaryPool)]);
	}
	const pool = [];
	Object.keys(distribution).forEach((poolName) => {
		for (i = 0; i < distribution[poolName]; i++) {
			pool.push(...poolsObj[poolName]);
		}
	});
	// console.log(pool);
	return _randArrElem(pool);
};

module.exports = _randElemWithDistribution;
