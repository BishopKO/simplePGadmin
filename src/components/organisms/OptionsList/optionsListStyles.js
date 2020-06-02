import styled, { css } from 'styled-components';
import IconButton from 'components/atoms/IconButton/IconButton';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';

export const StyledWrapper = styled.div`  
  display: grid;
  grid-template-rows: 30px 1fr;
  width: 100%;
  height: 100%;  
  border:  2px solid hsl(200, 20%, 50%);
  border-radius: 3px; 
  padding: 0;

  ::after {
    position: absolute;
    content: "${({ title }) => title}";
    font-size: 10px;
    top: -12px;
  }
`;

export const StyledList = styled.ul`
  height: 100%;
  font-size: 1.2rem;
  list-style: none;
  overflow: auto;
  padding: 0;
  margin-top: 0;

  li {
    border-bottom: 0.5px solid grey;
  }
`;

export const StyledLi = styled.li`
  padding: 3px 0 0 3px;
  :hover {
    cursor: pointer;
    background: ${({ theme }) => theme.select};
  }
  ${({ active }) =>
    active &&
    css`
      font-weight: bold;
      background: ${({ theme }) => theme.select};
    `}
`;

export const StyledMenuWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  align-items: center;
  background: aliceblue;
  width: 100%;
  height: 100%;
`;

export const StyledSelect = styled.select`
  position: relative;
  font-size: 1.2rem;
  font-weight: bold;
  width: 90%;
  height: 100%;
  border: none;
  background: none;
  cursor: pointer;
  border-right: 1px solid lightgray;
  -webkit-appearance: none;

  :focus {
    border: none;
    outline: none;
  }

  option:nth-child(1) {
    display: none;
  }
`;

export const StyledGoButton = styled(IconButton)`
  width: 30px;
  height: 30px;
`;

export const StyledBorder = styled(BorderWithLabel)`
  height: 100%;
  width: 100%;
  padding: 5px;
  ::after {
    font-size: 13px;
    top: -10px;
    height: 13px;
  }
`;
