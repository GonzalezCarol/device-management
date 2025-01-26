import styled from "styled-components";

export const StyledButton = styled.button`
    background: ${(props) => props?.backGroundColor || (props?.typeColor === 'quiet' ? '#FFF' : '#337AB7')};
    color: ${(props) => props?.typeColor === 'quiet' ? '#337AB7' : '#FFF'};
    border: none;
    border-radius: 4px;
    border: ${(props) => props?.typeColor === 'quiet' ? '1px solid #48446940' : 'none'};
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
    width: ${(props) => props?.width ? `${props.width}px` : '121px'};
    height: 38px;
    gap: 8px;
    border-radius: 4px;

    &:hover {
        cursor: pointer;
    }

    & > span {
        font-size: 14px;
        font-weight: 500;
        line-height: 14px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
    }
`;
