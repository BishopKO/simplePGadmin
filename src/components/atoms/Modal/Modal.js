import React, { useEffect } from 'react';
import crossIcon from 'assets/crossIcon.svg';
import { Link } from 'react-router-dom';
import { TweenMax } from 'gsap';
import { StyledModal, StyledCloseButton } from './modalStyles';

const Modal = ({ children, createTable }) => {
  useEffect(() => {
    const modal = document.querySelector('#modal');
    TweenMax.to(modal, 0.3, { transform: 'scale(1)' });
  });

  return (
    <StyledModal id="modal" createTable={createTable}>
      <StyledCloseButton as={Link} to={'/'} icon={crossIcon} />
      {children}
    </StyledModal>
  );
};

export default Modal;
