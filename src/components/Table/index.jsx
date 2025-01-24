import React from "react";
import {useGetDevices} from "../../hooks/apiHooks/useGetDevices/index.js";
import {DeviceIcon, StyledTable, TableCell, TableContainer, TableHeader, TableRow} from "./styles/index.jsx";
import {deviceIcon} from "../../utils/deviceIcons/index.js";
import {capitalizeFirstLetter} from "../../utils/capitalizeFirstLetter/index.js";

export const Table = () => {
	const {data: devices, isLoading, error} = useGetDevices();

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	console.log(devices)
	return (
		<TableContainer>
			<StyledTable>
				<thead>
				<TableRow>
					<TableHeader>Device</TableHeader>
				</TableRow>
				</thead>
				<tbody>
				{devices?.map((device) => (
					<TableRow key={device?.id}>
						<TableCell>
							<DeviceIcon src={deviceIcon[device?.type]}/>
							{device?.system_name}
						</TableCell>
						<TableCell
							color={'#6E6D7A'}>{`${capitalizeFirstLetter(device?.type)} Workstation - ${device?.hdd_capacity} GB`}</TableCell>
					</TableRow>
				))}
				</tbody>
			</StyledTable>
		</TableContainer>
	);
};
