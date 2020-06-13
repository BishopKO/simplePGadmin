import React, { useEffect } from 'react';
import crossIcon from 'assets/crossIcon.svg';
import { useHistory } from 'react-router-dom';
import { TweenMax } from 'gsap';
import { StyledModal, StyledCloseButton } from './modalStyles';

const Modal = ({ children, table, width, height }) => {
  const history = useHistory();

  useEffect(() => {
    const modal = document.querySelector('#modal');

    TweenMax.to(modal, 0.3, { transform: 'scale(1)' }).then(() => {
      document.addEventListener('mousedown', handleCloseOnMouseOut);
    });
  });

  const hideAnimation = () => {
    const modal = document.querySelector('#modal');
    TweenMax.to(modal, 0.2, { transform: 'scale(0)' })
      .then(() => {
        document.removeEventListener('mousedown', handleCloseOnMouseOut, false);
      })
      .then(() => {
        history.push('/')
      });
  };

  const handleCloseOnMouseOut = (evt) => {
    const isModalInPath = evt.composedPath();
    if (!isModalInPath.some((item) => item.id === 'modal')) {
      hideAnimation();
    }
  };

  return (
    <StyledModal id="modal" table={table} width={width} height={height}>
      <StyledCloseButton onClick={hideAnimation} icon={crossIcon} />
      {children}
    </StyledModal>
  );
};

export default Modal;
