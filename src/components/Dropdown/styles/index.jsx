import styled from 'styled-components';

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
    text-overflow: ellipsis;
    white-space: nowrap;
    width: ${(props) => props?.width || `${props.length}ch`};
    min-width: 150px;
    max-width: 500px;

    ::placeholder {
        color: #211F33;
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
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
    position: absolute;
    right: 10px;
    top: ${(props) => props?.top ? `${props?.top}%` : '50%'};
    transform: translateY(-50%);
    cursor: pointer;
`


export const DropdownLabelContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
`


