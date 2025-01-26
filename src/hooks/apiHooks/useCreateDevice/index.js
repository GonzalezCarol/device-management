import {useMutation, useQueryClient} from '@tanstack/react-query';
import {API_URL} from "../../../consts/index.js";

const createDevice = async (device) => {
	const url = `${API_URL}/devices`;
	const response = await fetch(url, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(device),
	});

	return response.json();
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
