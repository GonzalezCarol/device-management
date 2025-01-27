import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DeleteDeviceModal } from "../index.jsx";
import { useDeleteDevice } from "../../../hooks/apiHooks/useDeleteDevice/index.js";

jest.mock('../../../assets/close-icon.svg', () => 'mocked-close-icon');
jest.mock("../../../hooks/apiHooks/useDeleteDevice/index.js", () => ({
	useDeleteDevice: jest.fn(),
}));

describe("DeleteDeviceModal", () => {
	const mockOnClose = jest.fn();
	const mockDeviceInfo = { deviceId: "123", deviceName: "Test Device" };

	beforeEach(() => {
		useDeleteDevice.mockReturnValue({
			mutateAsync: jest.fn().mockResolvedValue(true),
		});
	});

	it("renders correctly when modal is open", () => {
		render(
			<DeleteDeviceModal
				isDeviceDeleteModalOpen={true}
				onClose={mockOnClose}
				deviceInfo={mockDeviceInfo}
			/>
		);

		expect(screen.getByText('Delete device?')).toBeVisible();
		expect(screen.queryAllByText((content, element) =>
			element?.textContent.includes('You are about to delete the device')
		)).toHaveLength(6);
	});

	it("closes the modal when 'Cancel' button is clicked", () => {
		render(
			<DeleteDeviceModal
				isDeviceDeleteModalOpen={true}
				onClose={mockOnClose}
				deviceInfo={mockDeviceInfo}
			/>
		);
		fireEvent.click(screen.getByText(/Cancel/));
		expect(mockOnClose).toHaveBeenCalledTimes(1);
	});

	it("calls deleteDevice and closes the modal when 'Delete' button is clicked", async () => {
		const mockDeleteDevice = jest.fn();
		useDeleteDevice.mockReturnValue({
			mutateAsync: mockDeleteDevice.mockResolvedValue(true),
		});

		render(
			<DeleteDeviceModal
				isDeviceDeleteModalOpen={true}
				onClose={mockOnClose}
				deviceInfo={mockDeviceInfo}
			/>
		);

		fireEvent.click(screen.getByText('Delete'));

		await waitFor(() => expect(mockDeleteDevice).toHaveBeenCalledWith(mockDeviceInfo.deviceId));
		expect(mockOnClose).toHaveBeenCalled();
	});

	it("does not call deleteDevice when deviceId is not provided", async () => {
		const mockDeleteDevice = jest.fn();
		useDeleteDevice.mockReturnValue({
			mutateAsync: mockDeleteDevice.mockResolvedValue(true),
		});

		render(
			<DeleteDeviceModal
				isDeviceDeleteModalOpen={true}
				onClose={mockOnClose}
				deviceInfo={{ deviceId: null, deviceName: "Test Device" }}
			/>
		);

		fireEvent.click(screen.getByText('Delete'));

		expect(mockDeleteDevice).not.toHaveBeenCalled();
		expect(mockOnClose).toHaveBeenCalled();
	});

	it("does not render anything when modal is closed", () => {
		render(
			<DeleteDeviceModal
				isDeviceDeleteModalOpen={false}
				onClose={mockOnClose}
				deviceInfo={mockDeviceInfo}
			/>
		);

		expect(screen.queryByText(/Delete device?/)).not.toBeInTheDocument();
		expect(screen.queryByText(/Test Device/)).not.toBeInTheDocument();
	});
});
