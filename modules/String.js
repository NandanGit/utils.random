const _checkTypes = require('../helpers/services/_checkTypes');
const _randSting = require('../helpers/_randString');

const specialCharacters = '~`!@#$%^&*()_-+={[}]|\\:;"\'<,>.?/'.split('');
const StrOptions = {
	upperCase: 1,
	lowerCase: 1,
	digits: 0,
	specialCharacters: 0,
	availableSpecialCharacters: specialCharacters,
	allowedSpecialCharacters: null,
	omittedSpecialCharacters: null,
};

/**
 * Returns a string of random characters
 * - `length` is mandatory
 * - `options` object is optional
 * - The flags that are set to `1` inside options are included
 *   - `lowerCase` and `upperCase` are `1` by default,
 *     to exclude lowerCase or upperCase, explicitly set the respective flags to `0`
 *   - `digits` is set to `0` by default
 *   - `specialCharacters` is set to `0` by default
 *     - we can restrict the special characters to
 *       align with our needs by providing `allowedSpecialCharacters`
 *     - In the same way we can also omit some of the
 *       characters by providing `omittedSpecialCharacters`
 *     - `allowedSpecialCharacters` takes precedence over `omittedSpecialCharacters`
 *   - __Note:__ If you set a flag to `2`, the chance
 *     of occurrence of that charType will double, if you set it to `3` it will triple and so forth...
 *
 * @param {Number} length - length of the sub-string
 * @param {StrOptions} options - to customize the functionality
 * @returns {String} A string of random characters
 * @author Nandan Reddy
 */
const Str = (
	length = 0,
	options = StrOptions,
	// charDistribution = CharDistribution
	selectiveDistribution = true
) => {
	_checkTypes({
		length: { val: length, type: 'number' },
		options: { val: options, type: 'object' },
	});

	options = { ...StrOptions, ...options };

	const curatedOptions = { ...options };
	if (options.allowedSpecialCharacters) {
		curatedOptions.specialCharacters = 1;
		curatedOptions.availableSpecialCharacters =
			options.allowedSpecialCharacters;
	} else if (options.omittedSpecialCharacters) {
		curatedOptions.specialCharacters = 1;
		curatedOptions.availableSpecialCharacters =
			options.availableSpecialCharacters.filter(
				(char) => !options.omittedSpecialCharacters.includes(char)
			);
	}
	delete curatedOptions.allowedSpecialCharacters;
	delete curatedOptions.omittedSpecialCharacters;
	return _randSting(length, curatedOptions, selectiveDistribution);
};

exports = module.exports = Str;
