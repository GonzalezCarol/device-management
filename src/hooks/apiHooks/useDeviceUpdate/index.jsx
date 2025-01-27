import {useMutation, useQueryClient} from '@tanstack/react-query';
import {API_URL} from '../../../consts';

const updateDevice = async (device) => {
	const url = `${API_URL}/devices/${device.id}`;

	const response = await fetch(url, {
		method: 'PUT',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(device),
	});

	return response.json();
};

export const useDeviceUpdate = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (device) => updateDevice(device),
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['devices']});
		},
	});
};
