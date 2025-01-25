import React, {useState} from 'react';
import PropTypes from 'prop-types';  // Import PropTypes
import {ArrowIcon, DropdownContainer, DropdownItem, DropdownMenu, TextField} from "./styles/index.jsx";
import arrowDown from '../../assets/arrow-down.svg';

const Dropdown = ({label, onChange, options}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedType, setSelectedType] = useState('');

	const toggleDropdown = () => setIsOpen((prev) => !prev);

	const handleSelectOption = (type) => {
		setSelectedType(type);
		setIsOpen(false);
		onChange(type);
	};

	return (
		<DropdownContainer>
			<TextField
				value={selectedType}
				placeholder={label}
				onClick={toggleDropdown}
				readOnly
			/>
			<ArrowIcon src={arrowDown} alt="arrow-down"/>
			<DropdownMenu isOpen={isOpen}>
				{options?.length === 0 ? (
					<DropdownItem>No options available</DropdownItem>
				) : (
					options?.map((option, index) => (
						<DropdownItem key={index} onClick={() => handleSelectOption(option)}>
							{option}
						</DropdownItem>
					))
				)}
			</DropdownMenu>
		</DropdownContainer>
	);
};

Dropdown.propTypes = {
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Dropdown;
