import ninjaLogo from '../../assets/ninjaone.svg'
import {HeaderContainer, LogoImage} from "./styles";

export const Header = () => (
	<HeaderContainer>
		<LogoImage src={ninjaLogo} alt="Logo" />
	</HeaderContainer>
);
