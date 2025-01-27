import React from "react";
import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import {Textfield} from '../index.jsx';

describe('Textfield', () => {
	const mockOnChange = jest.fn();

	it('renders with the correct label and value', () => {
		render(
			<Textfield
				type="text"
				label="Username"
				name="username"
				value="testuser"
				onChange={mockOnChange}
				isRequired={false}
			/>
		);

		const label = screen.getByText('Username');
		const input = screen.getByRole('textbox');

		expect(label).toBeInTheDocument();
		expect(input).toHaveValue('testuser');
	});

	it('displays a required indicator when isRequired is true', () => {
		render(
			<Textfield
				type="text"
				label="Email"
				name="email"
				value=""
				onChange={mockOnChange}
				isRequired={true}
			/>
		);

		const requiredSpan = screen.getByText('*');
		expect(requiredSpan).toBeInTheDocument();
	});

	it('does not display a required indicator when isRequired is false', () => {
		render(
			<Textfield
				type="text"
				label="Email"
				name="email"
				value=""
				onChange={mockOnChange}
				isRequired={false}
			/>
		);

		const requiredSpan = screen.queryByText('*');
		expect(requiredSpan).not.toBeInTheDocument();
	});

	it('calls onChange when the value changes', () => {
		render(
			<Textfield
				type="text"
				label="Username"
				name="username"
				value=""
				onChange={mockOnChange}
				isRequired={false}
			/>
		);

		const input = screen.getByRole('textbox');
		fireEvent.change(input, {target: {value: 'newuser'}});

		expect(mockOnChange).toHaveBeenCalledWith(expect.anything());
	});

});
