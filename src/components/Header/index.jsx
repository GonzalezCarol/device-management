import ninjaLogo from '../../assets/ninjaone.svg'
import {HeaderContainer, LogoImage} from "./styles/index.jsx";

export const Header = () => (
	<HeaderContainer>
		<LogoImage src={ninjaLogo} alt="Logo" />
	</HeaderContainer>
);
