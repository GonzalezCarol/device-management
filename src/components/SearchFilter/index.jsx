import React from "react";
import {SearchContainer, SearchIcon, SearchInput} from "./styles/index.jsx";
import searchIcon from '../../assets/search-icon.svg';
import {useMainProps} from "../../contexts/MainContext/index.jsx";

export const SearchBar = () => {
	const {handleSearchChange} = useMainProps();
	return (
		<SearchContainer>
			<SearchInput
				placeholder={"Search"}
				onChange={handleSearchChange}
			/>
			<SearchIcon src={searchIcon}/>
		</SearchContainer>
	);
};
