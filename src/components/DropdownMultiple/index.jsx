import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {
	ArrowIcon,
	DropdownContainer,
	DropdownInput,
	DropdownItem,
	DropdownLabelContainer,
	DropdownMenu,
	DropdownSpan,
	TextField,
} from './styles/index.jsx';
import arrowDown from '../../assets/arrow-down.svg';
import {capitalizeFirstLetter} from "../../utils/capitalizeFirstLetter/index.js";

export const DropdownMultiple = ({
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
	const dropdownRef = useRef(null);

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
		if (selectedValue[0]?.length === 0) {
			setSelectedOptions([]);
			setIsOpen(false);
		}
	}, [selectedValue]);

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
							<DropdownInput
								type="checkbox"
								id={option}
								checked={selectedOptions.includes(option)}
								onChange={() => handleSelectOption(option)}
							/>
							<DropdownSpan>{capitalizeFirstLetter(option)}</DropdownSpan>
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
