import React, {useRef} from "react";
import PropTypes from "prop-types";
import {
	Icon, StyledTable, Subtitle, TableCell, TableCellContainer, TableContainer, TableHeader, TableRow,
} from "./styles";
import {deviceIcon} from "../../utils/deviceIcons/index.js";
import {capitalizeFirstLetter} from "../../utils/capitalizeFirstLetter/index.js";
import {useMainProps} from "../../contexts/MainContext/index.jsx";
import dotIcon from "../../assets/dot-icon.svg";
import {Button} from "../Button/index.jsx";
import {SuspendedMenu} from "../SuspendedMenu/index.jsx";

export const Table = ({showMenu, setShowMenu, handleOnClickSuspendedMenu}) => {
	const {filteredDevices: devices} = useMainProps();

	const handleClickButton = (e, deviceId) => {
		if (e) {
			e.stopPropagation();
		}

		setShowMenu(showMenu === deviceId ? null : deviceId);
	};

	const options = [{
		id: 1, name: "Edit",
	}, {
		id: 2, name: "Delete",   color: "#D53948",
	},];

	return (
		<TableContainer>
			<StyledTable>
				<thead>
				<TableRow>
					<TableHeader>Device</TableHeader>
				</TableRow>
				</thead>
				<tbody>
				{devices?.map((device) => (<TableRow key={device?.id} color={"#f1f1f1"}>
					<TableCellContainer>
						<div>
							<TableCell>
								<Icon src={deviceIcon[device?.type]}/>
								{device?.system_name}
							</TableCell>
							<TableCell color={"#6E6D7A"}>
								<Subtitle>
									{capitalizeFirstLetter(device?.type)} Workstation - {device?.hdd_capacity} GB
								</Subtitle>
							</TableCell>
						</div>
						<div className="button-container" style={{position: "relative"}}>
						<Button
								width={32}
								height={32}
								backGroundColor={"#E8E8EA"}
								icon={dotIcon}
								onClick={(e) => handleClickButton(e, device?.id)}
							/>
							{showMenu === device?.id && (
								<SuspendedMenu
									device={device}
									onClick={handleOnClickSuspendedMenu}
									options={options}
								/>
							)}
						</div>
					</TableCellContainer>
				</TableRow>))}
				</tbody>
			</StyledTable>
		</TableContainer>);
};

Table.propTypes = {
	showMenu: PropTypes.bool,
	setShowMenu: PropTypes.func.isRequired,
	handleOnClickSuspendedMenu: PropTypes.func.isRequired,
};
