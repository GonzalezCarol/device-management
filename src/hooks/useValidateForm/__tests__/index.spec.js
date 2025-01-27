import {validateForm} from "../index.jsx";

describe('Validation Rules', () => {
	const runValidationTest = (field, value, expectedError) => {
		const formData = {
			system_name: field === 'system_name' ? value : 'My System',
			type: field === 'type' ? value : 'laptop',
			hdd_capacity: field === 'hdd_capacity' ? value : '500',
		};

		const result = validateForm(formData);
		expect(result[field]).toBe(expectedError);
	};

	test('should return error message if system_name is empty', () => {
		runValidationTest('system_name', '', 'System name is required.');
	});

	test('should not return error if system_name is provided', () => {
		runValidationTest('system_name', 'My System', undefined);
	});

	test('should return error message if type is empty', () => {
		runValidationTest('type', '', 'Type is required.');
	});

	test('should not return error if type is provided', () => {
		runValidationTest('type', 'laptop', undefined);
	});

	test('should return error message if hdd_capacity is empty', () => {
		runValidationTest('hdd_capacity', '', 'HDD capacity is required.');
	});

	test('should not return error if hdd_capacity is provided', () => {
		runValidationTest('hdd_capacity', '500', undefined);
	});

	test('should return errors for all fields if all fields are empty', () => {
		const formData = {
			system_name: '',
			type: '',
			hdd_capacity: '',
		};

		const result = validateForm(formData);
		expect(result.system_name).toBe('System name is required.');
		expect(result.type).toBe('Type is required.');
		expect(result.hdd_capacity).toBe('HDD capacity is required.');
	});

	test('should return no errors if all fields are valid', () => {
		const formData = {
			system_name: 'My System',
			type: 'laptop',
			hdd_capacity: '500',
		};

		const result = validateForm(formData);
		expect(result.system_name).toBeUndefined();
		expect(result.type).toBeUndefined();
		expect(result.hdd_capacity).toBeUndefined();
	});
});
