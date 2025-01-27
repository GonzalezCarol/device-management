import styled from 'styled-components';


export const StyledTable = styled.table`
    width: 100%;
    height: 100vh;
`;
export const TableHeader = styled.th`
    padding: 0 12px 5px;
    color: #000;
    border-bottom: 1px solid #CBCFD3;
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    line-height: 16.94px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;

`;

export const TableRow = styled.tr`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    border-bottom: 1px solid #ddd;

    .button-container {
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.3s, visibility 0s 0.3s;
    }

    &:hover {
        .button-container {
            visibility: visible;
            opacity: 1;
            transition: opacity 0.3s, visibility 0s;
        }

        background-color: ${(props) => props.color || '#FFF'};
    }

`;


export const TableCell = styled.td`
    padding: 5px;
    text-align: left;
    color: ${({color}) => color || '#000'};
    display: flex;
    gap: 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 16.94px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    align-items: flex-end;
`;

export const TableContainer = styled.div`
    width: 100%;
    margin: auto;
    overflow: hidden;
    padding: 10px 0;
`;

export const Icon = styled.img`
    width: 16px;
    height: 16px;
    padding: 0 8px 0;
    gap: 8px;
    background-color: ${(props) => props?.hoverColor ? props.hoverColor : 'none'};
    background-color: ${(props) => props?.hoverColor ? props.hoverColor : 'none'};
`
export const Subtitle = styled.span`
    padding: 0 8px 4px;
`

export const TableCellContainer = styled.th`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
`
