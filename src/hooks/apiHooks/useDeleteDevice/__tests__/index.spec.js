import React from "react";
import {renderHook, act, waitFor} from '@testing-library/react';
import axios from 'axios';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useDeleteDevice} from '../index.js';
import {API_URL} from "../../../../consts/index.js";

jest.mock('axios');

describe('useDeleteDevice', () => {
	const queryClient = new QueryClient();

	it('should delete device when request is successful', async () => {
		const mockDeviceId = 1;

		axios.delete.mockResolvedValueOnce({data: {message: 'Device deleted successfully'}});

		const {result} = renderHook(() => useDeleteDevice(), {
			wrapper: ({children}) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
		});

		act(() => {
			result.current.mutate(mockDeviceId);
		});

		await waitFor(() => result.current.isSuccess);

		expect(axios.delete).toHaveBeenCalledWith(`${API_URL}/devices/${mockDeviceId}`);
		expect(result.current.isSuccess).toBe(true);
	});

	it('should handle error when request fails', async () => {
		const mockDeviceId = 1;
		const errorMessage = 'Request failed with status 500: Internal Server Error';

		axios.delete.mockRejectedValueOnce(new Error(errorMessage));

		const {result} = renderHook(() => useDeleteDevice(), {
			wrapper: ({children}) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
		});

		act(() => {
			result.current.mutate(mockDeviceId);
		});

		await waitFor(() => result.current.isError);

		expect(result.current.error).toBeDefined();
		expect(result.current.error.message).toBe(errorMessage);
	});
});
