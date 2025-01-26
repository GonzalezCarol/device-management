import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import {API_URL} from "../../../consts/index.js";

const getDevices = async () => {
	try {
		const response = await axios.get(`${API_URL}/devices`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(`Request failed with status ${error.response?.status}: ${error.message}`);
		}
		throw error;
	}
}
export const useGetDevices = () => {
	return useQuery({
		queryKey: ['devices'],
		queryFn: () => getDevices()
	});
};
