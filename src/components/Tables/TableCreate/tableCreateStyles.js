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
  width: 95%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  justify-content: space-around;

  margin-bottom: 30px;
  border-bottom: 1px solid lightgrey;
  overflow: hidden;
`;

export const StyledIconButton = styled(IconButton)`
  position: relative;
  width: 20px;
  height: 20px;  
  margin: -10px 0 0 0;
  
  ::after {
    width: 40px;
    position: absolute;
    content: "${({ label }) => label}";
    right: 0;
    bottom: -15px;   
    left: -10px;
    font-size: 10px;
    border-radius: 3px;
    font-weight: bold;
    background-color: hsl(160, 50%, 90%);
  }
  
  :hover::after{
    background-color: hsl(140, 60%, 70%);
  }
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

  ::after {
    font-size: 8px;
    top: -5px;
    left: 120px;
    display: none;
  }
`;

export const StyledSelect = styled.select`
  width: 95%;
  font-size: 0.8rem;

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

export const StyledGrants = styled(BorderWithLabel)`
  border: 0.5px solid black;
  margin-top: 25px;
  label {
    font-size: 10px;
  }

  ::after {
    top: -8px;
  }
`;
