import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';

export const StyledTitle = styled.p`
  font-size: 12px;
  padding: 0;
  margin: 0;

  span {
    color: green;
  }
`;

export const StyledInput = styled.input`
  width: 200px;
  height: 30px;
  border: none;
  border-bottom: 1px solid lightgray;

  :focus {
    outline: none;
    border: none;
    border-bottom: 1px solid grey;
  }

  ::placeholder {
    text-align: center;
  }
`;

export const StyledCreateButton = styled(Button)`
  width: 60px;
  height: 25px;
  padding: 0;
  border-radius: 3px;
  justify-self: center;
  background: green;

  :hover {
    transform: scale(1.05);
  }
`;
