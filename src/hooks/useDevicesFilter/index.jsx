import {useState, useEffect, useMemo} from "react";

const sortHDDCapacityAscending = (devices) => {
	return devices.sort((a, b) => a.hdd_capacity - b.hdd_capacity);
};

const sortHDDCapacityDescending = (devices) => {
	return devices.sort((a, b) => b.hdd_capacity - a.hdd_capacity);
};

const sortNameAscending = (devices) => {
	return devices.sort((a, b) => a.system_name.localeCompare(b.system_name));
};

const sortNameDescending = (devices) => {
	return devices.sort((a, b) => b.system_name.localeCompare(a.system_name));
};

const sortFunctions = {
	'HDD Capacity (Ascending)': sortHDDCapacityAscending,
	'HDD Capacity (Descending)': sortHDDCapacityDescending,
	'Name (Ascending)': sortNameAscending,
	'Name (Descending)': sortNameDescending
};

export const useDevicesFilter = (filterValue, devicesData) => {
	const [filteredDevices, setFilteredDevices] = useState([]);

	const searchFilter = (searchValue, devices) => {
		return devices.filter(device =>
			device?.system_name.toLowerCase().includes(searchValue.toLowerCase())
		);
	};

	const dropDownFilter = (dropdownValue, devices, dropdownKey) => {
		if (dropdownKey === 'deviceType') {
			if (dropdownValue === 'ALL') {
				return devices;
			}
			return devices.filter(device => device?.type?.toLowerCase().includes(dropdownValue.toLowerCase()));
		}

		if (dropdownKey === 'sortBy' && sortFunctions[dropdownValue]) {
			return sortFunctions[dropdownValue](devices);
		}

		return devices;
	};

	const memoizedFilteredDevices = useMemo(() => {
		if (!devicesData || !filterValue || filterValue.length === 0) {
			return devicesData || [];
		}

		let filtered = devicesData;

		filterValue.forEach((filter) => {
			if (filter.value) {
				if (filter.type === 'textfield') {
					filtered = searchFilter(filter.value, filtered);
				}
				if (filter.type === 'dropdown') {
					filtered = dropDownFilter(filter.value, filtered, filter.dropdownKey);
				}
			}
		});

		return filtered;
	}, [filterValue, devicesData]);

	useEffect(() => {
		setFilteredDevices(prevState => {
			if (JSON.stringify(prevState) !== JSON.stringify(memoizedFilteredDevices)) {
				return memoizedFilteredDevices;
			}
			return prevState;
		});
	}, [memoizedFilteredDevices]);

	return {filteredDevices};
};
