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

export const Dropdown = ({id, placeholder, label, onChange, options, selectedValue, name, width, top}) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => setIsOpen(prev => !prev);

	const handleSelectOption = (type) => {
		onChange({
			type,
			name
		});
		setIsOpen(false);
	};

	return (
		<DropdownContainer>
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
							{option}
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
	top: PropTypes.number
};
