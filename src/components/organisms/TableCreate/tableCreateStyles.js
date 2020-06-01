import styled, { css } from 'styled-components';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';
import IconButton from 'components/atoms/IconButton/IconButton';

export const StyledColumnName = styled.div``;

export const StyledAddColumn = styled(BorderWithLabel)`
  width: 420px;
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

export const StyledBorderTableName = styled(BorderWithLabel)`
  top: 15px;
  width: 180px;
  height: 20px;
  border: 0.5px solid lightgrey;
  ::after {
    font-size: 8px;
    top: -8px;
    left: 2px;
  }
`;

export const StyledBorderColumnName = styled(BorderWithLabel)`
  width: 180px;
  height: 20px;
  border: 0.5px solid lightgrey;
  ::after {
    font-size: 8px;
    top: -8px;
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
    top: -8px;
    left: 2px;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      color: grey;
    `};
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

export const StyledSelect = styled.select`
  width: 95%;
  position: relative;
  border: none;
  background-color: hsl(200, 20%, 95%);
  text-align: center;
  border-radius: 3px;
  -webkit-appearance: none;
  -moz-appearance: none;

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
  background-color: hsl(200, 20%, 95%);
  border-radius: 3px;
`;

export const StyledButtonsWrapper = styled.div`
  width: 90%;
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
