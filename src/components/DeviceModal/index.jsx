import {Modal} from "../Modal/index.jsx";
import React from "react";
import {optionsDeviceType} from "../../utils/deviceTypeOptions/index.js";
import {DeviceForm} from "../DeviceForm/index.jsx";
import {useDeviceForm} from "../../hooks/useDeviceForm/index.js";
import {Button} from "../Button/index.jsx";
import {ButtonContainer} from "./styles/index.jsx";

export const DeviceModal = ({isDeviceModalOpen, onClose, devices}) => {
	const {
		formData,
		onChangeTextField,
		onChangeDropdown,
		handleSubmit,
		formErrors,
		clearForm,
		setFormErrors
	} = useDeviceForm()
	const options = optionsDeviceType(devices);

	const formErrorInitialStatue = {
		system_name: '',
		type: '',
		hdd_capacity: '',
	}
	const handleFormClose = () => {
		clearForm()
		setFormErrors(formErrorInitialStatue)
		onClose();
	}
	const formSubmit = async () => {
		const result = await handleSubmit();
		if (result?.status === 'success') {
			handleFormClose()
		}
	};

	return (
		<Modal isModalOpen={isDeviceModalOpen} onClose={handleFormClose} modalTitle="Add Device">
			<DeviceForm
				formData={formData}
				options={options}
				onChangeTextField={onChangeTextField}
				onChangeDropdown={onChangeDropdown}
				handleSubmit={handleSubmit}
				formErrors={formErrors}
			/>
			<ButtonContainer>
				<Button typeColor={'quiet'} label={"Cancel"} width={72} height={38} onClick={handleFormClose}/>
				<Button typeColor={'loud'} label={"Submit"} width={72} height={38} onClick={formSubmit}/>
			</ButtonContainer>
		< /Modal>
	);
};
