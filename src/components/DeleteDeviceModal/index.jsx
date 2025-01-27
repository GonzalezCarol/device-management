import React from "react";
import {Modal} from "../Modal/index.jsx";
import {Button} from "../Button/index.jsx";
import {ButtonContainer} from "./styles/index.jsx";
import {useDeleteDevice} from "../../hooks/apiHooks/useDeleteDevice/index.jsx";
import PropTypes from "prop-types";

export const DeleteDeviceModal = ({isDeviceDeleModalOpen, onClose, deviceInfo}) => {

	const {mutateAsync: deleteDevice} = useDeleteDevice();

	const handleDelete = async () => {
		if (deviceInfo.deviceId) {
			await deleteDevice(deviceInfo?.deviceId);
			onClose();
		}
	};

	return (
		<Modal isModalOpen={isDeviceDeleModalOpen} onClose={onClose} modalTitle="Delete device?">
			<div>
				You are about to delete the device <strong>{deviceInfo?.deviceName}</strong> .This action cannot be undone.
			</div>
			<ButtonContainer>
				<Button typeColor={'quiet'} color={'#000'} label={"Cancel"} width={72} height={38} onClick={() => onClose()}/>
				<Button typeColor={'delete'} label={"Delete"} width={72} height={38} onClick={() => handleDelete()}/>
			</ButtonContainer>
		< /Modal>
	);
};

DeleteDeviceModal.propTypes = {
	isDeviceDeleModalOpen: PropTypes.bool,
	onClose: PropTypes.func,
	deviceInfo: PropTypes.shape({
		deviceId: PropTypes.string,
		deviceName: PropTypes.string,
	}),
};
