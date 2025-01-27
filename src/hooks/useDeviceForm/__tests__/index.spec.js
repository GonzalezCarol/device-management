import {renderHook, act, waitFor} from '@testing-library/react';
import {useDeviceForm} from '../../useDeviceForm';
import {useDeviceDetail} from '../../apiHooks/useDeviceDetail';
import {useDeviceUpdate} from '../../apiHooks/useDeviceUpdate';
import {useCreateDevice} from '../../apiHooks/useCreateDevice';
import {validateForm} from '../../useValidateForm';

jest.mock('../../apiHooks/useDeviceDetail');
jest.mock('../../apiHooks/useDeviceUpdate');
jest.mock('../../apiHooks/useCreateDevice');
jest.mock('../../useValidateForm');

const deviceData = {
	id: 1,
	system_name: 'Device A',
	type: 'laptop',
	hdd_capacity: 500,
};

describe('useDeviceForm', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should initialize form with empty data when no deviceId is provided', () => {
		useDeviceDetail.mockReturnValue({
			data: undefined,
		});

		useCreateDevice.mockReturnValue({
			mutateAsync: jest.fn(),
		});
		useDeviceUpdate.mockReturnValue({
			mutateAsync: jest.fn(),
		});

		const {result} = renderHook(() => useDeviceForm());

		expect(result.current.formData).toEqual({
			system_name: '',
			type: '',
			hdd_capacity: '',
		});
	});

	test('should call updateDevice when deviceId is provided', async () => {
		const mockUpdateDevice = jest.fn();

		useDeviceUpdate.mockReturnValue({
			mutateAsync: mockUpdateDevice
		});

		useDeviceDetail.mockReturnValue({
			data: deviceData,
			isLoading: false,
			isError: false,
		});

		const {result} = renderHook(() => useDeviceForm(1));

		expect(result.current.formData).toEqual({
			system_name: 'Device A',
			type: 'laptop',
			hdd_capacity: '500',
		});

		act(() => {
			result.current.onChangeTextField({target: {name: 'system_name', value: 'Updated Device'}});
			result.current.onChangeTextField({target: {name: 'hdd_capacity', value: '1024'}});
			result.current.onChangeDropdown({name: 'type', type: 'desktop'});
		});

		await act(async () => {
			await result.current.handleSubmit();
		});

		expect(mockUpdateDevice).toHaveBeenCalledWith({
			id: 1,
			system_name: 'Updated Device',
			hdd_capacity: '1024',
			type: 'desktop',
		});
	});

	test('should call createDevice when deviceId is not provided', async () => {
		const mockCreateDevice = jest.fn();
		useCreateDevice.mockReturnValue({mutateAsync: mockCreateDevice});

		const {result} = renderHook(() => useDeviceForm());

		act(() => {
			result.current.onChangeTextField({target: {name: 'system_name', value: 'New Device'}});
			result.current.onChangeTextField({target: {name: 'hdd_capacity', value: '1000'}});
			result.current.onChangeDropdown({name: 'type', type: 'tablet'});
		});

		await act(async () => {
			await result.current.handleSubmit();
		});

		expect(mockCreateDevice).toHaveBeenCalledWith({
			system_name: 'New Device',
			hdd_capacity: '1000',
			type: 'tablet',
		});
	});

	test('should set formErrors when validation fails', async () => {
		const mockValidationErrors = {
			system_name: 'System name is required',
			type: 'Type is required',
			hdd_capacity: 'HDD capacity is required',
		};

		validateForm.mockReturnValue(mockValidationErrors);

		const {result} = renderHook(() => useDeviceForm());

		act(() => {
			result.current.onChangeTextField({target: {name: 'system_name', value: ''}});
			result.current.onChangeTextField({target: {name: 'hdd_capacity', value: ''}});
			result.current.onChangeDropdown({name: 'type', type: ''});
		});

		const submitResult = await result.current.handleSubmit();

		await waitFor(() => {
			expect(submitResult.status).toBe('formInvalid');
			expect(result.current.formErrors).toEqual(mockValidationErrors);
		})
	});

	test('should clear form when clearForm is called', async () => {
		const {result} = renderHook(() => useDeviceForm());

		act(() => {
			result.current.onChangeTextField({target: {name: 'system_name', value: 'Device B'}});
			result.current.onChangeTextField({target: {name: 'hdd_capacity', value: '500'}});
			result.current.onChangeDropdown({name: 'type', type: 'desktop'});
		});

		act(() => {
			result.current.clearForm();
		});

		expect(result.current.formData).toEqual({
			system_name: '',
			type: '',
			hdd_capacity: '',
		});
	});
});
