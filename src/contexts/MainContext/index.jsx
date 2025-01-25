import React, {createContext, useContext, useState, useMemo} from 'react';
import {useSearch} from "../../hooks/useSearch/index.jsx";

const MainContext = createContext();

export const useMainProps = () => useContext(MainContext);

export const MainProvider = ({children}) => {
	const {searchValue, handleSearchChange} = useSearch();

	const contextValue = useMemo(() => ({
		searchValue,
		handleSearchChange
	}), [searchValue, handleSearchChange]);

	return (
		<MainContext.Provider value={contextValue}>
			{children}
		</MainContext.Provider>
	);
};
