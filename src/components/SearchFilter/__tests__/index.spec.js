import React from 'react';
import '@testing-library/jest-dom';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {SearchFilter} from '../index.jsx';
import {useMainProps} from '../../../contexts/MainContext';

jest.mock('../../../assets/search-icon.svg', () => 'mocked-search-icon');
jest.mock('../../../contexts/MainContext', () => ({
	useMainProps: jest.fn(),
}));

describe('SearchFilter', () => {
	const mockHandleSearchChange = jest.fn();
	const mockSearchValue = 'test search';

	beforeEach(() => {
		useMainProps.mockReturnValue({
			handleSearchChange: mockHandleSearchChange,
			searchValue: mockSearchValue,
		});
		mockHandleSearchChange.mockClear();
	});

	it('should render the SearchFilter component', () => {
		render(<SearchFilter/>);
		expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
	});

	it('should display the search value in the input field', () => {
		render(<SearchFilter/>);
		expect(screen.getByPlaceholderText('Search')).toHaveValue(mockSearchValue);
	});

	it('should call handleSearchChange when input value changes', async () => {
		render(<SearchFilter/>);
		fireEvent.change(screen.getByPlaceholderText('Search'), {target: {value: 'new search'}});

		await waitFor(() => {
			expect(mockHandleSearchChange).toHaveBeenCalled();
		})
	});

	it('should render the search icon', () => {
		render(<SearchFilter/>);
		const searchIcon = screen.getByRole('img');
		expect(searchIcon).toHaveAttribute('src', 'mocked-search-icon');
	});
});
