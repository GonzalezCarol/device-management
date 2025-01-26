import React from "react";
import PropTypes from "prop-types";
import {IconButton} from "./styles/index.jsx";

export const IconButtonComponent = ({label, icon, onClick}) => {
	return (
		<IconButton onClick={onClick}>
			{icon && <img src={icon} alt="icon"/>}
			{label}
		</IconButton>
	);
};

IconButtonComponent.propTypes = {
	label: PropTypes.string.isRequired,
	icon: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]),
	onClick: PropTypes.func.isRequired,
};
