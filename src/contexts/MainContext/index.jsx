import React, {createContext, useContext, useMemo} from 'react';
import {useSearch} from "../../hooks/useSearch";
import {useDevicesFilter} from "../../hooks/useDevicesFilter";
import {useGetDevices} from "../../hooks/apiHooks/useGetDevices";
import {useRefreshFilter} from "../../hooks/useRefreshFilter/index.js";
import {useDropdown} from "../../hooks/useDropdown/index.js";

const MainContext = createContext();

export const useMainProps = () => useContext(MainContext);

export const MainProvider = ({children}) => {
	const {data: devicesData, isLoading} = useGetDevices();
	const {searchValue, handleSearchChange} = useSearch();
	const {selectedDropdowns, handleDropdownChange} = useDropdown()

	const filter = useMemo(() => {
		if (!selectedDropdowns) return;
		const dropdownFilters = Object.keys(selectedDropdowns).map(key => ({
			type: 'dropdown',
			value: selectedDropdowns[key],
			dropdownKey: key
		}));

		const textFieldFilter = [
			{type: 'textfield', value: searchValue},
		];

		return [...dropdownFilters, ...textFieldFilter];
	}, [selectedDropdowns, searchValue]);

	const {filteredDevices} = useDevicesFilter(filter, devicesData);
	const {refreshFilters, handleRefreshChange} = useRefreshFilter(handleSearchChange, handleDropdownChange);

	const contextValue = useMemo(() => ({
		searchValue,
		handleSearchChange,
		filteredDevices,
		devicesData,
		selectedDropdowns,
		handleDropdownChange,
		isLoading,
		handleRefreshChange,
	}), [
		searchValue,
		selectedDropdowns,
		devicesData,
		filteredDevices,
		isLoading,
		refreshFilters,
		handleRefreshChange,
	]);

	return (
		<MainContext.Provider value={contextValue}>
			{children}
		</MainContext.Provider>
	);
};
