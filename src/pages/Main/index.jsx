import React from "react";
import {Header} from "../../components/Header";
import {Table} from "../../components/Table";
import {BodyContainer, DeviceContainer, Title} from "./styles";
import {TableFilter} from "../../components/TableFilter";
import {useMainProps} from "../../contexts/MainContext/index.jsx";

export const Main = () => {
	const {filteredDevices: devices} = useMainProps()
	return (
		<>
			<Header/>
			<BodyContainer>
				<DeviceContainer>
					<Title>
						Devices
					</Title>
				</DeviceContainer>
				<TableFilter/>
				<Table devices={devices}/>
			</BodyContainer>
		</>
	)
}
