import styled from "styled-components";

export const StyledButton = styled.button`
    background: #337AB7;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
    width: 121px;
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
