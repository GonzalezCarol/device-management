import React, {useEffect, useState} from "react";
import {Header} from "../../components/Header";
import {Table} from "../../components/Table";
import {BodyContainer, DeviceContainer, Title} from "./styles";
import {TableFilter} from "../../components/TableFilter";
import {useGetDevices} from "../../hooks/apiHooks/useGetDevices/index.js";
import {useMainProps} from "../../contexts/MainContext/index.jsx";

export const Main = () => {
	const {data: devicesData, isLoading, error} = useGetDevices();

	// Initialize state for filtered devices
	const [filteredDevices, setFilteredDevices] = useState(devicesData);
	// const [searchFilter, setSearchFilter] = useState("");

	const {searchValue} = useMainProps()

	useEffect(() => {
		if (!devicesData) return;

		const filtered = devicesData.filter(device =>
			device?.system_name.toLowerCase().includes(searchValue.toLowerCase())
		);
		setFilteredDevices(filtered);
	}, [devicesData, searchValue]);

	// const handleSearchChange = (e) => {
	// 	setSearchFilter(e.target.value);
	// };

	return (
		<>
			<Header/>
			<BodyContainer>
				<DeviceContainer>
					<Title>
						Devices
					</Title>
				</DeviceContainer>
				{/*<TableFilter filter={handleSearchChange}/>*/}
				<TableFilter/>
				<Table devices={filteredDevices}/>
			</BodyContainer>
		</>
	)
}
