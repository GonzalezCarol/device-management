import React from "react";
import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import {SuspendedMenu} from '../index.jsx';

describe('SuspendedMenu', () => {
	const mockOnClick = jest.fn();

	const mockDevice = {
		id: 'device-123',
		system_name: 'device-system'
	};

	const mockOptions = [
		{id: 1, name: 'Option 1', color: 'red'},
		{id: 2, name: 'Option 2', color: 'green'},
		{id: 3, name: 'Option 3', color: 'blue'},
	];

	it('renders options correctly', () => {
		render(
			<SuspendedMenu
				options={mockOptions}
				device={mockDevice}
				onClick={mockOnClick}
			/>
		);

		mockOptions.forEach(option => {
			expect(screen.getByText(option.name)).toBeInTheDocument();
		});
	});

	it('calls onClick with correct arguments when an option is clicked', () => {
		render(
			<SuspendedMenu
				options={mockOptions}
				device={mockDevice}
				onClick={mockOnClick}
			/>
		);

		const option1Button = screen.getByText(mockOptions[0].name);
		fireEvent.click(option1Button);

		expect(mockOnClick).toHaveBeenCalledWith(mockDevice.id, mockOptions[0].name, mockDevice.system_name);
	});
});
