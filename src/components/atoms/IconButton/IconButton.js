import styled from 'styled-components';

export const IconButton = styled.button`
  position: relative;
  width: 20px;
  height: 20px;
  outline: none;
  border: none;
  background: transparent;
  background-size: 90%;
  background-position: 50%;
  background-repeat: no-repeat;
  cursor: pointer;
  background-image: url(${({ icon }) => icon}); 
  margin-right: ${({ marginRight }) => marginRight || '30px'};
  margin-bottom: ${({ marginBottom }) => marginBottom || '25px'};  
  
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

export default IconButton;
