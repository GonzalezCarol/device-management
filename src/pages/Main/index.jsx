import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import {Header} from "../../components/Header";
import {Table} from "../../components/Table";
import {BodyContainer, DeviceContainer, Title} from "./styles";
import {TableFilter} from "../../components/TableFilter";
import {useMainProps} from "../../contexts/MainContext/index.jsx";

export const Main = () => {
	const {filteredDevices: devices} = useMainProps();
	return (
		<>
			<Header/>
			<BodyContainer>
				<DeviceContainer>
					<Title>Devices</Title>
				</DeviceContainer>
				<TableFilter/>
				<Table devices={devices}/>
			</BodyContainer>
		</>
	);
};

Main.propTypes = {
	filteredDevices: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
			system_name: PropTypes.string.isRequired,
			type: PropTypes.oneOf(["WINDOWS", "LINUX", "MAC"]).isRequired,
			hdd_capacity: PropTypes.string.isRequired,
		})
	).isRequired,
};
