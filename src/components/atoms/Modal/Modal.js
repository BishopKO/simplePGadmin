import React, { useEffect } from 'react';
import styled from 'styled-components';
import crossIcon from 'assets/crossIcon.svg';
import IconButton from 'components/atoms/IconButton/IconButton';
import { Link } from 'react-router-dom';

import { TweenMax } from 'gsap';

const StyledModal = styled.div`
  position: absolute;
  display: grid;
  grid-template-rows: 20% 30% 30%;
  transform: scale(0.7);
  justify-items: center;
  align-content: space-between;
  width: 350px;
  height: 130px;
  background: white;
  border: ${({ theme }) => `2px solid ${theme.border}`};
  padding: 10px;
  left: 50%;
  margin-left: -175px;
  top: 80px;
  border-radius: 5px;
`;

const StyledCloseButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 5px;
  width: 20px;
`;

const Modal = ({ children, action }) => {
  useEffect(() => {
    const m = document.querySelector('.modal');
    TweenMax.to(m, 0.3, { transform: 'scale(1)' });
  });

  return (
    <StyledModal className="modal">
      <StyledCloseButton as={Link} to={'/'} icon={crossIcon} onClick={action} />
      {children}
    </StyledModal>
  );
};

export default Modal;
