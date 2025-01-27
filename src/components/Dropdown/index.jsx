import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {
	ArrowIcon,
	DropdownContainer,
	DropdownItem,
	DropdownLabelContainer,
	DropdownMenu,
	TextField,
} from './styles/index.jsx';
import arrowDown from '../../assets/arrow-down.svg';
import {capitalizeFirstLetter} from "../../utils/capitalizeFirstLetter/index.js";

export const Dropdown = ({
	                         id,
	                         placeholder,
	                         label,
	                         onChange,
	                         options,
	                         selectedValue,
	                         name,
	                         width,
	                         top,
                         }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => setIsOpen((prev) => !prev);

	const handleSelectOption = (type) => {
		onChange({
			type,
			name,
		});
		setIsOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<DropdownContainer ref={dropdownRef}>
			<DropdownLabelContainer>
				<span>{label}</span>
				<TextField
					id={id}
					data-testid={name}
					value={selectedValue || placeholder}
					placeholder={placeholder}
					label={placeholder}
					onClick={toggleDropdown}
					readOnly
					length={selectedValue?.length || label?.length || placeholder?.length}
					width={width}
				/>
				<ArrowIcon src={arrowDown} alt="arrow-down" onClick={toggleDropdown} top={top}/>
			</DropdownLabelContainer>

			<DropdownMenu isOpen={isOpen}>
				{options?.length === 0 ? (
					<DropdownItem>No options available</DropdownItem>
				) : (
					options?.map((option, index) => (
						<DropdownItem key={index} onClick={() => handleSelectOption(option)}>
							{capitalizeFirstLetter(option)}
						</DropdownItem>
					))
				)}
			</DropdownMenu>
		</DropdownContainer>
	);
};

Dropdown.propTypes = {
	placeholder: PropTypes.string,
	label: PropTypes.string,
	onChange: PropTypes.func,
	options: PropTypes.arrayOf(PropTypes.string),
	selectedValue: PropTypes.string,
	name: PropTypes.string,
	width: PropTypes.number,
	top: PropTypes.number,
};
