import React from 'react';
import {renderHook, waitFor} from '@testing-library/react';
import axios from 'axios';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useDeviceDetail} from '../index.js';

jest.mock('axios');

describe('useDeviceDetail', () => {
	const queryClient = new QueryClient();

	it('should return data when request is successful', async () => {
		const mockDevice = {id: 1, system_name: 'Device 1', type: 'laptop', hdd_capacity: 500};

		axios.get.mockResolvedValueOnce({data: mockDevice});

		const {result} = renderHook(() => useDeviceDetail(1), {
			wrapper: ({children}) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
		});

		await waitFor(() => result.current.isSuccess);

		await waitFor(() => {
			expect(result.current.data).toEqual(mockDevice);
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isError).toBe(false);
		})
	});

	it('should handle error when request fails', async () => {
		const errorMessage = 'Request failed with status 500: Internal Server Error';

		axios.get.mockRejectedValueOnce(new Error(errorMessage));

		const {result} = renderHook(() => useDeviceDetail(1), {
			wrapper: ({children}) => (
				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			),
		});

		await waitFor(() => result.current.isError);

		expect(result.current.error).toBeDefined();
	});
});
