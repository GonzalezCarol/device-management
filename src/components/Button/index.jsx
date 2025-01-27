import React from "react";
import PropTypes from 'prop-types';
import {StyledButton} from './styles/index.jsx';

export const Button = ({label, onClick, icon, width, height, typeColor, backGroundColor, color, ...rest}) => {
	return (
		<StyledButton
			type="button"
			onClick={onClick}
			width={width}
			height={height}
			typeColor={typeColor}
			backGroundColor={backGroundColor}
			color={color}
			{...rest}
		>
			{icon && <img src={icon} alt="button-icon"/>}
			{label && <span>{label}</span>}
		</StyledButton>
	);
};

Button.propTypes = {
	label: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	icon: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
	typeColor: PropTypes.string,
	backGroundColor: PropTypes.string,
	color: PropTypes.string
};
