import { useEffect } from 'react';
import css from "./Modal.module.css";
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector("#modal-root")

export default function Modal({ onClose, children }) {

  const hadleKeyDown = e => {
    if (e.code === 'Escape') {
        onClose()
      }
  }
  
  useEffect(() => {
    window.addEventListener("keydown", hadleKeyDown);

    return () => {
      window.removeEventListener("keydown", hadleKeyDown);
    };
  });
  

  

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose()
    }
  };

  return createPortal(<div className={css.Overlay} onClick={handleBackdropClick}>
    <div className={css.Modal} >{children}</div>
  </div>, modalRoot);
  }


Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.element
}