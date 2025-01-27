import React from "react";
import ninjaLogo from '../../assets/ninja-one.svg'
import {HeaderContainer, LogoImage} from "./styles";

export const Header = () => (
	<HeaderContainer>
		<LogoImage src={ninjaLogo} alt="Logo"/>
	</HeaderContainer>
);
