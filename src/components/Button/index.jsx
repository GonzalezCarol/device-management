import PropTypes from 'prop-types';
import {StyledButton} from './styles/index.jsx';

export const Button = ({label, onClick, icon, width, height, typeColor, backGroundColor, color}) => {
	return (
		<StyledButton
			type="button"
			onClick={() => onClick()}
			width={width}
			height={height}
			typeColor={typeColor}
			backGroundColor={backGroundColor}
			color={color}
		>
			{label && <span>{label}</span>}
			{icon && <img src={icon} alt="button-icon"/>}
		</StyledButton>
	);
};

Button.propTypes = {
	label: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	icon: PropTypes.string,
	width: PropTypes.string,
	height: PropTypes.string,
	typeColor: PropTypes.string,
	backGroundColor: PropTypes.string,
	color: PropTypes.string
};
