import {StyledButton} from "./styles/index.jsx";

export const Button = ({label, onClick, icon, width, height, typeColor}) => {

	return (
		<StyledButton
			type="button"
			onClick={() => onClick()}
			width={width}
			height={height}
			typeColor={typeColor}
		>
			<span>{label}</span>
			{icon && (
				<img src={icon}/>
			)}
		</StyledButton>
	);
};

