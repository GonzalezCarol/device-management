import {renderHook, act} from '@testing-library/react';
import {useRefreshFilter} from '../index.js';

describe('useRefreshFilter Hook', () => {
	let handleSearchChange;
	let handleDropdownChange;

	beforeEach(() => {

		handleSearchChange = jest.fn();
		handleDropdownChange = jest.fn();
	});

	test('should return initial refreshFilters as false', () => {
		const {result} = renderHook(() =>
			useRefreshFilter(handleSearchChange, handleDropdownChange)
		);

		expect(result.current.refreshFilters).toBe(false);
	});

	test('should call handleSearchChange and handleDropdownChange when refreshFilters is set to true', () => {
		const {result} = renderHook(() =>
			useRefreshFilter(handleSearchChange, handleDropdownChange)
		);

		act(() => {
			result.current.handleRefreshChange(true);
		});

		expect(handleSearchChange).toHaveBeenCalledWith({target: {value: ''}});

		expect(handleDropdownChange).toHaveBeenCalledWith('deviceType', {
			type: '',
			value: '',
		});

		expect(handleDropdownChange).toHaveBeenCalledWith('sortBy', {
			type: '',
			value: '',
		});

		expect(result.current.refreshFilters).toBe(false);
	});

	test('should not call handleSearchChange or handleDropdownChange if refreshFilters is false', () => {
		const {result} = renderHook(() =>
			useRefreshFilter(handleSearchChange, handleDropdownChange)
		);


		act(() => {
			result.current.handleRefreshChange(false);
		});

		expect(handleSearchChange).not.toHaveBeenCalled();
		expect(handleDropdownChange).not.toHaveBeenCalled();
	});

	test('should reset filters correctly on multiple calls', () => {
		const {result} = renderHook(() =>
			useRefreshFilter(handleSearchChange, handleDropdownChange)
		);

		act(() => {
			result.current.handleRefreshChange(true);
		});

		expect(handleSearchChange).toHaveBeenCalledWith({target: {value: ''}});
		expect(handleDropdownChange).toHaveBeenCalledWith('deviceType', {
			type: '',
			value: '',
		});
		expect(handleDropdownChange).toHaveBeenCalledWith('sortBy', {
			type: '',
			value: '',
		});

		expect(result.current.refreshFilters).toBe(false);

		act(() => {
			result.current.handleRefreshChange(true);
		});

		expect(handleSearchChange).toHaveBeenCalledTimes(2);
		expect(handleDropdownChange).toHaveBeenCalledTimes(4);
	});
});
