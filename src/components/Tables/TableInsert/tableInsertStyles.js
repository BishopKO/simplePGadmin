import styled, { css } from 'styled-components';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';
import IconButton from 'components/atoms/IconButton/IconButton';

export const StyledTitle = styled.p`
  font-size: 12px;
  padding: 0;
  margin-top: 0;
  margin-bottom: 20px;
  span {
    color: green;
  }
`;

export const StyledAddColumn = styled(BorderWithLabel)`
  width: 350px;
  height: 37px;
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

export const StyledBorderColumnName = styled(BorderWithLabel)`
  width: 180px;
  height: 20px;
  border: 0.5px solid lightgrey;

  ::after {
    font-size: 8px;
    top: -7px;
    left: 2px;
  }
`;

export const StyledBorderType = styled(BorderWithLabel)`
  border: 0.5px solid lightgrey;
  width: 70px;
  height: 20px;
  ::after {
    font-size: 8px;
    top: -8px;
    left: 2px;
  }
`;

export const StyledBorderWidth = styled(BorderWithLabel)`
  width: 40px;
  height: 20px;
  border: 0.5px solid lightgrey;

  ::after {
    font-size: 8px;
    top: -7px;
    left: 2px;
  }
`;

export const StyledBorderPK = styled(BorderWithLabel)`
  width: 20px;
  height: 20px;
  border: 0.5px solid lightgrey;
  ::after {
    top: -8px;
    left: 2px;
    font-size: 8px;
    background-color: white;
  }
`;

export const StyledType = styled.input`
  width: 95%;
  position: relative;
  border: none;
  background-color: hsl(200, 20%, 95%);
  text-align: center;
  border-radius: 3px;

  ::after {
    content: '';
    position: absolute;
    right: -50px;
    top: -90px;
    background: black;
    width: 10px;
    height: 10px;
  }
`;

export const StyledInputCheckbox = styled.input`
  border: none;
  border-bottom: 1px solid grey;
`;

export const StyledInput = styled.input`
  border: none;
  width: 98%;
  height: 12px;
  font-size: 10px;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  background-color: hsl(200, 20%, 95%);
  border-radius: 3px;
`;

export const StyledButtonsWrapper = styled.div`
  width: 65px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const StyledIconButton = styled(IconButton)`
  position: relative;
  width: 20px;
  height: 20px;
  
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
