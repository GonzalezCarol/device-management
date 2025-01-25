import styled from "styled-components";

export const SearchContainer = styled.div`
    position: relative;
    width: 250px;
`;

export const SearchInput = styled.input`
    padding: 8px 0 7px 38px;
    width: 230px;
    border: 1px solid #D1D0D9;
    border-radius: 5px;
    transition: border-color 0.3s ease;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;

    &:focus {
        outline: none;
    }
`;

export const SearchIcon = styled.img`
    padding: 5px;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 15px;
    gap: 0px;
    opacity: 0px;
`;

export const TableFilterContainer = styled.div`
    padding: 10px 0;
`;
