import {renderHook, act} from '@testing-library/react';
import {useDropdown} from '../index.js';

describe('useDropdown Hook', () => {

	test('should return initial selectedDropdowns with empty strings for deviceType and sortBy', () => {
		const {result} = renderHook(() => useDropdown());

		expect(result.current.selectedDropdowns.deviceType).toBe('');
		expect(result.current.selectedDropdowns.sortBy).toBe('');
	});

	test('should update deviceType when handleDropdownChange is called for deviceType', () => {
		const {result} = renderHook(() => useDropdown());

		act(() => {
			result.current.handleDropdownChange('deviceType', 'laptop');
		});

		expect(result.current.selectedDropdowns.deviceType).toBe('laptop');
		expect(result.current.selectedDropdowns.sortBy).toBe('');
	});

	test('should update sortBy when handleDropdownChange is called for sortBy', () => {
		const {result} = renderHook(() => useDropdown());

		act(() => {
			result.current.handleDropdownChange('sortBy', 'price');
		});

		expect(result.current.selectedDropdowns.deviceType).toBe('');
		expect(result.current.selectedDropdowns.sortBy).toBe('price');
	});

	test('should update both deviceType and sortBy independently', () => {
		const {result} = renderHook(() => useDropdown());

		act(() => {
			result.current.handleDropdownChange('deviceType', 'laptop');
		});
		expect(result.current.selectedDropdowns.deviceType).toBe('laptop');
		expect(result.current.selectedDropdowns.sortBy).toBe('');

		act(() => {
			result.current.handleDropdownChange('sortBy', 'price');
		});
		expect(result.current.selectedDropdowns.deviceType).toBe('laptop');
		expect(result.current.selectedDropdowns.sortBy).toBe('price');
	});

	test('should preserve other values when one dropdown is changed', () => {
		const {result} = renderHook(() => useDropdown());

		act(() => {
			result.current.handleDropdownChange('deviceType', 'laptop');
		});

		act(() => {
			result.current.handleDropdownChange('sortBy', 'price');
		});


		act(() => {
			result.current.handleDropdownChange('deviceType', 'tablet');
		});

		expect(result.current.selectedDropdowns.deviceType).toBe('tablet');
		expect(result.current.selectedDropdowns.sortBy).toBe('price');
	});
});
