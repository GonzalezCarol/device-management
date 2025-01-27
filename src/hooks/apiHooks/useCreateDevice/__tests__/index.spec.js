import React from "react";
import {renderHook, waitFor} from '@testing-library/react';
import axios from 'axios';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useCreateDevice} from '../index.js';
import {API_URL} from "../../../../consts/index.js";

jest.mock('axios');

describe('useCreateDevice', () => {
	const queryClient = new QueryClient();

	it('should create a device successfully', async () => {
		const mockDevice = {system_name: 'Device 1', type: 'laptop', hdd_capacity: 500};
		const mockResponse = {id: 1, ...mockDevice};

		axios.post.mockResolvedValueOnce({data: mockResponse});

		const {result} = renderHook(() => useCreateDevice(), {
			wrapper: ({children}) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
		});

		await result.current.mutateAsync(mockDevice);

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(axios.post).toHaveBeenCalledWith(`${API_URL}/devices`, mockDevice, {
			headers: {'Content-Type': 'application/json'},
		});
	});

	it('should handle error when creation fails', async () => {
		const errorMessage = 'Request failed with status 500: Internal Server Error';

		axios.post.mockRejectedValueOnce(new Error(errorMessage));

		const {result} = renderHook(() => useCreateDevice(), {
			wrapper: ({children}) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
		});

		let error = null;
		try {
			await result.current.mutateAsync({
				system_name: 'Device 1',
				type: 'laptop',
				hdd_capacity: 500,
			});
		} catch (err) {
			error = err;
		}

		await waitFor(() => {
			expect(error.message).toBe(errorMessage);
		});
	});
});
