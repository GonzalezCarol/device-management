import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {API_URL} from '../../../consts';

const updateDevice = async (device) => {
	const url = `${API_URL}/devices/${device.id}`;

	const response = await axios.put(url, device, {
		headers: {'Content-Type': 'application/json'},
	});

	return response.data;
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
