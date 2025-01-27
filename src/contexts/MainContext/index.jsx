import React, {createContext, useContext, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useSearch} from "../../hooks/useSearch";
import {useDevicesFilter} from "../../hooks/useDevicesFilter";
import {useGetDevices} from "../../hooks/apiHooks/useGetDevices";
import {useRefreshFilter} from "../../hooks/useRefreshFilter/index.js";
import {useDropdown} from "../../hooks/useDropdown/index.js";
import {useDropdownMultiple} from "../../hooks/useDropdownMultiple/index.js";

const MainContext = createContext();

export const useMainProps = () => useContext(MainContext);

export const MainProvider = ({children}) => {
	const {data: devicesData, isLoading} = useGetDevices();
	const {searchValue, handleSearchChange} = useSearch();
	const {selectedDropdowns, handleDropdownChange} = useDropdown();
	const {selectedDropdownsMultiple, handleDropdownChangeMultiple} = useDropdownMultiple();
	const {
		refreshFilters,
		handleRefreshChange
	} = useRefreshFilter(handleSearchChange, handleDropdownChange, handleDropdownChangeMultiple);

	const filter = useMemo(() => {
		if (!selectedDropdowns && !selectedDropdownsMultiple) return;

		const dropdownFilters = Object.keys(selectedDropdowns).map(key => ({
			type: 'dropdown',
			value: selectedDropdowns[key].type,
			dropdownKey: key
		}));

		const dropdownMultipleFilters = selectedDropdownsMultiple?.map(key => ({
			type: 'dropdownMultiple',
			value: key
		}));

		const textFieldFilter = [
			{type: 'textfield', value: searchValue},
		];

		return [...dropdownFilters, ...dropdownMultipleFilters, ...textFieldFilter];
	}, [selectedDropdowns, selectedDropdownsMultiple, searchValue]);


	const {filteredDevices} = useDevicesFilter(filter, devicesData);

	const contextValue = useMemo(() => ({
		searchValue,
		handleSearchChange,
		filteredDevices,
		devicesData,
		selectedDropdowns,
		handleDropdownChange,
		isLoading,
		handleRefreshChange,
		selectedDropdownsMultiple,
		handleDropdownChangeMultiple
	}), [
		searchValue,
		selectedDropdowns,
		devicesData,
		filteredDevices,
		isLoading,
		refreshFilters,
		handleRefreshChange,
		selectedDropdownsMultiple,
		handleDropdownChangeMultiple
	]);

	return (
		<MainContext.Provider value={contextValue}>
			{children}
		</MainContext.Provider>
	);
};

MainProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export const contextPropTypes = {
	searchValue: PropTypes.string.isRequired,
	handleSearchChange: PropTypes.func.isRequired,
	filteredDevices: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
			system_name: PropTypes.string.isRequired,
			type: PropTypes.oneOf(["WINDOWS", "LINUX", "MAC"]).isRequired,
			hdd_capacity: PropTypes.string.isRequired,
		})
	).isRequired,
	devicesData: PropTypes.array.isRequired,
	selectedDropdowns: PropTypes.object.isRequired,
	handleDropdownChange: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	handleRefreshChange: PropTypes.func.isRequired,
};

MainContext.propTypes = contextPropTypes;
