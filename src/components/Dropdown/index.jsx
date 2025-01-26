import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {ArrowIcon, DropdownContainer, DropdownItem, DropdownMenu, TextField} from './styles/index.jsx';
import arrowDown from '../../assets/arrow-down.svg';

export const Dropdown = ({label, onChange, options, selectedValue}) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => setIsOpen(prev => !prev);

	const handleSelectOption = (type) => {
		onChange(type);
		setIsOpen(false);
	};

	return (
		<DropdownContainer>
			<div style={{position: 'relative'}}>
				<TextField
					value={selectedValue}
					placeholder={label}
					onClick={toggleDropdown}
					readOnly
					length={selectedValue?.length || label.length}
				/>
				<ArrowIcon src={arrowDown} alt="arrow-down" onClick={toggleDropdown}/>
			</div>

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

