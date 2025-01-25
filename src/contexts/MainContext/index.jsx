import React, {createContext, useContext, useMemo} from 'react';
import {useSearch} from "../../hooks/useSearch";
import {useFilterDevices} from "../../hooks/useFilterDevices";
import {useGetDevices} from "../../hooks/apiHooks/useGetDevices";
import {useDropdownFilter} from "../../hooks/useDropdownFilter";

const MainContext = createContext();

export const useMainProps = () => useContext(MainContext);

export const MainProvider = ({children}) => {
	const {data: devicesData, isLoading} = useGetDevices();
	const {searchValue, handleSearchChange} = useSearch();
	const {dropdownValue, handleDropdownChange} = useDropdownFilter();

	const filter = [
		{type: 'dropdown', value: dropdownValue},
		{type: 'textfield', value: searchValue},
	];

	const {filteredDevices} = useFilterDevices(filter, devicesData);

	const contextValue = useMemo(() => ({
		searchValue,
		handleSearchChange,
		filteredDevices,
		devicesData,
		dropdownValue,
		handleDropdownChange,
		isLoading,
	}), [searchValue, dropdownValue, devicesData, filteredDevices, isLoading]);

	return (
		<MainContext.Provider value={contextValue}>
			{children}
		</MainContext.Provider>
	);
};

