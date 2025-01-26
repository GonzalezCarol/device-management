import React from 'react';
import PropTypes from 'prop-types';
import {StyledTextField, TextfieldContainer} from "./styles/index.jsx";

export const Textfield = ({label, value, onChange, isRequired}) => {
	return (
		<TextfieldContainer>
			<label>
				{label}
				{isRequired && <span>*</span>}
			</label>
			<StyledTextField
				value={value}
				onChange={(e) => onChange(e)}
				required={isRequired}
			/>
		</TextfieldContainer>
	);
};

Textfield.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	isRequired: PropTypes.bool,
};

Textfield.defaultProps = {
	value: '',
	isRequired: false,
};
