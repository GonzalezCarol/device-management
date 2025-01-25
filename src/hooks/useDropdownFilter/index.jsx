import {useState} from "react";


export const useDropdownFilter = () => {

	const [dropdownValue, setDropdownValue] = useState('');

	const handleDropdownChange = (value) => {
		setDropdownValue(value);
	};

	return {dropdownValue, handleDropdownChange}
}
