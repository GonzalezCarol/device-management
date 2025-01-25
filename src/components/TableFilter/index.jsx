import React from 'react';
import {TableFilterContainer} from "./styles";
import {SearchBar} from "../SearchFilter";
import Dropdown from "../Dropdown";
import {useMainProps} from "../../contexts/MainContext/index.jsx";
import {OPTIONS_SORT_BY} from "../../consts/index.js";


export const TableFilter = () => {
	const {devicesData: devices, handleDropdownChange} = useMainProps()

	const optionsDeviceType = devices ? ['ALL', ...new Set(devices.map((device) => device.type))] : [];

	const onChangeDeviceType = (value) => {
		handleDropdownChange(value)
	}

	const onChangeDeviceCapacityDesc = (value) => {
		handleDropdownChange(value)
	}
	return (
		<TableFilterContainer>
			<SearchBar/>
			<Dropdown
				label={'Device Type: All'}
				onChange={onChangeDeviceType}
				options={optionsDeviceType}
			/>
			<Dropdown
				label={'Sort by: HDD Capacity (Descending)'}
				onChange={onChangeDeviceCapacityDesc}
				options={OPTIONS_SORT_BY}
			/>
		</TableFilterContainer>
	);
};
