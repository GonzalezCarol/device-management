import {useState} from "react";

export const useDropdown = () => {
	const [selectedDropdowns, setSelectedDropdowns] = useState({
		deviceType: '',
		sortBy: '',
	});

	const handleDropdownChange = (dropdownKey, value) => {
		setSelectedDropdowns((prevState) => ({
			...prevState,
			[dropdownKey]: value,
		}));
	};


	return {
		selectedDropdowns,
		handleDropdownChange,
	};
};

