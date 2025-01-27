import React from 'react';
import {renderHook, waitFor} from '@testing-library/react';
import axios from 'axios';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useGetDevices} from '../index.js';

jest.mock('axios');

describe('useGetDevices', () => {
	const queryClient = new QueryClient();

	it('should return data when request is successful', async () => {
		const mockDevices = [
			{id: 1, system_name: 'Device 1', type: 'laptop', hdd_capacity: 500},
			{id: 2, system_name: 'Device 2', type: 'desktop', hdd_capacity: 1000},
		];

		axios.get.mockResolvedValueOnce({data: mockDevices});

		const {result} = renderHook(() => useGetDevices(), {
			wrapper: ({children}) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
		});

		await waitFor(() => result.current.isSuccess);

		await waitFor(() => {
			expect(result.current.data).toEqual(mockDevices);
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isError).toBe(false);
		})
	});

	it('should handle error when request fails', async () => {
		const errorMessage = 'Request failed with status 500: Internal Server Error';

		axios.get.mockRejectedValueOnce(new Error(errorMessage));

		const {result} = renderHook(() => useGetDevices(), {
			wrapper: ({children}) => (
				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			),
		});

		await waitFor(() => result.current.isError);

		await waitFor(() => {
			expect(result.current.error).toBeDefined();
		})
	});


});
