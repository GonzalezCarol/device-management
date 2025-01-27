import React from "react";
import '@testing-library/jest-dom'
import {render, screen, fireEvent} from '@testing-library/react';
import {Button} from '../index.jsx';

describe('Button component', () => {
	it('should render with label', () => {
		render(<Button label="Click Me" onClick={() => {
		}}/>);

		expect(screen.getByText('Click Me')).toBeVisible();
	});

	it('should render with icon', () => {
		const iconUrl = 'https://example.com/icon.png';
		render(<Button icon={iconUrl} onClick={() => {
		}}/>);

		const imgElement = screen.getByRole('img');
		expect(imgElement).toHaveAttribute('src', iconUrl);
		expect(imgElement).toHaveAttribute('alt', 'button-icon');
	});

	it('should call onClick when button is clicked', () => {
		const mockOnClick = jest.fn();
		render(<Button label="Click Me" onClick={mockOnClick}/>);

		fireEvent.click(screen.getByText('Click Me'));
		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});

	it('should apply correct styles for width, height, and colors', () => {
		const {container} = render(
			<Button
				label="Styled Button"
				onClick={() => {
				}}
				width={200}
				height={50}
				typeColor="outline"
				backGroundColor="blue"
				color="white"
			/>
		);

		const button = container.firstChild;
		expect(button).toHaveStyle('width: 200px');
		expect(button).toHaveStyle('height: 38px');
		expect(button).toHaveStyle('background-color: blue');
		expect(button).toHaveStyle('color: white');
	});
});
