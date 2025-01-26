import React from "react";
import {SearchFilterContainer, SearchIcon, SearchInput} from "./styles/index.jsx";
import searchIcon from '../../assets/search-icon.svg';
import {useMainProps} from "../../contexts/MainContext/index.jsx";

export const SearchFilter = () => {
	const {handleSearchChange, searchValue} = useMainProps();
	return (
		<SearchFilterContainer>
			<SearchInput
				value={searchValue}
				placeholder={"Search"}
				onChange={handleSearchChange}
			/>
			<SearchIcon src={searchIcon}/>
		</SearchFilterContainer>
	);
};
