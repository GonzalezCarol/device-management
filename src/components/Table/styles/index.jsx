import styled from 'styled-components';


export const StyledTable = styled.table`
    width: 100%;
`;
export const TableHeader = styled.th`
    padding: 5px;
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

    &:hover {
        background-color: #f1f1f1;
    }
`;

export const TableCell = styled.td`
    padding: 5px;
    text-align: left;
    color: ${(props) => props.color || 'black'};
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
`;

export const DeviceIcon = styled.img`
    width: 16px;
    height: 16px;
    padding: 8px 0px 0px 0px;
    gap: 8px;
    opacit: 0px;
`
