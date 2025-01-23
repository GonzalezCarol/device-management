import "./index.css";
import ninjaLogo from '../../assets/ninjaone.svg'

export const Header = () => (
	<div className='header'>
		<img className="header__logo" src={ninjaLogo} alt="Logo" />
	</div>
);
