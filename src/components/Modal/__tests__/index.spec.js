import React from 'react';
import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import {Modal} from '../index.jsx';

jest.mock('../../../assets/close-icon.svg', () => 'mocked-close-icon');

describe('Modal', () => {
	const mockOnClose = jest.fn();

	const defaultProps = {
		isModalOpen: true,
		onClose: mockOnClose,
		modalTitle: 'Test Modal',
		children: <div>Test Content</div>,
	};

	beforeEach(() => {
		mockOnClose.mockClear();
	});

	it('should render the modal when isModalOpen is true', () => {
		render(<Modal {...defaultProps} />);
		expect(screen.getByText('Test Modal')).toBeInTheDocument();
		expect(screen.getByText('Test Content')).toBeInTheDocument();
	});

	it('should not render the modal when isModalOpen is false', () => {
		render(<Modal {...defaultProps} isModalOpen={false}/>);
		expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
		expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
	});

	it('should call onClose when the overlay is clicked', () => {
		render(<Modal {...defaultProps} />);
		fireEvent.click(screen.getByRole('img'));
		expect(mockOnClose).toHaveBeenCalledTimes(1);
	});

	it('should call onClose when the close button is clicked', () => {
		render(<Modal {...defaultProps} />);
		fireEvent.click(screen.getByAltText('close'));
		expect(mockOnClose).toHaveBeenCalledTimes(1);
	});
});
