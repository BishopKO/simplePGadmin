import styled from 'styled-components';
import IconButton from 'components/atoms/IconButton/IconButton';

export const StyledTable = styled.table`
  font-size: 1.3rem;
  text-align: center;
  overflow: hidden;
  border-spacing: 0;

  tr:nth-child(even) {
    background: hsl(200, 10%, 90%);
  }

  th {
    border-bottom: 1px solid black;
    font-size: 1.2rem;
    padding: 10px;
  }

  tr {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  td {
    width: 100px;
    max-width: 100px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 5px;
    cursor: pointer;
  }

  tr:hover {
    white-space: nowrap;
    cursor: pointer;
    background: hsl(200, 10%, 70%);
    border: 1px solid lightgrey;
  }
`;

export const StyledIconButton = styled(IconButton)`
  margin: 0 0 0 5px;
  :hover {
    transform: scale(0.9);
  }
`;
