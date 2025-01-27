import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {API_URL} from '../../../consts';

const fetchDeviceDetail = async (deviceId) => {
	const url = `${API_URL}/devices/${deviceId}`;
	const response = await axios.get(url);
	return response.data;
};

export const useDeviceDetail = (deviceId, options) => {
	return useQuery({
		queryKey: ['device', deviceId],
		queryFn: () => fetchDeviceDetail(deviceId),
		...options,
	});
};
