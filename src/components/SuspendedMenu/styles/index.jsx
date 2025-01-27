import styled from "styled-components";

export const SuspendMenu = styled.td`
    width: 120px;
    height: 72px;
    position: absolute;
    top: 45px;
    right: 0;
    gap: 0px;
    border-radius: 2px 0px 0px 0px;
    opacity: 1;
    background-color: #fff;
    border: 1px solid #ccc;
    transition: opacity 0.3s ease-in-out;
    z-index: 10;
    box-shadow: 0px 2px 4px 0px #211F3326;

`;

export const SuspendButton = styled.div`
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    color: ${(props) => props.color || '#000'};
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    padding: 6px 12px;
    cursor: pointer;
`
