import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {API_URL} from "../../../consts/index.js";

const createDevice = async (device) => {
	const url = `${API_URL}/devices`;
	const response = await axios.post(url, device, {
		headers: {'Content-Type': 'application/json'},
	});

	return response.data;
};

export const useCreateDevice = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (device) => createDevice(device),
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['devices']});
		},
	});
};
