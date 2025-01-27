import React from 'react';
import PropTypes from 'prop-types';
import {StyledTextField, TextfieldContainer} from "./styles/index.jsx";

export const Textfield = ({id, type, label, value, name, onChange, isRequired}) => {
	return (
		<TextfieldContainer>
			<label>
				{label}
				{isRequired && <span>*</span>}
			</label>
			<StyledTextField
				id={id}
				data-testid={id}
				type={type}
				name={name}
				value={value}
				onChange={(e) => onChange(e)}
				required={isRequired}
				width={100}
			/>
		</TextfieldContainer>
	);
};

Textfield.propTypes = {
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	isRequired: PropTypes.bool,
};

Textfield.defaultProps = {
	value: '',
	isRequired: false,
};
