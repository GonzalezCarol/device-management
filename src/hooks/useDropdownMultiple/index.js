import {useState} from 'react';

export const useDropdownMultiple = () => {
	const [selectedDropdownsMultiple, setSelectedDropdowns] = useState([]);

	const handleDropdownChangeMultiple = (dropdownKey) => {
		setSelectedDropdowns(() => (
			[dropdownKey]
		));
	};

	return {
		selectedDropdownsMultiple,
		handleDropdownChangeMultiple,
	};
};
