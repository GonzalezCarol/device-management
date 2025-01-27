import React from 'react';
import {FilterContainer, TableFilterContainer} from './styles';
import {SearchFilter} from '../SearchFilter';
import {Dropdown} from '../Dropdown';
import {DropdownMultiple} from '../DropdownMultiple';
import {useMainProps} from '../../contexts/MainContext';
import {OPTIONS_SORT_BY} from '../../consts/index.js';
import refreshIcon from '../../assets/refresh-icon.svg';
import {IconButtonComponent} from '../IconButton/index.jsx';
import {optionsDeviceType} from "../../utils/deviceTypeOptions/index.js";

export const TableFilter = () => {
	const {
		devicesData: devices, selectedDropdowns, handleDropdownChange, handleRefreshChange,
		selectedDropdownsMultiple,
		handleDropdownChangeMultiple
	} = useMainProps();

	const options = optionsDeviceType(devices);

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
				<DropdownMultiple
					placeholder={'Device Type: All'}
					onChange={handleDropdownChangeMultiple}
					options={options}
					dropdownKey="deviceType"
					selectedValue={selectedDropdownsMultiple || []}
				/>

				<Dropdown
					placeholder={'Sort by: HDD Capacity (Descending)'}
					onChange={onChangeDeviceCapacityDesc}
					options={OPTIONS_SORT_BY}
					dropdownKey="sortBy"
					selectedValue={selectedDropdowns?.sortBy?.type}
				/>
			</FilterContainer>

			<IconButtonComponent icon={refreshIcon} onClick={onRefreshFilters}/>
		</TableFilterContainer>
	);
};
