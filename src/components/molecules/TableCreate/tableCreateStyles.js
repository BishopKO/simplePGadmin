import styled from 'styled-components';
import BorderWithLabel from 'components/atoms/BorderWithLabel/BorderWithLabel';
import IconButton from 'components/atoms/IconButton/IconButton';

export const StyledAddColumn = styled(BorderWithLabel)`
  width: 350px;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid lightgrey;

  ::after {
    font-size: 8px;
    top: -5px;
    left: 120px;
  }
`;

export const StyledPK = styled(BorderWithLabel)`
  width: 20px;
  height: 22px;
  border: 0.5px solid lightgrey;
  ::after {
    top: -8px;
    left: 2px;
    font-size: 8px;
    background-color: white;
  }
`;

export const StyledBorderName = styled(BorderWithLabel)`
  width: 180px;
  height: 22px;
  border: 0.5px solid lightgrey;
  ::after {
    font-size: 8px;
    top: -8px;
  }
`;

export const StyledBorderWidth = styled(BorderWithLabel)`
  width: 40px;
  height: 22px;
  border: 0.5px solid lightgrey;
  ::after {
    font-size: 8px;
    top: -8px;
  }
`;

export const StyledBorderOptions = styled(BorderWithLabel)`
  border: 0.5px solid lightgrey;
  width: 70px;
  height: 22px;
  ::after {
    font-size: 8px;
    top: -8px;
  }
`;

export const StyledInput = styled.input`
  border: none;
  width: 98%;
  background-color: hsl(200, 20%, 95%);
  border-radius: 3px;
`;

export const StyledInputCheckbox = styled.input`
  border: none;
  border-bottom: 1px solid grey;
`;

// TODO: CHANGE ADD ICON
export const StyledAddButton = styled(IconButton)`
  width: 20px;
  height: 20px;
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

export const StyledGrants = styled(BorderWithLabel)`
  border: 1px solid black;
  label {
    font-size: 10px;
  }
`;
