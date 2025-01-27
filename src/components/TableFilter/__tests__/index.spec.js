import React from "react";
import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import {TableFilter} from '../index.jsx';
import {useMainProps} from '../../../contexts/MainContext';
import {optionsDeviceType} from "../../../utils/deviceTypeOptions/index.js";

jest.mock('../../../utils/deviceTypeOptions/index.js', () => ({
	optionsDeviceType: jest.fn(),
}));

jest.mock('../../../assets/search-icon.svg', () => 'mocked-search-icon');
jest.mock('../../../assets/refresh-icon.svg', () => 'mocked-refresh-icon');
jest.mock('../../../assets/arrow-down.svg', () => 'mocked-arrow-icon');

jest.mock('../../../contexts/MainContext', () => ({
	useMainProps: jest.fn(),
}));

jest.mock('../../../consts/index.js', () => ({
	OPTIONS_SORT_BY: [
		'HDD Capacity (Descending)',
		'HDD Capacity (Ascending)',
		'System Name (A-Z)',
		'System Name (Z-A)'
	]
}));

describe('TableFilter', () => {
	const mockHandleDropdownChange = jest.fn();
	const mockHandleRefreshChange = jest.fn();

	const mockDevices = [
		{id: '1', system_name: 'Device 1', type: 'laptop', hdd_capacity: 512},
		{id: '2', system_name: 'Device 2', type: 'desktop', hdd_capacity: 1024},
	];

	beforeEach(() => {
		useMainProps.mockReturnValue({
			devicesData: mockDevices,
			selectedDropdowns: {
				deviceType: {type: 'laptop'},
				sortBy: {type: 'hdd_capacity'},
			},
			handleDropdownChange: mockHandleDropdownChange,
			handleRefreshChange: mockHandleRefreshChange,
		});

		optionsDeviceType.mockReturnValue([
			'All',
			'Windows',
			'Mac',
			'Linux',
		]);
	});

	it('renders the filters correctly', () => {
		render(<TableFilter/>);

		expect(screen.getByPlaceholderText('Device Type: All')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Sort by: HDD Capacity (Descending)')).toBeInTheDocument();
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('renders the correct options in the device type dropdown', () => {
		render(<TableFilter/>);

		const dropdownOptions = screen.getAllByText(/All|Windows|Mac|Linux/);

		expect(dropdownOptions.length).toBe(4);

		expect(dropdownOptions[0]).toHaveTextContent('All');
		expect(dropdownOptions[1]).toHaveTextContent('Windows');
		expect(dropdownOptions[2]).toHaveTextContent('Mac');
		expect(dropdownOptions[3]).toHaveTextContent('Linux');
	});

	it('calls handleRefreshChange when the refresh icon is clicked', () => {
		render(<TableFilter/>);

		const refreshButton = screen.getByRole('button');
		fireEvent.click(refreshButton);

		expect(mockHandleRefreshChange).toHaveBeenCalledWith(true);
	});
});
