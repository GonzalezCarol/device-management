import React from 'react';
import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import {IconButtonComponent} from '../index.jsx';

jest.mock('../../../assets/dot-icon.svg', () => 'mocked-icon');

describe('IconButtonComponent', () => {
	const mockOnClick = jest.fn();

	it('should render the button with label and icon', () => {
		render(<IconButtonComponent label="Click me" icon="mocked-icon" onClick={mockOnClick}/>);
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
		expect(screen.getByText('Click me')).toBeInTheDocument();
		expect(screen.getByAltText('icon')).toHaveAttribute('src', 'mocked-icon');
	});

	it('should call onClick when button is clicked', () => {
		render(<IconButtonComponent label="Click me" icon="mocked-icon" onClick={mockOnClick}/>);
		fireEvent.click(screen.getByRole('button'));
		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});

	it('should render the button with only label if no icon is provided', () => {
		render(<IconButtonComponent label="Click me" onClick={mockOnClick}/>);
		expect(screen.getByText('Click me')).toBeInTheDocument();
		expect(screen.queryByAltText('icon')).not.toBeInTheDocument();
	});
});
