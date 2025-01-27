import {useQuery} from '@tanstack/react-query';
import {API_URL} from '../../../consts'

const fetchDeviceDetail = async (deviceId) => {
	const url = `${API_URL}/devices/${deviceId}`;
	const response = await fetch(url);
	return await response.json();
};

export const useDeviceDetail = (deviceId, options) => {
	return useQuery({
		queryKey: ['device', deviceId],
		queryFn: () => fetchDeviceDetail(deviceId),
		...options,
	});
};
