import React from 'react';
import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import {Dropdown} from '../index.jsx';

jest.mock('../../../assets/arrow-down.svg', () => 'mocked-arrow-down');

describe('Dropdown', () => {
	const mockOnChange = jest.fn();

	const defaultProps = {
		placeholder: 'Select an option',
		label: 'Label',
		onChange: mockOnChange,
		options: ['Option 1', 'Option 2', 'Option 3'],
		selectedValue: 'Option 1',
		name: 'dropdown',
		width: 200,
		top: 10,
	};

	beforeEach(() => {
		mockOnChange.mockClear();
	});

	it('should render the Dropdown component', () => {
		render(<Dropdown {...defaultProps} />);
		expect(screen.getByText('Label')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Select an option')).toBeInTheDocument();
	});

	it('should toggle the dropdown when the arrow icon is clicked', () => {
		render(<Dropdown {...defaultProps} />);

		const arrowIcon = screen.getByAltText('arrow-down');
		fireEvent.click(arrowIcon);

		expect(screen.getByRole('list')).toBeInTheDocument();

		fireEvent.click(arrowIcon);
		expect(screen.queryByRole('list')).not.toBeInTheDocument();
	});

	it('should call onChange with the selected option when an option is clicked', () => {
		render(<Dropdown {...defaultProps} />);

		const arrowIcon = screen.getByAltText('arrow-down');
		fireEvent.click(arrowIcon);

		const option = screen.getByText('Option 1');
		fireEvent.click(option);

		expect(mockOnChange).toHaveBeenCalledWith({
			type: 'Option 1',
			name: 'dropdown',
		});
	});

	it('should display "No options available" when no options are passed', () => {
		const noOptionsProps = {...defaultProps, options: []};

		render(<Dropdown {...noOptionsProps} />);

		const arrowIcon = screen.getByAltText('arrow-down');
		fireEvent.click(arrowIcon);

		expect(screen.getByText('No options available')).toBeInTheDocument();
	});

	it('should correctly handle an empty selectedValue or placeholder', () => {
		const propsWithoutValue = {...defaultProps, selectedValue: ''};
		render(<Dropdown {...propsWithoutValue} />);
		expect(screen.getByPlaceholderText('Select an option')).toBeInTheDocument();

		const propsWithEmptyPlaceholder = {...defaultProps, placeholder: ''};
		render(<Dropdown {...propsWithEmptyPlaceholder} />);
		expect(screen.getByPlaceholderText('')).toBeInTheDocument();
	});
});
