import React from 'react';
import {renderHook, act, waitFor} from '@testing-library/react';
import axios from 'axios';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useDeviceUpdate} from '../index.js';
import {API_URL} from "../../../../consts/index.js";

jest.mock('axios');

describe('useDeviceUpdate', () => {
	const queryClient = new QueryClient();

	it('should update device successfully and invalidate queries', async () => {
		const mockDevice = {id: 1, system_name: 'Updated Device', type: 'desktop', hdd_capacity: 1000};
		const mockResponse = {id: 1, system_name: 'Updated Device', type: 'desktop', hdd_capacity: 1000};

		axios.put.mockResolvedValueOnce({data: mockResponse});

		const {result} = renderHook(() => useDeviceUpdate(), {
			wrapper: ({children}) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
		});

		await act(async () => {
			await result.current.mutateAsync(mockDevice);
		});

		expect(axios.put).toHaveBeenCalledWith(`${API_URL}/devices/1`, mockDevice, {
			headers: {'Content-Type': 'application/json'},
		});
		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		})
	});

	it('should handle error when update fails', async () => {
		const mockDevice = {id: 1, system_name: 'Updated Device', type: 'desktop', hdd_capacity: 1000};
		const errorMessage = 'Request failed with status 500: Internal Server Error';

		axios.put.mockRejectedValueOnce(new Error(errorMessage));

		const {result} = renderHook(() => useDeviceUpdate(), {
			wrapper: ({children}) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
		});

		try {
			await act(async () => {
				await result.current.mutateAsync(mockDevice);
			});
		} catch (error) {
			expect(error.message).toBe(errorMessage);
		}

		expect(axios.put).toHaveBeenCalledWith(`${API_URL}/devices/1`, mockDevice, {
			headers: {'Content-Type': 'application/json'},
		});
	});
});
