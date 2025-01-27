import React from "react";
import '@testing-library/jest-dom';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {DeviceModal} from '../index.jsx';
import {useDeviceForm} from '../../../hooks/useDeviceForm';


jest.mock('../../../assets/arrow-down.svg', () => 'mocked-arrow-icon');

jest.mock('../../../hooks/useDeviceForm', () => ({
	useDeviceForm: jest.fn()
}));

jest.mock('../../Modal/index.jsx', () => ({
	Modal: jest.fn(({children}) => <div>{children}</div>)
}));

jest.mock('../../Button/index.jsx', () => ({
	Button: ({onClick, label}) => <button onClick={onClick}>{label}</button>
}));

describe('DeviceModal', () => {
	let mockOnClose;
	let mockHandleSubmit;

	beforeEach(() => {
		mockOnClose = jest.fn();
		mockHandleSubmit = jest.fn(() => ({status: 'success'}));

		useDeviceForm.mockReturnValue({
			formData: {
				system_name: '',
				type: '',
				hdd_capacity: ''
			},
			onChangeTextField: jest.fn(),
			onChangeDropdown: jest.fn(),
			handleSubmit: mockHandleSubmit,
			formErrors: {},
			clearForm: jest.fn(),
			setFormErrors: jest.fn()
		});
	});

	it('renders the modal when isDeviceModalOpen is true', () => {
		render(<DeviceModal isDeviceModalOpen={true} onClose={mockOnClose} devices={[]} deviceId="123"/>);

		expect(screen.getByText('Device type *')).toBeInTheDocument();
	});

	it('calls onClose when the Cancel button is clicked', () => {
		render(<DeviceModal isDeviceModalOpen={true} onClose={mockOnClose} devices={[]} deviceId="123"/>);

		fireEvent.click(screen.getByText('Cancel'));


		expect(mockOnClose).toHaveBeenCalled();
	});

	it('submits the form and closes the modal when Submit is clicked', async () => {
		render(<DeviceModal isDeviceModalOpen={true} onClose={mockOnClose} devices={[]} deviceId="123"/>);

		fireEvent.click(screen.getByText('Submit'));

		await waitFor(() => expect(mockHandleSubmit).toHaveBeenCalled());
		expect(mockOnClose).toHaveBeenCalled();
	});
});
