import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {API_URL} from '../../../consts';

const deleteDevice = async (deviceId) => {
	const url = `${API_URL}/devices/${deviceId}`;
	const response = await axios.delete(url);

	return response.data;
};

export const useDeleteDevice = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (deviceId) => deleteDevice(deviceId),
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['devices']});
		},
	});
};
