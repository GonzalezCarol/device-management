import React from "react";
import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import {Table} from '../index.jsx';
import {useMainProps} from "../../../contexts/MainContext/index.jsx";

jest.mock("../../../contexts/MainContext/index.jsx", () => ({
	useMainProps: jest.fn(),
}));

jest.mock("../../../assets/apple-icon.svg", () => 'mock-apple-icon');
jest.mock("../../../assets/linux-icon.svg", () => 'mock-linux-icon');
jest.mock("../../../assets/windows-icon.svg", () => 'mock-windows-icon');
jest.mock("../../../assets/dot-icon.svg", () => 'dot-icon');

describe('Table', () => {
	const mockSetShowMenu = jest.fn();
	const mockHandleOnClickSuspendedMenu = jest.fn();

	const mockDevices = [
		{id: '1', system_name: 'Device 1', type: 'laptop', hdd_capacity: 512},
		{id: '2', system_name: 'Device 2', type: 'desktop', hdd_capacity: 1024},
	];

	beforeEach(() => {
		useMainProps.mockReturnValue({
			filteredDevices: mockDevices,
		});
	});

	it('renders devices correctly', () => {
		render(
			<Table
				showMenu={null}
				setShowMenu={mockSetShowMenu}
				handleOnClickSuspendedMenu={mockHandleOnClickSuspendedMenu}
			/>
		);

		mockDevices.forEach(device => {
			expect(screen.getByText(device.system_name)).toBeInTheDocument();
			expect(screen.getByText(`${device.type.charAt(0).toUpperCase() + device.type.slice(1)} Workstation - ${device.hdd_capacity} GB`)).toBeInTheDocument();
		});
	});

	it('calls handleOnClickSuspendedMenu when an option is clicked', () => {
		render(
			<Table
				showMenu="1"
				setShowMenu={mockSetShowMenu}
				handleOnClickSuspendedMenu={mockHandleOnClickSuspendedMenu}
			/>
		);

		const menuOption = screen.getByText('Edit');
		fireEvent.click(menuOption);

		expect(mockHandleOnClickSuspendedMenu).toHaveBeenCalledWith("1", "Edit", "Device 1");
	});
});
