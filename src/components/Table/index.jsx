import React from "react";
import PropTypes from 'prop-types';
import {Icon, StyledTable, Subtitle, TableCell, TableContainer, TableHeader, TableRow} from "./styles";
import {deviceIcon} from "../../utils/deviceIcons/index.js";
import {capitalizeFirstLetter} from "../../utils/capitalizeFirstLetter/index.js";


export const Table = ({devices}) => {
	return (
		<TableContainer>
			<StyledTable>
				<thead>
				<TableRow>
					<TableHeader>Device</TableHeader>
				</TableRow>
				</thead>
				<tbody>
				{devices?.map((device) => (
					<TableRow key={device?.id} color={'#f1f1f1'}>
						<TableCell>
							<Icon src={deviceIcon[device?.type]}/>
							{device?.system_name}
						</TableCell>
						<TableCell
							color={'#6E6D7A'}>
							<Subtitle>
								{capitalizeFirstLetter(device?.type)} Workstation - ${device?.hdd_capacity} GB
							</Subtitle>
						</TableCell>
					</TableRow>
				))}
				</tbody>
			</StyledTable>
		</TableContainer>
	);
};

Table.propTypes = {
	devices: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
			system_name: PropTypes.string.isRequired,
			type: PropTypes.oneOf(['WINDOWS', 'LINUX', 'MAC']).isRequired,
			hdd_capacity: PropTypes.string.isRequired,
		})
	)
};
