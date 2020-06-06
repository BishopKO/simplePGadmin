import styled, { css } from 'styled-components';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';
import IconButton from 'components/atoms/IconButton/IconButton';

// TABLE - NAME/MENU
export const StyledTitle = styled.p`
  font-size: 12px;
  padding: 0;
  margin-top: 0;
  margin-bottom: 20px;
  span {
    color: green;
  }
`;

export const StyledButtonsWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  margin-bottom: 30px;
  border-bottom: 1px solid lightgrey;
  overflow: hidden;
`;

// TABLE - COLUMN

export const StyledAddColumn = styled(BorderWithLabel)`
  width: 95%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid lightgrey;
  margin-top: 5px;
`;

export const StyledSelect = styled.select`
  width: 95%;
  font-size: 0.8rem;
  height: 1.3rem;
  position: relative;
  border: none;
  background-color: hsl(200, 20%, 95%);
  text-align: center;
  border-radius: 3px;
  -webkit-appearance: none;
  -moz-appearance: none;

  option:nth-child(1) {
    display: none;
  }
`;
