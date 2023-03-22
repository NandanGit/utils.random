/**
 * Verifies the types of the arguments provided
 * @param {Object} args {argName: {val, type, optional: boolean},...}
 */
const _checkTypes = (args) => {
	// console.log(args);
	for (const argName in args) {
		const argType = typeof args[argName].val;
		const expectedType = args[argName].type;
		if (typeof expectedType === 'string') {
			if (argType !== expectedType) {
				throw new Error(
					`${argName} expects ${
						expectedType === 'object' ? 'an' : 'a'
					} ${expectedType}`
				);
			}
		} else if (Array.isArray(expectedType)) {
			// Check from the list of types
			if (!expectedType.includes(argType)) {
				throw new Error(
					`${argName} expects ${
						expectedType[0] === 'object' ? 'an' : 'a'
					} ${expectedType.join('|')}`
				);
			}
		}
	}
};

module.exports = _checkTypes;
