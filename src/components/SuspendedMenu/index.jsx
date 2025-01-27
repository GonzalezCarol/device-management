import React from "react";
import PropTypes from "prop-types";

import {SuspendButton, SuspendMenu} from "./styles/index.jsx";

export const SuspendedMenu = ({options, device, onClick}) => {
	return (
		<SuspendMenu>
			{
				options.map((value) => (
					<div key={value.id} onClick={() => onClick(device?.id, value.name, device?.system_name)}>
						<SuspendButton color={value?.color}>{value.name}</SuspendButton>
					</div>
				))}
		</SuspendMenu>
	);
};

SuspendedMenu.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			color: PropTypes.string,
		})
	).isRequired,
	device: PropTypes.shape({
		id: PropTypes.string.isRequired,
		system_name: PropTypes.string.isRequired,
	}).isRequired,
	onClick: PropTypes.func.isRequired,
};
