import styled from "styled-components";

export const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
`;

export const TextField = styled.input`
    padding: 10px;
    border: 1px solid #ddd;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    color: #211F33;
    width: auto;
    min-width: 150px;
    text-overflow: ellipsis;
    white-space: nowrap;

    &::placeholder {
        color: #aaa;
    }

    &:focus {
        outline: none;
    }
`;

export const DropdownMenu = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    border: 1px solid #ddd;
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-y: auto;
    display: ${({isOpen}) => (isOpen ? 'block' : 'none')};
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
`;

export const DropdownItem = styled.li`
    padding: 10px;
    cursor: pointer;
    color: #211F33;

    &:hover {
        background-color: #f1f1f1;
    }
`;

export const ArrowIcon = styled.img`



`

