import styled from "styled-components";

export const StyledTextField = styled.input`
    padding: 8px 0 7px 10px;
    width: ${(props) => props?.width || '230px'};
    border: 1px solid #D1D0D9;
    border-radius: 5px;
    transition: border-color 0.3s ease;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
		font-family: 'Inter', sans-serif;

    &:focus {
        outline: none;
    }
`;


export const TextfieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
		
		& > span {
				font-family: 'Inter', sans-serif;
    }
`
