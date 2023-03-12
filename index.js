const Color = require('./modules/Color');
const Float = require('./modules/Float');
const Int = require('./modules/Integer');
const Str = require('./modules/String');

/**
 * Collection of functions that depend on randomness
 * @namespace
 */
const $rand = {
	/**
	 * Integer Related functions
	 * @namespace
	 */
	int: Int,

	/**
	 * String Related functions
	 * @namespace
	 */
	str: Str,

	/**
	 * Float Related functions
	 * @namespace
	 */
	float: Float,

	/**
	 * Color Related functions
	 * @namespace
	 */
	color: Color,
};

module.exports = $rand;
