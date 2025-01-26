import React from "react";
import {Textfield} from "../Textfield/index.jsx";
import {Dropdown} from "../Dropdown/index.jsx";
import PropTypes from "prop-types";
import {ErrorMessage, SpanContainer} from "./styles/index.jsx";

export const DeviceForm = (
	{
		formData,
		options,
		onChangeTextField,
		onChangeDropdown,
		formErrors,
	}) => (<>
	<SpanContainer>
		<Textfield
			type="text"
			label="System name *"
			value={formData.system_name}
			name="system_name"
			onChange={onChangeTextField}
			width={100}
		/>
		<ErrorMessage>{formErrors.system_name}</ErrorMessage>
	</SpanContainer>
	<SpanContainer>
		<Dropdown
			label="Device type *"
			placeholder="Select type"
			onChange={onChangeDropdown}
			options={options}
			dropdownKey="type"
			selectedValue={formData.type}
			name="type"
			width={100}
			top={66}
		/>
		<ErrorMessage>{formErrors.type}</ErrorMessage>
	</SpanContainer>
	<SpanContainer>
		<Textfield
			type="text"
			label="HDD capacity (GB)"
			onChange={onChangeTextField}
			value={formData.hdd_capacity}
			name="hdd_capacity"
			width={100}
		/>
		<ErrorMessage>{formErrors.hdd_capacity}</ErrorMessage>
	</SpanContainer>
</>);

DeviceForm.propTypes = {
	formData: PropTypes.shape({
		system_name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		hdd_capacity: PropTypes.string.isRequired,
	}).isRequired,
	options: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string.isRequired, value: PropTypes.string.isRequired,
	})).isRequired,
	onChangeTextField: PropTypes.func.isRequired,
	onChangeDropdown: PropTypes.func.isRequired,
	formErrors: PropTypes.shape({
		system_name: PropTypes.string, type: PropTypes.string, hdd_capacity: PropTypes.string,
	}).isRequired,
};

