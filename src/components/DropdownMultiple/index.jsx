import React, {useEffect, useState} from 'react';
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

export const DropdownMultiple = (
	{
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
	const [selectedOptions, setSelectedOptions] = useState(
		Array.isArray(selectedValue) ? selectedValue : []
	);

	const toggleDropdown = () => setIsOpen((prev) => !prev);

	const handleSelectOption = (option) => {
		let updatedSelection;
		if (selectedOptions.includes(option)) {
			updatedSelection = selectedOptions.filter((item) => item !== option);
		} else {
			updatedSelection = [...selectedOptions, option];
		}
		setSelectedOptions(updatedSelection);
		onChange(updatedSelection, name);
	};

	useEffect(() => {
		if (!selectedValue[0]) {
			setSelectedOptions([]);
			setIsOpen(false)
		}
	}, [selectedValue]);

	return (
		<DropdownContainer>
			<DropdownLabelContainer onClick={toggleDropdown}>
				<span>{label}</span>
				<TextField
					id={id}
					data-testid={name}
					value={selectedOptions.length > 0 ? selectedOptions.join(', ') : placeholder}
					placeholder={placeholder}
					readOnly
					width={width}
				/>
				<ArrowIcon src={arrowDown} alt="arrow-down" top={top}/>
			</DropdownLabelContainer>

			<DropdownMenu isOpen={isOpen}>
				{options?.length === 0 ? (
					<DropdownItem>No options available</DropdownItem>
				) : (
					options?.map((option, index) => (
						<DropdownItem key={index} onClick={() => handleSelectOption(option)}>
							<input
								type="checkbox"
								id={option}
								checked={selectedOptions.includes(option)}
								onChange={() => handleSelectOption(option)}
							/>
							<span>{option}</span>
						</DropdownItem>
					))
				)}
			</DropdownMenu>
		</DropdownContainer>
	);
};

DropdownMultiple.propTypes = {
	placeholder: PropTypes.string,
	label: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(PropTypes.string).isRequired,
	selectedValue: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
	name: PropTypes.string,
	width: PropTypes.number,
	top: PropTypes.number,
	selectedDropdownsMultiple: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};
