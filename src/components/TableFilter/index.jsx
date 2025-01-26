import React from 'react';
import {FilterContainer, TableFilterContainer} from './styles';
import {SearchFilter} from '../SearchFilter';
import {Dropdown} from '../Dropdown';
import {useMainProps} from '../../contexts/MainContext';
import {OPTIONS_SORT_BY} from '../../consts/index.js';
import refreshIcon from '../../assets/refresh-icon.svg';
import {IconButtonComponent} from '../IconButton/index.jsx';

export const TableFilter = () => {
	const {devicesData: devices, selectedDropdowns, handleDropdownChange, handleRefreshChange} = useMainProps();

	const optionsDeviceType = devices ? ['ALL', ...new Set(devices.map((device) => device.type))] : [];

	const onChangeDeviceType = (value) => {
		handleDropdownChange('deviceType', value);
	};

	const onChangeDeviceCapacityDesc = (value) => {
		handleDropdownChange('sortBy', value);
	};

	const onRefreshFilters = () => {
		handleRefreshChange(true);
	};

	return (
		<TableFilterContainer>
			<FilterContainer>
				<SearchFilter/>
				<Dropdown
					label={'Device Type: All'}
					onChange={onChangeDeviceType}
					options={optionsDeviceType}
					dropdownKey="deviceType"
					selectedValue={selectedDropdowns?.deviceType}
				/>

				<Dropdown
					label={'Sort by: HDD Capacity (Descending)'}
					onChange={onChangeDeviceCapacityDesc}
					options={OPTIONS_SORT_BY}
					dropdownKey="sortBy"
					selectedValue={selectedDropdowns?.sortBy}
				/>
			</FilterContainer>

			<IconButtonComponent icon={refreshIcon} onClick={onRefreshFilters}/>
		</TableFilterContainer>
	);
};
