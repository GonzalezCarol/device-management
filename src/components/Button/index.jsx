import addIcon from '../../assets/add-icon.svg'
import {StyledButton} from "./styles/index.jsx";

export const Button = ({label, onClick}) => {

	return (
		<StyledButton
			type="button"
			onClick={() => onClick()}
		>
			<span>{label}</span>
			<img src={addIcon}/>
		</StyledButton>
	);
};

