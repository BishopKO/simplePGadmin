import styled, { css } from 'styled-components';
import IconButton from 'components/atoms/IconButton/IconButton';

export const StyledModal = styled.div`
  position: absolute;
  display: grid;
  grid-template-rows: 20% 30% 30%;
  transform: scale(0.7);
  justify-items: center;
  align-content: space-between;
  width: 350px;
  min-height: 130px;
  border: ${({ theme }) => `2px solid ${theme.border}`};
  padding: 10px;
  left: 50%;
  margin-left: -200px;
  top: 80px;
  border-radius: 5px;
  background-color: white;

  ${({ createTable }) =>
    createTable &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 400px;
      min-height: 200px;
    `}
`;

export const StyledCloseButton = styled(IconButton)`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 10px;
`;
