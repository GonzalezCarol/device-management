import React from "react";
import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import {DeviceForm} from "../index.jsx";

jest.mock('../../../assets/arrow-down.svg', () => 'mocked-arrow-icon');

const mockFormData = {
	system_name: "Test Device",
	type: "Laptop",
	hdd_capacity: "512",
};

const mockFormErrors = {
	system_name: "System name is required",
	type: "Device type is required",
	hdd_capacity: "HDD capacity is required",
};

const mockOnChangeTextField = jest.fn();
const mockOnChangeDropdown = jest.fn();
const mockOptions = ["Laptop", "Desktop", "Tablet"];

describe("DeviceForm Component", () => {
	it("renders the form fields correctly", () => {
		render(
			<DeviceForm
				formData={mockFormData}
				options={mockOptions}
				onChangeTextField={mockOnChangeTextField}
				onChangeDropdown={mockOnChangeDropdown}
				formErrors={mockFormErrors}
			/>
		);
		expect(screen.getByTestId('system_name')).toBeInTheDocument();
		expect(screen.getByTestId('type')).toBeInTheDocument();
		expect(screen.getByTestId('hdd_capacity')).toBeInTheDocument();
	});

	it("displays the correct value in the input field", () => {
		render(
			<DeviceForm
				formData={mockFormData}
				options={mockOptions}
				onChangeTextField={mockOnChangeTextField}
				onChangeDropdown={mockOnChangeDropdown}
				formErrors={mockFormErrors}
			/>
		);

		const inputElement = screen.getByTestId('system_name');
		expect(inputElement.value).toBe("Test Device");
	});

	it("displays error messages for invalid fields", () => {
		render(
			<DeviceForm
				formData={mockFormData}
				options={mockOptions}
				onChangeTextField={mockOnChangeTextField}
				onChangeDropdown={mockOnChangeDropdown}
				formErrors={mockFormErrors}
			/>
		);
		expect(screen.getByText(mockFormErrors.system_name)).toBeInTheDocument();
		expect(screen.getByText(mockFormErrors.type)).toBeInTheDocument();
		expect(screen.getByText(mockFormErrors.hdd_capacity)).toBeInTheDocument();
	});

	it("does not display error messages if no errors exist", () => {
		render(
			<DeviceForm
				formData={mockFormData}
				options={mockOptions}
				onChangeTextField={mockOnChangeTextField}
				onChangeDropdown={mockOnChangeDropdown}
				formErrors={{}}
			/>
		);
		expect(screen.queryByText(mockFormErrors.system_name)).toBeNull();
		expect(screen.queryByText(mockFormErrors.type)).toBeNull();
		expect(screen.queryByText(mockFormErrors.hdd_capacity)).toBeNull();
	});
});
