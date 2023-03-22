const $rand = require('..');

const _isInBetween = (mainNumber, num1, num2) => {
	return num1 <= mainNumber <= num2 || num1 >= mainNumber >= num2;
};

const TEST_FREQUENCY = 2000;

const _tester = {
	$rand: {
		int: {
			oneArgTester: (
				params,
				argMapper = (int) => [int],
				dynamicTestText = null,
				testFrequency = TEST_FREQUENCY
			) => {
				let [start, stop, step] = params;
				let arg;
				for (let ind = start; ind <= stop; ind += step) {
					[arg] = argMapper(ind, {
						start: params[0],
						stop: params[1],
						step: params[2],
					});
					test(
						dynamicTestText
							? dynamicTestText(arg)
							: `0 <= fn(${arg}) <= ${arg}`,
						() => {
							for (let x = 0; x < testFrequency; x++) {
								expect(_isInBetween($rand.int(arg), 0, arg));
							}
						}
					);
				}
			},
			twoArgTester: (
				params,
				argMapper,
				dynamicTestText,
				testFrequency = TEST_FREQUENCY
			) => {
				let [start, stop, step] = params;
				let arg1, arg2;
				for (let ind = start; ind <= stop; ind += step) {
					[arg1, arg2] = argMapper(ind, {
						start: params[0],
						stop: params[1],
						step: params[2],
					});
					test(
						dynamicTestText
							? dynamicTestText(arg1, arg2)
							: `${arg1} <= fn(${arg1}, ${arg2}) <= ${arg2}`,
						() => {
							for (let x = 0; x < testFrequency; x++) {
								expect(_isInBetween($rand.int(arg1, arg2), arg1, arg2)).toBe(
									true
								);
							}
						}
					);
				}
			},
		},
	},
};

describe('$rand.int function', () => {
	describe('{0} args', () => {
		test('fn() should throw an error', () => {
			expect(() => $rand.int()).toThrow(
				new Error('Please provide at least one argument')
			);
		});
	});
	describe('{1} arg', () => {
		let start, stop, step;
		describe('arg is +ve', () => {
			_tester.$rand.int.oneArgTester([15, 95, 10]);
		});
		describe('arg is 0', () => {
			test('fn(0) should be 0', () => {
				expect($rand.int(0)).toBe(0);
			});
		});
		describe('arg is -ve', () => {
			_tester.$rand.int.oneArgTester(
				[-95, -15, 10],
				(int) => [int],
				(arg) => `${arg} <= fn(${arg}) <= 0`
			);
		});
	});
	describe('{2} args', () => {
		describe('arg1 < arg2', () => {
			describe('arg1 is +ve & arg2 is +ve', () => {
				_tester.$rand.int.twoArgTester(
					[15, 95, 10], // [start, stop, step]
					(ind, { step }) => [ind, ind + step] // argMapper
				);
			});
			describe('arg1 is -ve & arg2 is +ve', () => {
				_tester.$rand.int.twoArgTester(
					[-95, -15, 10], // [start, stop, step]
					(ind, { start, step }) => [ind, ind - start + step] // argMapper
				);
			});
			describe('arg1 is -ve & arg2 is -ve', () => {
				_tester.$rand.int.twoArgTester(
					[-95, -15, 10], // [start, stop, step]
					(ind, { step }) => [ind, ind + step]
				);
			});
		});
		describe('arg1 = arg2', () => {
			describe('args are +ve', () => {
				_tester.$rand.int.twoArgTester(
					[15, 95, 10], // [start, stop, step]
					(ind) => [ind, ind],
					(arg1, arg2) => `fn(${arg1}, ${arg2}) should be ${arg1}`
				);
			});
			describe('args are -ve', () => {
				_tester.$rand.int.twoArgTester(
					[-95, -15, 10], // [start, stop, step]
					(ind) => [ind, ind],
					(arg1, arg2) => `fn(${arg1}, ${arg2}) should be ${arg1}`
				);
			});
		});
		describe('arg1 > arg2', () => {
			describe('arg1 is +ve & arg2 is +ve', () => {
				_tester.$rand.int.twoArgTester(
					[15, 95, 10], // [start, stop, step]
					(ind, { step }) => [ind + step, ind] // argMapper
				);
			});
			describe('arg1 is +ve & arg2 is -ve', () => {
				_tester.$rand.int.twoArgTester(
					[15, 95, 10], // [start, stop, step]
					(ind, { step, stop }) => [ind, ind - stop - step] // argMapper
				);
			});
			describe('arg1 is -ve & arg2 is -ve', () => {
				_tester.$rand.int.twoArgTester(
					[-95, -15, 10], // [start, stop, step]
					(ind, { step }) => [ind + step, ind] // argMapper
				);
			});
		});
	});
});
