import styled from 'styled-components';
import Logo2 from '../../assets/Shop10.png';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
	height: 74px;
	width: 100%;
	display: inline-grid;
	grid-template-columns: 1fr 3fr;
	justify-items: center;
	align-items: center;
	margin-bottom: 34px;
	border-bottom: 1px solid black;
	
	@media screen and (max-width: 600px) {
		height: 70px;
		grid-template-columns: 1fr 5fr;
	}
`;
export const LogoImage = styled.img.attrs({
	src: Logo2,
	alt: ""
})`
	height: 70px;	
	width: auto;
	padding-left: 10px;
	margin-right: auto;
`;

export const LogoContainer = styled(Link)`
	height: 100%;
	width: 100%;
	padding: 0px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin: 0;
	
	@media screen and (max-width: 600px) {
		img${LogoImage} {
			height: 50px;
		}
	}
	@media screen and (max-width: 400px) {
		height: 100%;
		padding: 0px;

		img${LogoImage} {
			height: 40px;
		}
	}
`;

export const OptionsContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;

	@media screen and (max-width: 600px) {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		justify-items: flex-end;
	}
`;

export const OptionLink = styled(Link)`
	padding: 10px 15px;
	cursor: pointer;
	white-space: none;
	text-align: center;
	
	&:hover {
		background-color: rgba(255, 255, 255, 0.7);
		border: 1px solid black;
	}	

	@media screen and (max-width: 410px) {
		font-size: 14px;
		padding: 0px 4px;
	}
	@media screen and (max-width: 310px) {
		font-size: 12px;
	}
`;