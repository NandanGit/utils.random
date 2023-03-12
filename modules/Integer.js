/**
 * Returns a random Integer
 * - if only one arg is provided, the function returns a random number between 0 and the provided number
 * - if two args are provided, the function returns a random number between arg1 and arg2
 * - if more than two args are provided, all the args after the arg2 are ignored
 * @param {Number} [min=0] - lower limit
 * @param {Number} [max] - upper limit
 * @returns {Number} A random number
 * @author Nandan Reddy
 */
const Int = (...args) => {
	let min = 0,
		max;
	switch (args.length) {
		case 0:
			throw Error('Please provide at least one argument');
		case 1:
			max = args[0];
			break;
		case 2:
			[min, max] = args;
			break;
		default:
			return Int(...args.slice(0, 2));
	}
	if (max < min) [min, max] = [max, min];
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports = module.exports = Int;
