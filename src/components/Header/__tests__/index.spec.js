import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {Header} from '../index.jsx';

jest.mock('../../../assets/ninja-one.svg', () => 'mocked-ninja-logo');

describe('Header', () => {
	it('should render the header with the mocked logo', () => {
		render(<Header/>);
		const logoImage = screen.getByAltText('Logo');
		expect(logoImage).toBeInTheDocument();
		expect(logoImage).toHaveAttribute('src', 'mocked-ninja-logo');
	});
});
