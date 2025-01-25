import {useState} from "react";


export const useSearch = () => {

	const [searchValue, setSearchValue] = useState('');

	const handleSearchChange = (e) => {
		setSearchValue(e.target.value);
	};

	return {searchValue, handleSearchChange}
}
