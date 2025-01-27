import {renderHook, act} from '@testing-library/react';
import {useDevicesFilter} from '../index.jsx';

describe('useDevicesFilter', () => {
	const devicesData = [
		{id: 1, system_name: 'Device A', hdd_capacity: 500, type: 'laptop'},
		{id: 2, system_name: 'Device B', hdd_capacity: 256, type: 'desktop'},
		{id: 3, system_name: 'Device C', hdd_capacity: 1024, type: 'tablet'},
	];

	test('should return filtered devices based on search value', () => {
		const filterValue = [{type: 'textfield', value: 'Device A'}];
		const {result} = renderHook(() => useDevicesFilter(filterValue, devicesData));

		expect(result.current.filteredDevices).toEqual([devicesData[0]]);
	});

	test('should filter devices by deviceType using dropdown filter', () => {
		const filterValue = [{type: 'dropdown', value: 'laptop', dropdownKey: 'deviceType'}];
		const {result} = renderHook(() => useDevicesFilter(filterValue, devicesData));

		expect(result.current.filteredDevices).toEqual([devicesData[0]]);
	});

	test('should return all devices when deviceType is "ALL"', () => {
		const filterValue = [{type: 'dropdown', value: 'ALL', dropdownKey: 'deviceType'}];
		const {result} = renderHook(() => useDevicesFilter(filterValue, devicesData));

		expect(result.current.filteredDevices).toEqual(devicesData);
	});

	test('should sort devices by HDD Capacity ascending', () => {
		const filterValue = [{type: 'dropdown', value: 'HDD Capacity (Ascending)', dropdownKey: 'sortBy'}];
		const {result} = renderHook(() => useDevicesFilter(filterValue, devicesData));

		expect(result.current.filteredDevices).toEqual([devicesData[1], devicesData[0], devicesData[2]]);
	});

	test('should sort devices by HDD Capacity descending', () => {
		const filterValue = [{type: 'dropdown', value: 'HDD Capacity (Descending)', dropdownKey: 'sortBy'}];
		const {result} = renderHook(() => useDevicesFilter(filterValue, devicesData));

		expect(result.current.filteredDevices).toEqual([devicesData[2], devicesData[0], devicesData[1]]);
	});

	test('should sort devices by Name ascending', () => {
		const filterValue = [{type: 'dropdown', value: 'Name (Ascending)', dropdownKey: 'sortBy'}];
		const {result} = renderHook(() => useDevicesFilter(filterValue, devicesData));

		expect(result.current.filteredDevices).toEqual([devicesData[0], devicesData[1], devicesData[2]]);
	});

	test('should sort devices by Name descending', () => {
		const filterValue = [{type: 'dropdown', value: 'Name (Descending)', dropdownKey: 'sortBy'}];
		const {result} = renderHook(() => useDevicesFilter(filterValue, devicesData));

		expect(result.current.filteredDevices).toEqual([devicesData[2], devicesData[1], devicesData[0]]);
	});

	test('should memoize filtered devices when no changes occur', () => {
		const filterValue = [{type: 'textfield', value: 'Device'}];
		const {result, rerender} = renderHook(() => useDevicesFilter(filterValue, devicesData));

		const initialFilteredDevices = result.current.filteredDevices;

		rerender();
		expect(result.current.filteredDevices).toBe(initialFilteredDevices);
	});

	test('should recompute filtered devices when filterValue changes', () => {
		let filterValue = [{type: 'textfield', value: 'Device'}];

		const {result, rerender} = renderHook(() => useDevicesFilter(filterValue, devicesData));

		const initialFilteredDevices = result.current.filteredDevices;

		act(() => {
			filterValue = [{type: 'textfield', value: 'Device A'}];
		});

		rerender();

		expect(result.current.filteredDevices).not.toEqual(initialFilteredDevices);
	});
});
