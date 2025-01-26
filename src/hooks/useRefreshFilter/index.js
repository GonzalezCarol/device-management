import {useEffect, useState} from "react";

export const useRefreshFilter = (handleSearchChange, handleDropdownChange) => {
	const [refreshFilters, setRefreshFilters] = useState(false);

	const handleRefreshChange = (value) => {
		setRefreshFilters(value);
	};

	useEffect(() => {
		if (refreshFilters) {
			const resetEvent = {target: {value: ''}};
			handleSearchChange(resetEvent);
			handleDropdownChange('deviceType', '')
			handleDropdownChange('sortBy', '')

			setRefreshFilters(false);
		}
	}, [refreshFilters, handleSearchChange, handleDropdownChange]);

	return {
		refreshFilters,
		handleRefreshChange,
	};
};
