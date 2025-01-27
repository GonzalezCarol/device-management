import {renderHook, act} from '@testing-library/react';
import {useSearch} from '../index.js';

describe('useSearch hook', () => {
	test('should return initial searchValue as an empty string', () => {
		const {result} = renderHook(() => useSearch());

		expect(result.current.searchValue).toBe('');
	});

	test('should update searchValue when handleSearchChange is called', () => {
		const {result} = renderHook(() => useSearch());

		act(() => {
			result.current.handleSearchChange({target: {value: 'new search'}});
		});

		expect(result.current.searchValue).toBe('new search');
	});

	test('should update searchValue with different inputs', () => {
		const {result} = renderHook(() => useSearch());

		act(() => {
			result.current.handleSearchChange({target: {value: 'first search'}});
		});
		expect(result.current.searchValue).toBe('first search');

		act(() => {
			result.current.handleSearchChange({target: {value: 'second search'}});
		});
		expect(result.current.searchValue).toBe('second search');
	});
});
