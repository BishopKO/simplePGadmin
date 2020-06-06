import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';

export const StyledWarning = styled.p`
  font-size: 1.3rem;
  padding: 0;
  margin: 0;
  text-align: center;
  span {
    color: red;
    text-decoration: underline;
  }
`;

export const StyledQuestion = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1.1rem;
  text-align: center;
`;

export const StyledButtonsWrapper = styled.div`
  height: 25px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const StyledButton = styled(Button)`
  background: ${({ color }) => color};
  width: 100px;
  border-radius: 3px;

  :hover {
    transform: scale(1.05);
  }
`;
