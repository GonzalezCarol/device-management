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
		options: ['Mac', 'Linux', 'Windows'],
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
		expect(screen.getByText('Mac')).toBeInTheDocument();
		expect(screen.getByText('Linux')).toBeInTheDocument();
		expect(screen.getByText('Windows')).toBeInTheDocument();
	});

	it('should handle selecting and deselecting options', () => {
		render(<DropdownMultiple {...defaultProps} />);
		const textField = screen.getByPlaceholderText('Select...');
		fireEvent.click(textField);
		const macOption = screen.getByText('Mac');
		fireEvent.click(macOption);
		expect(handleChange).toHaveBeenCalledWith(['Mac'], 'deviceType');
		fireEvent.click(macOption);
		expect(handleChange).toHaveBeenCalledWith([], 'deviceType');
	});

	it('should update selected value correctly when multiple options are selected', () => {
		render(<DropdownMultiple {...defaultProps} />);
		const textField = screen.getByPlaceholderText('Select...');
		fireEvent.click(textField);
		const macOption = screen.getByText('Mac');
		const linuxOption = screen.getByText('Linux');
		fireEvent.click(macOption);
		fireEvent.click(linuxOption);
		expect(handleChange).toHaveBeenCalledWith(['Mac', 'Linux'], 'deviceType');
		fireEvent.click(macOption);
		expect(handleChange).toHaveBeenCalledWith(['Linux'], 'deviceType');
	});
});
