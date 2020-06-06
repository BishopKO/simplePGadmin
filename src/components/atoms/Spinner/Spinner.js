import styled, { keyframes } from 'styled-components';

const SpinnerKeyFrames = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 20px;
  display: inline-block;
  width: 20px;
  height: 20px;
  z-index: 20;

  ::after {
    content: ' ';
    display: block;
    width: 30px;
    height: 30px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff lightgrey #fff lightgrey;
    animation: ${SpinnerKeyFrames} 1.2s linear infinite;
  }
`;

export default StyledSpinner;
