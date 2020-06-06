import styled, { css } from 'styled-components';
import IconButton from 'components/atoms/IconButton/IconButton';

export const StyledModal = styled.div`
  position: absolute;
  display: grid;
  grid-template-rows: 20% 30% 30%;
  transform: scale(0.7);
  justify-items: center;
  align-content: space-between;
  padding: 20px;
  top: 40px;
  border-radius: 5px;
  background-color: white;
  z-index: 1;
  width: ${({ width }) => width || '400px'};
  min-height: ${({ height }) => height || '200px'};
  border: ${({ theme }) => `2px solid ${theme.border}`};
  box-shadow: ${({ theme }) => `2px 2px 10px ${theme.border}`};

  ${({ table }) =>
    table &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    `}
`;

export const StyledCloseButton = styled(IconButton)`
  position: absolute;
  right: -25px;
  top: 0;
  width: 10px;
`;
