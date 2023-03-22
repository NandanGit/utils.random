const _checkTypes = require('../helpers/services/_checkTypes');
const _randSting = require('../helpers/_randString');

const specialCharacters = '~`!@#$%^&*()_-+={[}]|\\:;"\'<,>.?/'.split('');
const StrOptions = {
	upperCase: true,
	lowerCase: true,
	digits: false,
	specialCharacters: false,
	availableSpecialCharacters: specialCharacters,
	allowedSpecialCharacters: null,
	omittedSpecialCharacters: null,
};

/**
 * Returns a string of random characters
 * - `length` is mandatory
 * - `options` object is optional
 * - The flags that are set to true inside options are included
 *   - `lowerCase` and `upperCase` are true by default,
 *     to exclude lowerCase or upperCase, explicitly set the respective flags to false
 *   - `digits` is set to false by default
 *   - `specialCharacters` is set to false by default
 *     - we can restrict the special characters to
 *       align with our needs by providing `allowedSpecialCharacters`
 *     - In the same way we can also omit some of the
 *       characters by providing `omittedSpecialCharacters`
 *     - __Note:__ `allowedSpecialCharacters` takes precedence over `omittedSpecialCharacters`
 *
 * @param {Number} length - length of the sub-string
 * @param {StrOptions} options - upper limit
 * @returns {String} A string of random characters
 * @author Nandan Reddy
 */
const Str = (length = 0, options = StrOptions) => {
	_checkTypes({
		length: { val: length, type: 'number' },
		options: { val: options, type: 'object' },
	});

	options = { ...StrOptions, ...options };

	const curatedOptions = { ...options };
	if (options.allowedSpecialCharacters) {
		curatedOptions.specialCharacters = true;
		curatedOptions.availableSpecialCharacters =
			options.allowedSpecialCharacters;
	} else if (options.omittedSpecialCharacters) {
		curatedOptions.specialCharacters = true;
		curatedOptions.availableSpecialCharacters =
			options.availableSpecialCharacters.filter(
				(char) => !options.omittedSpecialCharacters.includes(char)
			);
	}
	delete curatedOptions.allowedSpecialCharacters;
	delete curatedOptions.omittedSpecialCharacters;
	return _randSting(length, curatedOptions);
};

exports = module.exports = Str;
