import Color from './modules/Color';
import Float from './modules/Float';
import Int from './modules/Integer';
import Str from './modules/String';

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

export default $rand;
