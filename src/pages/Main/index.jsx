import React, {useState} from "react";
import PropTypes from "prop-types";
import {Header} from "../../components/Header";
import {Table} from "../../components/Table";
import {BodyContainer, DeviceContainer, Title} from "./styles";
import {TableFilter} from "../../components/TableFilter";
import {useMainProps} from "../../contexts/MainContext/index.jsx";
import {Button} from "../../components/Button/index.jsx";
import {DeviceModal} from "../../components/DeviceModal/index.jsx";
import addIcon from '../../assets/add-icon.svg'

export const Main = () => {
	const {filteredDevices: devices} = useMainProps();
	const [isDeviceModalOpen, setIsDeviceModalOpen] = React.useState(false);
	const [editDevice, setEditDevice] = useState()
	const [deleteDevice, setDeleteDevice] = useState()

	const onClickEditDevice = () => {
		setEditDevice(true)
	}

	const onClickDeleteDevice = () => {
		setDeleteDevice(true)
	}

	return (<>
		<Header/>
		<BodyContainer>
			<DeviceContainer>
				<Title>Devices</Title>
				<Button label="Add device" icon={addIcon} onClick={() => setIsDeviceModalOpen(true)}/>
				<DeviceModal
					isDeviceModalOpen={isDeviceModalOpen}
					onClose={() => setIsDeviceModalOpen(false)}
					devices={devices}/>
			</DeviceContainer>
			<TableFilter/>
			<Table devices={devices} onClickEditDevice={onClickEditDevice} onClickDeleteDevice={onClickDeleteDevice}/>
		</BodyContainer>
	</>);
};

Main.propTypes = {
	filteredDevices: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
		system_name: PropTypes.string.isRequired,
		type: PropTypes.oneOf(["WINDOWS", "LINUX", "MAC"]).isRequired,
		hdd_capacity: PropTypes.string.isRequired,
	})).isRequired,
};

