import styled from 'styled-components';

export const StyledTitle = styled.p`
  font-size: 12px;
  padding: 0;
  margin: 0;
`;

export const StyledInput = styled.input`
  width: 200px;
  height: 30px;
  border: none;
  border-bottom: 1px solid lightgray;
  text-transform: lowercase;

  :focus {
    outline: none;
    border: none;
    border-bottom: 1px solid grey;
  }

  ::placeholder {
    text-transform: none;
    text-align: center;
  }
`;
