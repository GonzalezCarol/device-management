import {Modal} from "../Modal/index.jsx";
import {Textfield} from "../Textfield/index.jsx";
import {Dropdown} from "../Dropdown/index.jsx";
import React, {useState} from "react";
import {optionsDeviceType} from "../../utils/deviceTypeOptions/index.js";

export const DeviceModal = ({isDeviceModalOpen, onClose, devices}) => {
	const options = optionsDeviceType(devices);

	const [selectedDropdownValue, setSelectedDropdownValue] = useState("");
	const [textfieldValue, setSelectedTextField] = useState("");

	const onChangeDeviceType = (value) => {
		setSelectedDropdownValue(value);
	};

	const onChangeTextField = (e) => {
		setSelectedTextField(e.target.value);
	};

	return (
		<Modal isModalOpen={isDeviceModalOpen} onClose={onClose} modalTitle="Add Device">
			<Textfield
				label="System Name"
				value={textfieldValue}
				onChange={onChangeTextField}
				required
			/>
			<Dropdown
				label={'Device type *'}
				placeholder={"Select type"}
				onChange={onChangeDeviceType}
				options={options}
				dropdownKey="deviceType"
				selectedValue={selectedDropdownValue}
				required
			/>
			<Textfield
				label="HDD capacity (GB)"
				value={textfieldValue}
				onChange={onChangeTextField}
				required
			/>
		</Modal>
	);
};
