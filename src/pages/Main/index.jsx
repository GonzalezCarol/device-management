import React, {useState} from "react";
import {Header} from "../../components/Header";
import {Table} from "../../components/Table";
import {BodyContainer, DeviceContainer, Title} from "./styles";
import {TableFilter} from "../../components/TableFilter";
import {useMainProps} from "../../contexts/MainContext/index.jsx";
import {Button} from "../../components/Button/index.jsx";
import {DeviceModal} from "../../components/DeviceModal/index.jsx";
import addIcon from "../../assets/add-icon.svg";
import {DeleteDeviceModal} from "../../components/DeleteDeviceModal/index.jsx";

export const Main = () => {
	const {filteredDevices: devices} = useMainProps();
	const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
	const [isDeviceDeleteModalOpen, setIsDeviceDeleModalOpen] = useState(false);
	const [deviceId, setDeviceId] = useState(null)
	const [showMenu, setShowMenu] = useState(null);
	const [deviceInfo, setDeviceInfo] = useState(null);

	const onClickEditDevice = (deviceId) => {
		setIsDeviceModalOpen(true)
		setDeviceId(deviceId);
		setShowMenu(false)
	};

	const onClickDeleteDevice = (deviceId, deviceName) => {
		setDeviceInfo({
			deviceId,
			deviceName
		});
		setIsDeviceDeleModalOpen(true)
		setShowMenu(false)
	};

	const handleOnClickSuspendedMenu = (deviceId, option, deviceName) => {
		const menuOption = {
			Edit: () => onClickEditDevice(deviceId),
			Delete: () => onClickDeleteDevice(deviceId, deviceName),
		};

		if (menuOption[option]) {
			menuOption[option]();
		}
	};

	const handleAddDevice = () => {
		setDeviceId(null)
		setIsDeviceModalOpen(true)
	}

	return (
		<>
			<Header/>
			<BodyContainer>
				<DeviceContainer>
					<Title>Devices</Title>
					<Button
						label="Add device"
						icon={addIcon}
						onClick={() => handleAddDevice()}
					/>
				</DeviceContainer>
				<TableFilter/>
				<Table
					showMenu={showMenu}
					setShowMenu={setShowMenu}
					handleOnClickSuspendedMenu={handleOnClickSuspendedMenu}
				/>
				<DeviceModal
					isDeviceModalOpen={isDeviceModalOpen}
					onClose={() => setIsDeviceModalOpen(false)}
					devices={devices}
					deviceId={deviceId}
				/>
				<DeleteDeviceModal
					deviceInfo={deviceInfo}
					onClose={() => setIsDeviceDeleModalOpen(false)}
					isDeviceDeleModalOpen={isDeviceDeleteModalOpen}
				/>
			</BodyContainer>
		</>
	);
};
