import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
	ArrowIcon,
	DropdownContainer,
	DropdownItem,
	DropdownLabelContainer,
	DropdownMenu,
	TextField
} from './styles/index.jsx';
import arrowDown from '../../assets/arrow-down.svg';

export const Dropdown = ({placeholder, label, onChange, options, selectedValue}) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => setIsOpen(prev => !prev);

	const handleSelectOption = (type) => {
		onChange(type);
		setIsOpen(false);
	};

	return (
		<DropdownContainer>
			<DropdownLabelContainer>
				<span>
					{label}
				</span>
				<TextField
					value={selectedValue}
					placeholder={placeholder}
					onClick={toggleDropdown}
					readOnly
					length={selectedValue?.length || label?.length || placeholder?.length}
				/>
				<ArrowIcon src={arrowDown} alt="arrow-down" onClick={toggleDropdown}/>
			</DropdownLabelContainer>

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
	selectedValue: PropTypes.string,
};

