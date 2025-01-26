import React, {useState, useRef} from "react";
import {
	Icon,
	StyledTable,
	Subtitle,
	TableCell,
	TableCellContainer,
	TableContainer,
	TableHeader,
	TableRow
} from "./styles";
import {deviceIcon} from "../../utils/deviceIcons/index.js";
import {capitalizeFirstLetter} from "../../utils/capitalizeFirstLetter/index.js";
import {useMainProps} from "../../contexts/MainContext/index.jsx";
import dotIcon from "../../assets/dot-icon.svg";
import {Button} from "../Button/index.jsx";
import {SuspendedMenu} from "../SuspendedMenu/index.jsx";

export const Table = () => {
	const {filteredDevices: devices} = useMainProps();
	const [showMenu, setShowMenu] = useState(null);
	const buttonRef = useRef(null);

	const handleClickButton = (e, deviceId) => {
		if (e) {
			e.stopPropagation();
		}

		setShowMenu(showMenu === deviceId ? null : deviceId);
	};

	const handleOnClickSuspendedMenu = (deviceId, option) => {
		console.log(`Device ID: ${deviceId}, Option: ${option}`);
	};

	const options = [
		{
			id: 1,
			name: 'Edit'
		},
		{
			id: 2,
			name: 'Delete',
			color: "#D53948"
		}
	];

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
					<TableRow key={device?.id} color={"#f1f1f1"}>
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
							<TableCell style={{position: "relative"}}>
								<Button
									ref={buttonRef}
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
							</TableCell>
						</TableCellContainer>
					</TableRow>
				))}
				</tbody>
			</StyledTable>
		</TableContainer>
	);
};
