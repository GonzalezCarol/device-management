import {useEffect, useState} from "react";

export const useRefreshFilter = (
	handleSearchChange,
	handleDropdownChange,
	handleDropdownChangeMultiple
) => {
	const [refreshFilters, setRefreshFilters] = useState(false);

	const handleRefreshChange = (value) => {
		setRefreshFilters(value);
	};

	useEffect(() => {
		if (refreshFilters) {
			const resetEvent = {target: {value: ''}};

			handleSearchChange(resetEvent);

			handleDropdownChange('deviceType', {
				type: '',
				value: ''
			});

			handleDropdownChange('sortBy', {
				type: '',
				value: ''
			});

			handleDropdownChangeMultiple("");

			setRefreshFilters(false);
		}
	}, [refreshFilters, handleSearchChange, handleDropdownChange, handleDropdownChangeMultiple]);

	return {
		refreshFilters,
		handleRefreshChange
	};
};
