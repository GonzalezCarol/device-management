import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {DropdownMultiple} from '../index.jsx';

jest.mock('../../../assets/arrow-down.svg', () => 'mocked-arrow-icon');

describe('DropdownMultiple Component', () => {
	const handleChange = jest.fn();

	const defaultProps = {
		id: 'dropdown',
		label: 'Select Options',
		placeholder: 'Select...',
		onChange: handleChange,
		options: ['MAC', 'LINUX', 'WINDOWS'],
		selectedValue: [],
		name: 'deviceType',
		width: 200,
		top: 0,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should render the dropdown and display options', () => {
		render(<DropdownMultiple {...defaultProps} />);
		const label = screen.getByText('Select Options');
		const textField = screen.getByPlaceholderText('Select...');
		expect(label).toBeInTheDocument();
		expect(textField).toBeInTheDocument();
		fireEvent.click(textField);
		expect(screen.getByText('MAC')).toBeInTheDocument();
		expect(screen.getByText('LINUX')).toBeInTheDocument();
		expect(screen.getByText('WINDOWS')).toBeInTheDocument();
	});

	it('should handle selecting and deselecting options', () => {
		render(<DropdownMultiple {...defaultProps} />);
		const textField = screen.getByPlaceholderText('Select...');
		fireEvent.click(textField);
		const macOption = screen.getByText('MAC');
		fireEvent.click(macOption);
		expect(handleChange).toHaveBeenCalledWith(['MAC'], 'deviceType');
		fireEvent.click(macOption);
		expect(handleChange).toHaveBeenCalledWith([], 'deviceType');
	});

	it('should update selected value correctly when multiple options are selected', () => {
		render(<DropdownMultiple {...defaultProps} />);
		const textField = screen.getByPlaceholderText('Select...');
		fireEvent.click(textField);
		const macOption = screen.getByText('MAC');
		const linuxOption = screen.getByText('LINUX');
		fireEvent.click(macOption);
		fireEvent.click(linuxOption);
		expect(handleChange).toHaveBeenCalledWith(['MAC', 'LINUX'], 'deviceType');
		fireEvent.click(macOption);
		expect(handleChange).toHaveBeenCalledWith(['LINUX'], 'deviceType');
	});
});
