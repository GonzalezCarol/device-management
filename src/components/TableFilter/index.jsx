import React from 'react';
import {TableFilterContainer} from "./styles/index.jsx";
import {SearchBar} from "../SearchFilter/index.jsx";


export const TableFilter = () => {
	return (
		<TableFilterContainer>
			<SearchBar/>
		</TableFilterContainer>
	);
};
